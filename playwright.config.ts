import fs from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

const E2E_PORT = process.env.PLAYWRIGHT_PORT || '5185';
const E2E_BASE_URL = `http://localhost:${E2E_PORT}`;
const useChromeChannel = process.platform !== 'linux' || fs.existsSync('/opt/google/chrome/chrome');
const systemChromiumPath = !useChromeChannel && fs.existsSync('/usr/bin/chromium')
  ? '/usr/bin/chromium'
  : undefined;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: E2E_BASE_URL,
    trace: 'on-first-retry',
    ...(useChromeChannel
      ? { channel: 'chrome' }
      : systemChromiumPath
        ? { launchOptions: { executablePath: systemChromiumPath, args: ['--no-sandbox'] } }
        : {}),
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npm run dev -- --port ${E2E_PORT} --strictPort`,
    url: E2E_BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});

