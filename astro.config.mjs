// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://devsubnet.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'es', 'ja', 'fr', 'pt', 'ko', 'it'],
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite'
    },
    fallback: {
      de: 'en',
      es: 'en',
      ja: 'en',
      fr: 'en',
      pt: 'en',
      ko: 'en',
      it: 'en'
    }
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  server: {
    host: true,
    port: 4321
  }
});
