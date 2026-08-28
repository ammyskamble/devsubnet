/**
 * Cloudflare Server-Side Telemetry & Cloudflare Insights Proxy Endpoint
 */
export async function onRequest(context) {
  const { request } = context;

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
    const targetUrl = new URL('https://cloudflareinsights.com/cdn-cgi/rum' + url.search);
    
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '';
    const userAgent = request.headers.get('user-agent') || '';

    let body = null;
    if (request.method === 'POST') {
      body = await request.text();
    }

    await fetch(targetUrl.toString(), {
      method: request.method,
      headers: {
        'User-Agent': userAgent,
        'X-Forwarded-For': clientIp,
        'Content-Type': request.headers.get('content-type') || 'application/json',
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
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
