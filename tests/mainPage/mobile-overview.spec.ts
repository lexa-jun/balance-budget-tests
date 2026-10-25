import { test, expect } from '@playwright/test';
import { HomePage } from '../../test/pages/home.page.ts';
import { guestSetupCases } from '../../test/test-data/guest-setup.data.ts';

for (const viewport of [
  { width: 360, height: 800 },
  { width: 768, height: 1024 },
]) {
  test(`обзор помещается по ширине ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await new HomePage(page).fillPerson(guestSetupCases[0].data);

    await expect(page.locator('[data-view-panel="overview"]')).toBeVisible();
    await expect(page.locator('.sidebar')).toHaveCSS('width', `${viewport.width}px`);
    await expect(page.getByTestId('sidebarSettingsNav')).toBeVisible();

    const layout = await page.evaluate(() => ({
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
      overflowing: [...document.querySelectorAll(
        '.hero-grid > *, .kpi-grid > *, .dashboard-grid > *',
      )]
        .filter(element => {
          const rect = element.getBoundingClientRect();
          return rect.left < -0.5 || rect.right > document.documentElement.clientWidth + 0.5;
        })
        .map(element => element.className || element.tagName),
    }));

    expect(layout.documentWidth).toBe(layout.viewportWidth);
    expect(layout.overflowing).toEqual([]);
  });
}
