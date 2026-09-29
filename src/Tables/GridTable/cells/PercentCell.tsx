import React from 'react';
import { isNumericZero, toNumber } from '../GridTable.utils';

export interface PercentCellProps {
  value: unknown;
  hideZero?: boolean;
  fractionDigits?: number;
}

export function formatPercent(value: unknown, fractionDigits = 2): string {
  const amount = toNumber(value);
  return `${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  })}%`;
}

export function PercentCell({ value, hideZero = false, fractionDigits = 2 }: PercentCellProps) {
  if (value == null || value === '') return null;
  if (hideZero && isNumericZero(value)) return null;
  return <>{formatPercent(value, fractionDigits)}</>;
}
