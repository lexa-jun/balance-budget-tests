export const currencySymbols = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
} as const;

export type Currency = keyof typeof currencySymbols;
