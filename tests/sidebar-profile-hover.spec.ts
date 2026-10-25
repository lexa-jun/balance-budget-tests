import { expect, test } from '@playwright/test';

test('профиль использует тёмное навигационное состояние при наведении', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('balance.theme.v1', 'dark'));
  await page.goto('/#settings');
  await page.locator('#guestSetupProfileName').fill('Анна');
  await page.getByRole('button', { name: 'Начать вести бюджет' }).click();
  await page.locator('.brand').click();

  const profile = page.locator('.profile');
  await expect(profile).not.toHaveClass(/active/);
  await profile.hover();

  await expect(profile).toHaveCSS('background-color', 'rgb(38, 49, 40)');
  await expect(profile).toHaveCSS('color', 'rgb(237, 244, 235)');
  await expect(profile.locator('.profile-copy small')).toHaveCSS('color', 'rgb(157, 169, 159)');
});
