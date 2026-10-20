import { test, expect } from '@playwright/test';

test.describe('Image Regression Tests', () => {
  
  test('Homepage images load correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check all images on the homepage
    const images = page.locator('img');
    await images.first().waitFor({ state: 'visible' });
    
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await img.evaluate((el: HTMLElement) => el.scrollIntoView({ block: "center" }));
      await page.waitForFunction(
        (element) => (element as HTMLImageElement).complete,
        await img.elementHandle()
      );
      const isLoaded = await img.evaluate((el: HTMLImageElement) => el.naturalWidth > 0);
      expect(isLoaded).toBeTruthy();
    }
  });

  test('Blog listing images load correctly', async ({ page }) => {
    await page.goto('/blog');
    
    // Wait for at least one image in the blog listing
    const images = page.locator('article img');
    if (await images.count() > 0) {
      await images.first().waitFor({ state: 'visible' });
      
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        await img.evaluate((el: HTMLElement) => el.scrollIntoView({ block: "center" }));
        await page.waitForFunction(
          (element) => (element as HTMLImageElement).complete,
          await img.elementHandle()
        );
        const isLoaded = await img.evaluate((el: HTMLImageElement) => el.naturalWidth > 0);
        expect(isLoaded).toBeTruthy();
      }
    }
  });
  
  test('Blog article images load correctly', async ({ page }) => {
    // Navigate to the first blog article if exists
    await page.goto('/blog');
    const firstArticleLink = page.locator('article a').first();
    
    if (await firstArticleLink.count() > 0) {
      const href = await firstArticleLink.getAttribute('href');
      if (href) {
        await page.goto(href);
        
        const images = page.locator('img');
        if (await images.count() > 0) {
          await images.first().waitFor({ state: 'visible' });
          
          const count = await images.count();
          for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            await img.evaluate((el: HTMLElement) => el.scrollIntoView({ block: "center" }));
            await page.waitForFunction(
              (element) => (element as HTMLImageElement).complete,
              await img.elementHandle()
            );
            const isLoaded = await img.evaluate((el: HTMLImageElement) => el.naturalWidth > 0);
            expect(isLoaded).toBeTruthy();
          }
        }
      }
    }
  });

  test('Review images load correctly', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('div.bg-zinc-100.relative img');
    if (await images.count() > 0) {
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        await img.evaluate((el: HTMLElement) => el.scrollIntoView({ block: "center" }));
        await page.waitForFunction(
          (element) => (element as HTMLImageElement).complete,
          await img.elementHandle()
        );
        const isLoaded = await img.evaluate((el: HTMLImageElement) => el.naturalWidth > 0);
        expect(isLoaded).toBeTruthy();
      }
    }
  });
});
