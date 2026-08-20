import { test, expect } from '@playwright/test';

test('contact form submits successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/contact');

  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'This is an automated test message.');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=Thank you')).toBeVisible();
});