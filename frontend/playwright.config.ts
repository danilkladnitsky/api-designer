import { defineConfig } from "@playwright/test"

export default defineConfig({
    testDir: "./e2e",
    timeout: 30 * 1000,
    use: {
        baseURL: "http://localhost:5173",
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: "on-first-retry"
    },
    webServer: {
        command: "npm run dev",
        port: 5173,
        reuseExistingServer: !process.env.CI
    }
})
