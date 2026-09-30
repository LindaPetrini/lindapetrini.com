const ALLOWED_ORIGINS = [
  'https://lindapetrini.com',
  'https://www.lindapetrini.com',
];

function corsHeaders(request, methods) {
  const origin = request.headers.get('Origin') || '';
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': methods || 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

const FEED_URL = 'https://lindapetrini.substack.com/feed';
const FEED_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  'Accept': 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5',
  'Accept-Language': 'en',
};

function looksLikeFeed(xml) {
  return typeof xml === 'string' && (xml.includes('<rss') || xml.includes('<feed'));
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders(request);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    // GET /feed — proxy Substack RSS, with a KV copy of the last good feed
    // so an upstream bot-protection block doesn't blank the section.
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/feed') {
      let upstream = 'error';
      try {
        const feed = await fetch(FEED_URL, {
          headers: FEED_HEADERS,
          cf: { cacheTtl: 900, cacheEverything: true },
        });
        upstream = feed.status;
        const xml = feed.ok ? await feed.text() : '';
        if (feed.ok && looksLikeFeed(xml)) {
          await env.SUBSCRIBERS.put('feed:xml', xml, { expirationTtl: 60 * 60 * 24 * 30 });
          await env.SUBSCRIBERS.put('feed:fetched_at', new Date().toISOString());
          return new Response(xml, {
            headers: {
              ...headers,
              'Content-Type': 'application/xml',
              'Cache-Control': 'public, max-age=3600',
              'X-Feed-Upstream-Status': '200',
            },
          });
        }
      } catch (err) {
        upstream = err.message || 'error';
      }

      const cached = await env.SUBSCRIBERS.get('feed:xml');
      if (cached) {
        return new Response(cached, {
          headers: {
            ...headers,
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=600',
            'X-Feed-Stale': '1',
            'X-Feed-Upstream-Status': String(upstream),
          },
        });
      }
      return Response.json({ error: 'Feed unavailable', upstream }, { status: 502, headers });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers });
    }

    try {
      const body = await request.json();
      const email = body.email;

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return Response.json({ ok: false, error: 'Invalid email' }, { status: 400, headers });
      }

      const key = email.toLowerCase().trim();

      let source = 'unknown';
      try {
        source = new URL(request.headers.get('Referer')).pathname;
      } catch {}

      await env.SUBSCRIBERS.put(key, JSON.stringify({
        email: key,
        source,
        date: new Date().toISOString(),
      }));

      return Response.json({ ok: true }, { headers });
    } catch (err) {
      return Response.json({ ok: false, error: err.message }, { status: 500, headers });
    }
  },
};
