import { test, expect } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});