import { test, expect } from '@playwright/test';

test.describe('Quiz Flow', () => {
  test('can complete the compatibility quiz', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('pet-shop-language', 'en');
      window.sessionStorage.setItem('audio_permission_v2', 'denied');
    });
    await page.goto('/match'); // Assuming /match is the quiz route

    // Start quiz
    await page.getByRole('button', { name: /Find Your Perfect Match/i }).click();

    // First question: Space
    await page.click('text=Apartment or small space');
    await page.click('button:has-text("Next")');

    // Second question: Experience
    await page.click('text=First-time owner');
    await page.click('button:has-text("Next")');

    // Third question: Time
    await page.click('text=Short Term: 2-3 years (e.g. Betta Fish, Hamsters)');
    await page.click('button:has-text("Next")');

    // Loading State
    await expect(page.locator('text=Finding your match...')).toBeVisible();

    // Results State
    await expect(page.locator('text=Your Recommended Matches')).toBeVisible({ timeout: 10000 });
    
    // Check that reasons are rendered
    await expect(page.locator('text=Why it\'s a match:').first()).toBeVisible();
  });
});
