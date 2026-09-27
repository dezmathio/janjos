// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mermaid from 'astro-mermaid';
import sitemap from '@astrojs/sitemap';

// Custom domain. If you ever serve this as a project site without DNS
// (https://<user>.github.io/janjos/), set base to '/janjos/'.
export default defineConfig({
  site: 'https://janjos.lol',
  base: '/',
  output: 'static',
  // Astro emits foo/index.html, so every internal URL ends in a slash and
  // GitHub Pages never has to 301 to add one.
  trailingSlash: 'always',
  integrations: [
    mermaid({
      theme: 'neutral',
      autoTheme: false,
      enableLog: false,
    }),
    sitemap({
      filter: (page) => !/\/404\/?$/.test(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
