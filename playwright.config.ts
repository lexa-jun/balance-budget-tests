import { defineConfig, devices } from '@playwright/test';
import { resolve } from 'node:path';

const appRoot = resolve(process.env.BALANCE_APP_ROOT || '../balance-budget');

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['line'], ['html', { outputFolder: resolve(appRoot, 'playwright-report'), open: 'never' }]]
    : 'html',
  outputDir: resolve(appRoot, 'test-results'),
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'node serve-local.mjs',
    cwd: appRoot,
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
});
