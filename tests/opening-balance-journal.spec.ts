import { expect, test } from '@playwright/test';

test('начальный остаток виден в журнале и не попадает в доходы', async ({ page }) => {
  await page.goto('/#operations');
  await page.locator('#guestSetupProfileName').fill('Анна');
  await page.locator('#guestSetupCurrency').selectOption('EUR');
  await page.locator('#guestSetupBalance').fill('1000');
  await page.getByRole('button', { name: 'Начать вести бюджет' }).click();

  const row = page.locator('.opening-balance-row');
  await expect(row).toBeVisible();
  await expect(row).toContainText('Начальный остаток');
  await expect(row).toContainText('1 000,00 €');
  await expect(row.locator('.operation-open')).toHaveCount(0);
  await expect(page.locator('#operationIncome')).toContainText('0,00 €');
  await expect(page.locator('#operationExpense')).toContainText('0,00 €');

  await page.locator('#typeFilter').selectOption('opening');
  await expect(page.locator('.opening-balance-row')).toHaveCount(1);
  await expect(page.locator('#operationCount')).toHaveText('1 операция');

  await page.reload();
  await expect(page.locator('.opening-balance-row')).toHaveCount(1);

  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('#typeFilter')).toBeVisible();
  await expect(page.locator('.opening-balance-row')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
