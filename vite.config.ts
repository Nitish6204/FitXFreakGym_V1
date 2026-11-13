import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

const DEFAULT_ORIGIN = 'https://thefitxfreak.netlify.app';

function resolveDeploymentOrigin(): string {
  const raw =
    process.env.VITE_SITE_URL ||
    process.env.SITE_URL ||
    process.env.URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    process.env.CF_PAGES_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    DEFAULT_ORIGIN;

  try {
    const parsed = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
    if (
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1' ||
      parsed.hostname.startsWith('ais-dev-')
    ) {
      return DEFAULT_ORIGIN;
    }
    return parsed.origin;
  } catch {
    return DEFAULT_ORIGIN;
  }
}

function dynamicSitemapOriginPlugin(): Plugin {
  const siteOrigin = resolveDeploymentOrigin();

  return {
    name: 'dynamic-sitemap-origin',
    transformIndexHtml(html) {
      if (siteOrigin === DEFAULT_ORIGIN) return html;
      return html.replaceAll(DEFAULT_ORIGIN, siteOrigin);
    },
    closeBundle() {
      if (siteOrigin === DEFAULT_ORIGIN) return;
      const distDir = path.resolve(import.meta.dirname, 'dist');
      for (const file of ['sitemap.xml', 'robots.txt']) {
        const target = path.join(distDir, file);
        if (fs.existsSync(target)) {
          const content = fs.readFileSync(target, 'utf-8');
          fs.writeFileSync(target, content.replaceAll(DEFAULT_ORIGIN, siteOrigin), 'utf-8');
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), dynamicSitemapOriginPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
