import type { Locator, Page } from '@playwright/test';
import type { GuestSetupData } from '../test-data/guest-setup.data.ts';
import { GuestSetupPage } from './components/guest-setup-form.component.ts';
import { LeftMenu } from './components/left-menu.component.ts';

export class HomePage {
  readonly brandLink: Locator;
  readonly setupForm: GuestSetupPage;
  readonly leftMenu: LeftMenu;


  constructor(private readonly page: Page) {
    this.brandLink = page.getByTestId('brand-home-link');
    this.setupForm = new GuestSetupPage(page);
    this.leftMenu = new LeftMenu(page);

  }

  async fillPerson(data: GuestSetupData): Promise<void> {
      const setupPage = new GuestSetupPage(this.page);

      await setupPage.open();
      await setupPage.fill(data);
      await setupPage.submit();

    }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

}
