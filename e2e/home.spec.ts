import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('has correct title and hero section', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('pet-shop-language', 'en');
      window.sessionStorage.setItem('audio_permission_v2', 'denied');
    });
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Pet/i);

    // Check if the final CTA is present
    const cta = page.locator('text=See them in person.');
    await expect(cta).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('pet-shop-language', 'en');
      window.sessionStorage.setItem('audio_permission_v2', 'denied');
    });
    await page.goto('/');

    // Click on the collection link in footer or header
    await page.getByRole('link', { name: 'Collection' }).first().click();
    await expect(page).toHaveURL(/.*collection/);
  });
});
