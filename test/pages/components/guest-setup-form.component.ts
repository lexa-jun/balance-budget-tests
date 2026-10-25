import type { Locator, Page } from '@playwright/test';
import type { GuestSetupData } from '../../test-data/guest-setup.data.ts';

export class GuestSetupPage {
  readonly form: Locator;
  readonly profileName: Locator;
  readonly budgetName: Locator;
  readonly currency: Locator;
  readonly accountName: Locator;
  readonly accountType: Locator;
  readonly balance: Locator;
  readonly createButton: Locator;

  constructor(private readonly page: Page) {
    this.form = page.locator('#guestSetupForm');
    this.profileName = page.locator('#guestSetupProfileName');
    this.budgetName = page.locator('#guestSetupBudgetName');
    this.currency = page.locator('#guestSetupCurrency');
    this.accountName = page.locator('#guestSetupAccountName');
    this.accountType = page.locator('#guestSetupAccountType');
    this.balance = page.locator('#guestSetupBalance');
    this.createButton = page.locator('#createGuestBudgetButton');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async fill(data: GuestSetupData): Promise<void> {
    await this.profileName.fill(data.profileName);
    await this.budgetName.fill(data.budgetName);
    await this.currency.selectOption(data.currency);
    await this.accountName.fill(data.accountName);
    await this.accountType.selectOption(data.accountType);
    await this.balance.fill(data.balance);
  }

  async submit(): Promise<void> {
    await this.createButton.click();
  }

}







// import type { Locator, Page } from '@playwright/test';

// export class FormSetupPage {
//     readonly setupForm: Locator;
//     readonly brandLink: Locator;
//     readonly guestSetupProfileName: Locator;
//     readonly guestSetupBudgetName: Locator;
//     readonly guestSetupCurrency: Locator;
//     readonly guestSetupAccountName: Locator;
//     readonly guestSetupAccountType: Locator;
//     readonly guestSetupBalance: Locator;
//     readonly createGuestBudgetButton: Locator;


// constructor(private readonly page: Page) {
//     this.setupForm = page.locator('#guestSetupForm');
//     this.brandLink = page.getByTestId('brand-home-link');
//     this.guestSetupProfileName = page.locator('#guestSetupProfileName');
//     this.guestSetupBudgetName = page.locator('#guestSetupBudgetName');
//     this.guestSetupCurrency = page.locator('#guestSetupCurrency');
//     this.guestSetupAccountName = page.locator('#guestSetupAccountName');
//     this.guestSetupAccountType = page.locator('#guestSetupAccountType');
//     this.createGuestBudgetButton = page.locator('#createGuestBudgetButton');
//     this.guestSetupBalance = page.locator('#guestSetupBalance');

//   };

//   async open(): Promise<void> {
//     await this.page.goto('/');
//   }
// }
