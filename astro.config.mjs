// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mermaid from 'astro-mermaid';

// Custom domain. If you ever serve this as a project site without DNS
// (https://<user>.github.io/janjos/), set base to '/janjos/'.
export default defineConfig({
  site: 'https://janjos.lol',
  base: '/',
  output: 'static',
  integrations: [
    mermaid({
      theme: 'neutral',
      autoTheme: false,
      enableLog: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
