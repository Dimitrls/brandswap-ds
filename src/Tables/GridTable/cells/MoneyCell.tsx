import React from 'react';
import type { GridTableCountryCode } from '../GridTable.types';
import { isNumericZero, toNumber } from '../GridTable.utils';

export interface MoneyCellProps {
  value: unknown;
  countryCode?: GridTableCountryCode;
  hideZero?: boolean;
  currency?: string;
}

function resolveCurrency(countryCode: GridTableCountryCode, currency?: string): string {
  if (currency) return currency;
  return countryCode === 'US' ? 'USD' : 'GBP';
}

export function formatMoney(
  value: unknown,
  countryCode: GridTableCountryCode = 'GB',
  currency?: string
): string {
  const amount = toNumber(value);
  const locale = countryCode === 'US' ? 'en-US' : 'en-GB';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: resolveCurrency(countryCode, currency),
    maximumFractionDigits: 2,
  }).format(amount);
}

export function MoneyCell({
  value,
  countryCode = 'GB',
  hideZero = false,
  currency,
}: MoneyCellProps) {
  if (value == null || value === '') return null;
  if (hideZero && isNumericZero(value)) return null;
  return <>{formatMoney(value, countryCode, currency)}</>;
}
