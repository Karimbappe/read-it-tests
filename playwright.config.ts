import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,  // Run tests in headful mode
    trace: 'on-first-retry',  // Keep traces only on failures
  },
  fullyParallel: true,
  retries: 2,
});
