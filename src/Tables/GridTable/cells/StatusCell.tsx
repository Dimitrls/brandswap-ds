import React from 'react';
import { Tag } from '../../../Buttons/Tag';
import type { TagVariant } from '../../../shared/types';

export interface StatusCellProps {
  value: unknown;
  hideZero?: boolean;
}

function statusVariant(value: string): TagVariant {
  const normalized = value.trim().toLowerCase();
  switch (normalized) {
    case 'active':
    case 'true':
    case 'approved':
      return 'positive';
    case 'inactive':
    case 'false':
    case 'rejected':
      return 'negative';
    case 'needs approval':
    case 'in test':
    case 'pending':
      return 'accent2';
    default:
      return 'neutral';
  }
}

export function StatusCell({ value }: StatusCellProps) {
  if (value == null || value === '') return null;
  const label = String(value);
  return <Tag label={label} variant={statusVariant(label)} />;
}
