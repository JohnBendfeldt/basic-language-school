/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
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
        // Exclude index.html and audio manifests from initial precache so HTML is fresh & install stays fast
        globIgnores: ['**/audio/index.json', '**/audio/*/manifest.json', '**/index.html'],
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
  },
});
