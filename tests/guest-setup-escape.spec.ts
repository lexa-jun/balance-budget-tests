import { expect, test } from '@playwright/test';

test('обязательная настройка гостя не закрывается по Escape', async ({ page }) => {
  await page.goto('/#settings');

  const dialog = page.locator('#guestSetupModal');
  await expect(dialog).toBeVisible();

  await page.locator('#guestSetupProfileName').press('Escape');

  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('open', '');
});
