import { test, expect } from '@playwright/test';

test.describe('SEO', () => {
  test('home page has correct meta tags', async ({ page }) => {
    await page.goto('/');

    // Check title contains vending machines
    await expect(page).toHaveTitle(/Vending Machines/i);

    // Check meta description
    const description = page.locator('meta[name="description"]');
    const content = await description.getAttribute('content');
    expect(content?.toLowerCase()).toContain('vending');
  });

  test('location page has breadcrumbs', async ({ page }) => {
    await page.goto('/location/richmond');
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.locator('text=Locations')).toBeVisible();
    await expect(breadcrumb.locator('text=Richmond')).toBeVisible();
  });

  test('use-case page has breadcrumbs', async ({ page }) => {
    await page.goto('/use-cases/offices');
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.locator('text=Use Cases')).toBeVisible();
  });

  test('JSON-LD schema is present on location page', async ({ page }) => {
    await page.goto('/location/richmond');
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toBeTruthy();
    const parsed = JSON.parse(jsonLd!);
    // Should have @graph with multiple schemas
    expect(parsed['@graph']).toBeDefined();
    expect(parsed['@graph'].length).toBeGreaterThanOrEqual(2);
  });

  test('sitemap.xml uses /location/ singular URLs', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    expect(content).toContain('/location/richmond');
    expect(content).not.toMatch(/<loc>.*\/locations\/[a-z]/);
  });
});
