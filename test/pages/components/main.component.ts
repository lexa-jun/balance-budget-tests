import type { Locator, Page } from '@playwright/test';


export class Main {
  readonly pageEyebrow: Locator;
  readonly money: Locator;
  readonly accountBalance: Locator;
  readonly pageTitle: Locator;
  readonly storagePill: Locator;
  readonly themeToggle: Locator;
  // readonly iconButton: Locator; // добавлено на случий реализации окна уведомлений
  readonly buttonPrimary: Locator;


  constructor(private readonly page: Page) {
    this.pageEyebrow = page.locator('#pageEyebrow');
    this.money = page.locator('h2[data-money]');
    this.accountBalance = page.locator('.account-strip .account-balance-item strong');
    this.pageTitle = page.locator('#pageTitle');
    this.storagePill = page.locator('#storagePill')
    this.themeToggle = page.locator('#themeToggle')
    // this.iconButton = page.locator('.icon-button')
    this.buttonPrimary = page.locator('button[data-open="operation"]')

  }


    async open(): Promise<void> {
    await this.page.goto('/#overview');
  }

}
