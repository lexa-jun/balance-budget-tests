import type { Locator, Page } from '@playwright/test';


export class Main {
  readonly pageEyebrow: Locator;
  readonly money: Locator;
  readonly accountBalance: Locator;
  readonly pageTitle: Locator;
  readonly storagePill: Locator;
  readonly modeSwitch: Locator;
  readonly personal: Locator;
  readonly family: Locator;
  readonly themeToggle: Locator;
  // readonly iconButton: Locator; // добавлено на случий реализации окна уведомлений
  readonly authButton: Locator;
  readonly buttonPrimary: Locator;


  constructor(private readonly page: Page) {
    this.pageEyebrow = page.locator('#pageEyebrow');
    this.money = page.locator('h2[data-money]');
    this.accountBalance = page.locator('.account-strip button strong');
    this.pageTitle = page.locator('#pageTitle');
    this.storagePill = page.locator('#storagePill')
    this.modeSwitch = page.locator('.mode-switch')
    this.personal = page.locator('button[data-mode="personal"]');
    this.family = page.locator('button[data-mode="family"]');
    this.themeToggle = page.locator('#themeToggle')
    // this.iconButton = page.locator('.icon-button')
    this.authButton = page.locator('#authButton')
    this.buttonPrimary = page.locator('button[data-open="operation"]')

  }


    async open(): Promise<void> {
    await this.page.goto('/#overview');
  }

}
