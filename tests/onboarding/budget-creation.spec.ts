import { test, expect } from '@playwright/test';
import { GuestSetupPage } from '../../test/pages/components/guest-setup-form.component.ts';
import { guestSetupCases } from '../../test/test-data/guest-setup.data.ts';
import { Main } from '../../test/pages/components/main.component.ts';
import { currencySymbols } from '../../test/test-data/currencies.data.ts';
import { SidebarOperations } from '../../test/pages/components/sidebar-operations.components.ts';
import { LeftMenu } from '../../test/pages/components/left-menu.component.ts';


for (const { name, data } of guestSetupCases) {
  test(`создание бюджета: ${name}`, async ({ page }) => {
    const setupPage = new GuestSetupPage(page);
    const mainPage = new Main(page);
    const leftMenu = new LeftMenu(page)
    const sidebarOperations = new SidebarOperations(page);
    const expectedBalance = `${
      Number(data.balance).toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }\u00A0${currencySymbols[data.currency]}`;

    await setupPage.open();
    await setupPage.fill(data);
    await setupPage.submit();

    await expect(setupPage.form).toBeHidden();
    await expect(mainPage.pageTitle).toHaveText('Добрый день, ' + data.profileName);
    await expect(mainPage.money).toHaveText('0,00 ' + currencySymbols[data.currency])
    await expect(mainPage.accountBalance).toHaveText(expectedBalance);

    await leftMenu.operations.click();
    await expect(sidebarOperations.openingBalanceRow).toBeVisible();
    await expect(sidebarOperations.openingBalanceRow).toContainText('Начальный остаток');
    await expect(sidebarOperations.openingBalanceRow).toContainText('Служебная запись')
    await expect(sidebarOperations.amount).toHaveText(expectedBalance);
})
}
