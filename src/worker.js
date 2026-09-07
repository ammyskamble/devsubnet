export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const isHttp = url.protocol === 'http:' || request.headers.get('x-forwarded-proto') === 'http';
    const isWww = url.hostname === 'www.devsubnet.com';

    // Enforce 301 Permanent Redirect for:
    // 1. Any request coming to www.devsubnet.com -> devsubnet.com
    // 2. Any non-secure request coming to http: -> https:
    if (isWww || isHttp) {
      url.hostname = 'devsubnet.com';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // Serve static assets from the assets directory
    return env.ASSETS.fetch(request);
  }
};
