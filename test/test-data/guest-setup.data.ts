import type {Currency } from './currencies.data.ts'

export type GuestSetupData = {
  profileName: string;
  budgetName: string;
  currency: Currency;
  accountName: string;
  accountType: string;
  balance: string;
};

export const guestSetupCases: Array<{
  name: string;
  data: GuestSetupData;
}> = [
  {
    name: 'наличный счёт в рублях',
    data: {
      profileName: 'Алекс',
      budgetName: 'Личный бюджет',
      currency: 'RUB',
      accountName: 'Наличные',
      accountType: 'cash',
      balance: '10000',
    },
  },
  {
    name: 'банковский счёт в долларах',
    data: {
      profileName: 'Анна',
      budgetName: 'Семейный бюджет',
      currency: 'USD',
      accountName: 'Карта',
      accountType: 'card',
      balance: '2500',
    },
  },
];
