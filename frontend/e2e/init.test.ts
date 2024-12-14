import { expect, test } from "@playwright/test"

test("app opens and shows the correct title", async ({ page }) => {
    await page.goto("/")
    const title = await page.title()
    expect(title).toBe("Frontend application")
})
