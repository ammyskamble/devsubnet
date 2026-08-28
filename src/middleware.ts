import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  
  // 301 Redirect from /?* to / when query parameters exist on root route
  if (url.pathname === '/' && url.search) {
    return context.redirect('/', 301);
  }
  
  return next();
});
