/**
 * Cloudflare Server-Side Telemetry & Analytics Proxy Endpoint
 * Routes beacons to analytics endpoints while preventing ad-blocker domain blocking.
 */
export async function onRequest(context) {
  const { request } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const url = new URL(request.url);
    const targetUrl = new URL('https://www.google-analytics.com/g/collect' + url.search);
    
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '';
    const userAgent = request.headers.get('user-agent') || '';

    let body = null;
    if (request.method === 'POST') {
      body = await request.text();
    }

    // Forward telemetry server-side
    await fetch(targetUrl.toString(), {
      method: request.method,
      headers: {
        'User-Agent': userAgent,
        'X-Forwarded-For': clientIp,
        'Content-Type': request.headers.get('content-type') || 'text/plain',
      },
      body: body || undefined,
    });

    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    // Fail silently and return 204
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
