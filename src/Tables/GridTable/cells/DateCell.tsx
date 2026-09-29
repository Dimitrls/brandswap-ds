import React from 'react';
import type { GridTableCountryCode } from '../GridTable.types';

export interface DateCellProps {
  value: unknown;
  countryCode?: GridTableCountryCode;
  dateTime?: boolean;
}

function toDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === 'number' && Number.isFinite(value)) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

export function formatDate(
  value: unknown,
  countryCode: GridTableCountryCode = 'GB',
  dateTime = false
): string {
  const date = toDate(value);
  if (!date) return '';
  const locale = countryCode === 'US' ? 'en-US' : 'en-GB';
  return dateTime
    ? date.toLocaleString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : date.toLocaleDateString(locale);
}

export function DateCell({ value, countryCode = 'GB', dateTime = false }: DateCellProps) {
  if (value == null || value === '') return null;
  const formatted = formatDate(value, countryCode, dateTime);
  return formatted ? <>{formatted}</> : null;
}
