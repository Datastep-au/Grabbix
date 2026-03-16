import { test, expect } from '@playwright/test';

test.describe('Contact Forms', () => {
  test('home page form shows success state after submission', async ({ page }) => {
    await page.goto('/');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Fill out the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="location"]', 'Melbourne');

    // Select space type
    await page.locator('select[name="spaceType"], [name="spaceType"]').first().click();
    await page.locator('text=Office Building').first().click();

    // Select customer size
    await page.locator('select[name="customerSize"], [name="customerSize"]').first().click();
    await page.locator('text=50+').first().click();

    // Submit
    await page.locator('button[type="submit"]').first().click();

    // Should show success message
    await expect(page.locator('text=We\'ll be in touch within 24 hours')).toBeVisible({ timeout: 10000 });
  });

  test('contact page form shows success state after submission', async ({ page }) => {
    await page.goto('/contact');

    // Fill required fields
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');

    // Select customer size
    const customerSizeSelect = page.locator('[name="customerSize"]').first();
    await customerSizeSelect.click();
    await page.locator('text=50+').first().click();

    // Submit
    await page.locator('button[type="submit"]').click();

    // Should show success message
    await expect(page.locator('text=We\'ll be in touch within 24 hours')).toBeVisible({ timeout: 10000 });
  });
});
