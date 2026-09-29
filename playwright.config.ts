import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // tests in the same file also run in parallel
  forbidOnly: Boolean(process.env.CI), // a forgotten test.only fails CI
  retries: process.env.CI ? 1 : 0, // a retry is evidence of flakiness, not a fix
  workers: process.env.CI ? 2 : 4, // shared public site → keep it low
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    toPass: { timeout: 10_000 }, // toPass has no own timeout by default (would run until the 30 s test timeout)
  },
  use: {
    baseURL: env.baseUrl,
    testIdAttribute: 'data-test', // getByTestId() now looks at data-test="…"
    trace: 'on-first-retry', // full recording when a test is retried
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
