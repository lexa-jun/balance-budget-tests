import type { Locator, Page } from '@playwright/test';

export class SidebarOperations {
  readonly operations: Locator;
  readonly operationsCount: Locator;
  readonly operationSearch: Locator;
  readonly operationsTable: Locator;
  readonly openingBalanceRow: Locator;
  readonly amount: Locator;

  constructor(private readonly page: Page) {
    this.operations = page.getByTestId('sidebarOperationsNav');
    this.operationsCount = page.getByTestId('#sidebarOperationsCount');
    this.operationSearch = page.getByTestId('#operationSearch');
    this.operationsTable = page.locator('.operations-table');
    this.openingBalanceRow = page.locator('.op-row.opening-balance-row');
    this.amount = page.locator('.amount');


  }

    async open(): Promise<void> {
    await this.page.goto('/#operations');
  }
}
