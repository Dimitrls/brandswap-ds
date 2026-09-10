import React from 'react';
import { InputField } from '../../FormElements/InputField';
import { Select } from '../../FormElements/Select';
import type { DataTableColumn, DataTableFilterContext } from './DataTable.types';

export function DataTableColumnFilterControl<T>({
  column,
  value,
  onChange,
}: DataTableFilterContext<T>) {
  if (column.filter?.render) {
    return <>{column.filter.render({ value, onChange, column })}</>;
  }

  const type = column.filter?.type ?? 'text';
  const placeholder = column.filter?.placeholder ?? 'Filter';
  const options = (column.filter?.options ?? []) as unknown[];

  if (type === 'select') {
    return (
      <Select
        size="small"
        options={options}
        value={(value as never) ?? null}
        onChange={(next) => onChange(next)}
        placeholder={placeholder}
        searchable={false}
      />
    );
  }

  if (type === 'multi-select') {
    return (
      <Select
        multiple
        size="small"
        options={options}
        value={Array.isArray(value) ? (value as never[]) : []}
        onChange={(next) => onChange(next)}
        placeholder={placeholder}
        searchable
      />
    );
  }

  return (
    <InputField
      size="small"
      value={value == null ? '' : String(value)}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={placeholder}
    />
  );
}

export function hasActiveFilterValue(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function getColumnHeaderLabel<T>(column: DataTableColumn<T>): string {
  if (typeof column.header === 'string' || typeof column.header === 'number') {
    return String(column.header);
  }
  return column.id;
}
