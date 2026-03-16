import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', title: /Grabbix/i },
  { path: '/contact', title: /Contact/i },
  { path: '/locations', title: /Locations/i },
  { path: '/location/richmond', title: /Richmond/i },
  { path: '/use-cases/offices', title: /Office/i },
  { path: '/use-cases/apartments', title: /Apartment/i },
  { path: '/products/traditional-vending', title: /Traditional/i },
  { path: '/privacy-policy', title: /Privacy/i },
  { path: '/cookie-policy', title: /Cookie/i },
];

test.describe('Page Navigation', () => {
  for (const route of routes) {
    test(`${route.path} loads successfully`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(route.title);
    });
  }

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.locator('text=404')).toBeVisible();
  });
});
