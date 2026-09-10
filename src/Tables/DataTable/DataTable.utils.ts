import React, { useCallback, useRef, useState } from 'react';
import type {
  DataTableAddItemConfig,
  DataTableAddItemProp,
  DataTableColumn,
  DataTablePaginationConfig,
  DataTablePaginationProp,
  DataTableRowId,
  DataTableSelectionConfig,
  DataTableSelectionProp,
  DataTableSortState,
} from './DataTable.types';

export function toCssSize(value?: string | number): string | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export function defaultGetRowId<T>(row: T, index: number): DataTableRowId {
  if (row && typeof row === 'object' && 'id' in (row as object)) {
    const id = (row as { id?: unknown }).id;
    if (typeof id === 'string' || typeof id === 'number') return id;
  }
  return index;
}

export function getCellValue<T>(row: T, column: DataTableColumn<T>): unknown {
  if (column.accessor) return column.accessor(row);
  if (column.accessorKey) return (row as Record<string, unknown>)[column.accessorKey];
  return undefined;
}

export function renderDefaultCell(value: unknown): React.ReactNode {
  if (value == null) return null;
  if (React.isValidElement(value)) return value;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return null;
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

export function compareRows<T>(
  a: T,
  b: T,
  columns: DataTableColumn<T>[],
  sort: DataTableSortState
): number {
  if (!sort) return 0;
  const column = columns.find((col) => col.id === sort.id);
  if (!column) return 0;
  const direction = sort.direction === 'asc' ? 1 : -1;
  if (column.sortFn) return column.sortFn(a, b) * direction;
  return compareValues(getCellValue(a, column), getCellValue(b, column)) * direction;
}

export function sortRows<T>(
  rows: T[],
  columns: DataTableColumn<T>[],
  sort: DataTableSortState
): T[] {
  if (!sort) return rows;
  const copy = rows.slice();
  copy.sort((a, b) => compareRows(a, b, columns, sort));
  return copy;
}

function isEmptyFilterValue(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

function defaultFilterMatch(cellValue: unknown, filterValue: unknown): boolean {
  if (Array.isArray(filterValue)) {
    return filterValue.some((item) => defaultFilterMatch(cellValue, item));
  }
  if (typeof cellValue === 'string' || typeof cellValue === 'number' || typeof cellValue === 'boolean') {
    return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
  }
  if (Array.isArray(cellValue)) {
    return cellValue.some((item) => defaultFilterMatch(item, filterValue));
  }
  return String(cellValue ?? '')
    .toLowerCase()
    .includes(String(filterValue).toLowerCase());
}

export function filterRows<T>(
  rows: T[],
  columns: DataTableColumn<T>[],
  filters: Record<string, unknown>
): T[] {
  const active = Object.entries(filters).filter(([, value]) => !isEmptyFilterValue(value));
  if (active.length === 0) return rows;
  return rows.filter((row) =>
    active.every(([columnId, filterValue]) => {
      const column = columns.find((col) => col.id === columnId);
      if (!column) return true;
      if (column.filterFn) return column.filterFn(row, filterValue);
      return defaultFilterMatch(getCellValue(row, column), filterValue);
    })
  );
}

export function isSelectionEnabled<T>(selection?: DataTableSelectionProp<T>): boolean {
  if (!selection) return false;
  if (selection === true) return true;
  return selection.enabled !== false;
}

export function getSelectionConfig<T>(
  selection?: DataTableSelectionProp<T>
): DataTableSelectionConfig<T> {
  if (!selection || selection === true) return {};
  return selection;
}

export function isPaginationEnabled(pagination?: DataTablePaginationProp): boolean {
  if (!pagination) return false;
  if (pagination === true) return true;
  return pagination.enabled !== false;
}

export function getPaginationConfig(
  pagination?: DataTablePaginationProp
): DataTablePaginationConfig {
  if (!pagination || pagination === true) return {};
  return pagination;
}

export function getAddItemConfig(addItem?: DataTableAddItemProp): DataTableAddItemConfig | null {
  if (!addItem) return null;
  if (addItem === true) return { label: 'Add item', placement: 'start' };
  return { label: 'Add item', placement: 'start', ...addItem };
}

export function cycleSortState(current: DataTableSortState, columnId: string): DataTableSortState {
  if (!current || current.id !== columnId) return { id: columnId, direction: 'asc' };
  if (current.direction === 'asc') return { id: columnId, direction: 'desc' };
  return null;
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T | ((prev: T) => T)) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const valueRef = useRef(isControlled ? (value as T) : internal);
  valueRef.current = isControlled ? (value as T) : internal;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === 'function' ? (next as (prev: T) => T)(valueRef.current) : next;
      if (!isControlled) setInternal(resolved);
      onChange?.(resolved);
    },
    [isControlled, onChange]
  );

  return [valueRef.current, setValue];
}
