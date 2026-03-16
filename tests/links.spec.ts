import { test, expect } from '@playwright/test';

test.describe('Internal Links', () => {
  test('no links point to /products/smart-store', async ({ page }) => {
    await page.goto('/use-cases/offices');
    const smartStoreLinks = page.locator('a[href="/products/smart-store"]');
    await expect(smartStoreLinks).toHaveCount(0);
  });

  test('use-case smart store links point to /#products-showcase', async ({ page }) => {
    await page.goto('/use-cases/offices');
    const links = page.locator('a[href="/#products-showcase"]');
    expect(await links.count()).toBeGreaterThan(0);
  });

  test('location pages have correct canonical URL', async ({ page }) => {
    await page.goto('/location/richmond');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://grabbix.com.au/location/richmond');
  });

  test('legacy location pages redirect to React routes', async ({ page }) => {
    const response = await page.goto('/location_pages/free-vending-service-in-richmond.html');
    expect(page.url()).toContain('/location/richmond');
  });
});
