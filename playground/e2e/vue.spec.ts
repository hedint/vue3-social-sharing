import { expect, test } from "@playwright/test";

test("renders social sharing networks", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".social-sharing-block span")).toHaveText([
    "FACEBOOK",
    "TWITTER",
    "TELEGRAM",
  ]);
});
