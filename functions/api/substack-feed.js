// Cloudflare Pages Function — proxies Substack RSS feed to avoid CORS issues
export async function onRequestGet() {
  const FEED_URL = 'https://lindapetrini.substack.com/feed';

  try {
    const res = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'lindapetrini.com/1.0' },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch feed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const xml = await res.text();

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Feed proxy error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
