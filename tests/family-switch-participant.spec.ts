import { expect, test } from '@playwright/test';

test('переход в семейный бюджет запрашивает имя второго участника', async ({ page }) => {
  await page.goto('/#settings');
  await page.locator('#guestSetupProfileName').fill('Анна');
  await page.getByRole('button', { name: 'Начать вести бюджет' }).click();

  await page.getByRole('button', { name: 'Семейный', exact: true }).click();

  await expect(page.locator('#participantModal')).toBeVisible();
  await expect(page.locator('#participantDialogTitle')).toHaveText('Добавить участника семьи');
  await expect(page.locator('#participantDialogSubtitle')).toHaveText('Семейный бюджет включится после сохранения второго участника.');
  await expect(page.getByRole('button', { name: 'Личный', exact: true })).toHaveClass(/active/);

  await page.locator('#participantName').fill('Иван');
  await page.locator('#saveParticipantButton').click();

  await expect(page.getByRole('button', { name: 'Семейный', exact: true })).toHaveClass(/active/);
  await expect(page.locator('#membersList')).toContainText('Анна');
  await expect(page.locator('#membersList')).toContainText('Иван');
  await expect(page.getByText('Участник 2', { exact: true })).toHaveCount(0);

  await page.getByRole('button', { name: 'Личный', exact: true }).click();
  await expect(page.locator('#membersList .member-row')).toHaveCount(1);
  await expect(page.locator('#membersList').getByText('Иван', { exact: true })).toHaveCount(0);
  await expect.poll(() => page.evaluate(async () => {
    const guest = await (window as any).BalanceGuestStore.load();
    return guest.participants.find((item: any) => item.name === 'Иван')?.active;
  })).toBe(false);

  await page.getByRole('button', { name: 'Семейный', exact: true }).click();
  await expect(page.locator('#participantModal')).not.toBeVisible();
  await expect(page.locator('#membersList')).toContainText('Локальный участник');
});

test('возврат в семейный бюджет восстанавливает участника из архива', async ({ page }) => {
  await page.goto('/#settings');
  await page.locator('#guestSetupProfileName').fill('Анна');
  await page.getByRole('button', { name: 'Начать вести бюджет' }).click();
  await page.getByRole('button', { name: 'Семейный', exact: true }).click();
  await page.locator('#participantName').fill('Иван');
  await page.locator('#saveParticipantButton').click();

  await page.evaluate(async () => {
    const store = (window as any).BalanceGuestStore;
    const guest = await store.load();
    const participant = guest.participants.find((item: any) => item.name === 'Иван');
    guest.transactions.push({
      id: 'ivan-history',
      title: 'Историческая операция',
      type: 'expense',
      amountMinor: -100,
      operationDate: '2026-10-18',
      participantId: participant.id,
      member: participant.name,
      accountId: guest.accounts[0].id,
      account: guest.accounts[0].name,
      categoryId: guest.categories.find((item: any) => item.type === 'expense').id,
      category: guest.categories.find((item: any) => item.type === 'expense').name,
      currency: 'RUB',
      status: 'posted',
    });
    await store.save(guest);
  });
  await page.reload();

  await page.getByRole('button', { name: 'Личный', exact: true }).click();
  await expect(page.locator('#membersList').getByText('Иван', { exact: true })).toHaveCount(0);
  await expect.poll(() => page.evaluate(async () => {
    const guest = await (window as any).BalanceGuestStore.load();
    return guest.participants.find((item: any) => item.name === 'Иван')?.active;
  })).toBe(false);

  await page.getByRole('button', { name: 'Семейный', exact: true }).click();
  await expect(page.locator('#participantModal')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Семейный', exact: true })).toHaveClass(/active/);
  await expect(page.locator('#membersList').getByText('Иван', { exact: true })).toBeVisible();
  await expect(page.locator('#membersList')).toContainText('Локальный участник');
  await expect(page.locator('#toast')).toHaveText('Включен семейный бюджет. Участник восстановлен из архива');
});
