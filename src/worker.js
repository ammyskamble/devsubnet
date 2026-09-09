export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const isHttp = url.protocol === 'http:' || request.headers.get('x-forwarded-proto') === 'http';
    const isWww = url.hostname === 'www.devsubnet.com';

    // Check if path is a directory (not root, no dot in last segment) without trailing slash
    const lastSegment = url.pathname.split('/').pop() || '';
    const needsTrailingSlash = !url.pathname.endsWith('/') && !lastSegment.includes('.');

    // Enforce 301 Permanent Redirect for:
    // 1. Any request coming to www.devsubnet.com -> devsubnet.com
    // 2. Any non-secure request coming to http: -> https:
    // 3. Any directory route missing a trailing slash
    if (isWww || isHttp || needsTrailingSlash) {
      url.hostname = 'devsubnet.com';
      url.protocol = 'https:';
      if (needsTrailingSlash) {
        url.pathname = `${url.pathname}/`;
      }
      return Response.redirect(url.toString(), 301);
    }

    // Sitemap aliases & canonical redirects
    if (url.pathname === '/sitemap_0.xml') {
      url.pathname = '/sitemap-0.xml';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/sitemap_index.xml') {
      url.pathname = '/sitemap-index.xml';
      return Response.redirect(url.toString(), 301);
    }

    // Serve static assets from the assets directory
    return env.ASSETS.fetch(request);
  }
};
