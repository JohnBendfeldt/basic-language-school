/// <reference types="vitest" />
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const offlinePackDevPlugin = (): Plugin => ({
  name: 'offline-pack-dev-middleware',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const urlPath = req.url?.split('?')[0] || '';
      const match = urlPath.match(/^\/audio\/([a-z]{2})\/offline-pack\.bin$/i);
      if (!match || req.method !== 'GET') {
        next();
        return;
      }

      const lang = match[1].toLowerCase();
      const langDir = path.resolve(process.cwd(), 'public', 'audio', lang);
      const manifestPath = path.join(langDir, 'manifest.json');
      if (!fs.existsSync(manifestPath)) {
        next();
        return;
      }

      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
          files: string[];
          totalBytes: number;
        };
        const diskLookup = new Map<string, string>();
        for (const sub of fs.readdirSync(langDir)) {
          const subPath = path.join(langDir, sub);
          if (!fs.statSync(subPath).isDirectory()) continue;
          for (const entry of fs.readdirSync(subPath)) {
            if (!entry.toLowerCase().endsWith('.mp3')) continue;
            diskLookup.set(`${sub}/${entry.normalize('NFC')}`, path.join(subPath, entry));
          }
        }

        const chunks = manifest.files.map((rel) => {
          const diskPath = diskLookup.get(rel.normalize('NFC')) || path.join(langDir, rel);
          return fs.readFileSync(diskPath);
        });
        const packBuf = Buffer.concat(chunks);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Length', String(packBuf.length));
        res.end(packBuf);
      } catch {
        next();
      }
    });
  },
});

export default defineConfig({
  plugins: [
    react(),
    offlinePackDevPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      // Use existing public/manifest.json instead of generating one
      manifest: false,
      includeAssets: ['audio/sounds/correct.mp3', 'audio/sounds/incorrect.mp3'],
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB to accommodate offline bundle
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: null,
        // Exclude index.html, audio manifests, and binary audio packs from initial precache
        globIgnores: [
          '**/audio/index.json',
          '**/audio/*/manifest.json',
          '**/audio/*/offline-pack.bin',
          '**/index.html',
        ],
        runtimeCaching: [
          {
            urlPattern: ({ request }: { request: Request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            urlPattern: /\/audio\/[a-z]{2}\/manifest\.json$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'bls-audio-manifests-v1',
              expiration: {
                maxEntries: 25,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(?:mp3|wav|mp4)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'bls-offline-audio-v1',
              rangeRequests: true,
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxEntries: 20000,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Year
              },
            },
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: false,
    exclude: ['node_modules/**', 'dist/**', 'e2e/**'],
    // Several suites render the whole app in jsdom; give them headroom when run in parallel / with coverage
    testTimeout: 20000,
    env: {
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_ANON_KEY: '',
    },
  },
});
