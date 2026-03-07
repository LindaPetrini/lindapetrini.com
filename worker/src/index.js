const ALLOWED_ORIGINS = [
  'https://lindapetrini.com',
  'https://www.lindapetrini.com',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders(request);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
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
