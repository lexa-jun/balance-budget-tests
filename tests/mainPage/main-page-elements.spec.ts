import { test, expect } from '@playwright/test';
import { Main } from '../../test/pages/components/main.component.ts'
import { HomePage } from '../../test/pages/home.page.ts'
import { guestSetupCases } from '../../test/test-data/guest-setup.data.ts';
import { getTodayText } from '../../test/test-data/today-time.data.ts'


test.describe('Проверка элементов на главной', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        const { data } = guestSetupCases[0];

        await homePage.fillPerson(data);
    });

    test(`Проверка элементов в хедере`, async ({ page }) => {
        const main = new Main(page);
        const today = getTodayText();

        await expect(main.pageTitle).toHaveText(
            `Добрый день, ${guestSetupCases[0].data.profileName}`,
        );
        await expect(main.pageEyebrow).toHaveText(today);

        await expect(main.storagePill).toBeVisible();
        await expect(main.storagePill).toHaveText('На этом устройстве');

        await expect(main.modeSwitch).toBeVisible();
        await main.personal.hover();
        await expect(main.personal).toHaveClass('active');

        await expect(main.themeToggle).toBeVisible();

        await expect(main.authButton).toBeHidden();

        await expect(main.buttonPrimary).toBeVisible();

  });
})
