import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:4000', // Update this if your frontend runs on a different port
    headless: false, // Set to false if you want to see the browser
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npm run dev', // Start your frontend automatically
    port: 4000, // Ensure this matches your Vite server port
    reuseExistingServer: true,
  },
});
