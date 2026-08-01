// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.nicolasdirago.dev',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],

  vite: {
    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: 1000,
    },
  },
});