import type { Locator, Page } from '@playwright/test';

export class LeftMenu {
  readonly overview: Locator;
  readonly operations: Locator;
  readonly operationsCount: Locator;
  readonly planning: Locator;
  readonly goals: Locator;
  readonly debts: Locator;
  readonly profile: Locator;

  constructor(page: Page) {
    this.overview = page.getByTestId('#sidebarOverviewNav');
    this.operations = page.getByTestId('sidebarOperationsNav');
    this.operationsCount = page.getByTestId('#sidebarOperationsCount');
    this.planning = page.getByTestId('#sidebarPlanningNav');
    this.goals = page.getByTestId('#sidebarGoalsNav');
    this.debts = page.getByTestId('#sidebarDebtsNav');
    this.profile = page.getByTestId('#sidebarProfile');
  }
}
