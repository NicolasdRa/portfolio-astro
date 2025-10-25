// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()],
    css: {
      modules: {
        // Generate class names with component name prefix
        // Example: CustomLink_wrapper__a1b2c3
        generateScopedName: '[name]_[local]__[hash:base64:5]',
        // Alternative patterns:
        // '[local]_[hash:base64:5]' - just local name + hash
        // '[folder]_[name]_[local]__[hash:base64:5]' - includes folder name
      },
    },
    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  },
  experimental: {
    // Enables automatic responsive image generation
    // This creates optimized images for different viewport sizes
    responsiveImages: true,
  },
});