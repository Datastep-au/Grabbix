import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('home page renders on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigation works on mobile', async ({ page }) => {
    await page.goto('/');
    // Navigation should be present (may be in hamburger menu)
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('contact form is usable on mobile', async ({ page }) => {
    await page.goto('/contact');
    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    // Submit button should be full width and visible
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
  });
});
