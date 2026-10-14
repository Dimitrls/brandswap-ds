import { useCallback, useRef, useState } from 'react';
import type {
  Column,
  GridTableColumnType,
  GridTableFilterOperator,
  GridTableFilterValue,
  GridTablePageSizeOption,
  GridTableSortState,
} from './GridTable.types';

export const DEFAULT_PAGE_SIZE_OPTIONS: GridTablePageSizeOption[] = [
  10,
  25,
  50,
  100,
  { value: -1, label: 'All' },
];

export function toCssSize(value?: string | number): string | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export const HOVER_KEY = '__hover';
export const EXPAND_KEY = '__expand';
export const SELECT_KEY = '__select';

/** Drops hidden columns and moves pinned columns to their edge, keeping relative order. */
export function getDisplayColumns<T>(columns: Column<T>[]): Column<T>[] {
  const visible = columns.filter((column) => !column.hidden);
  return [
    ...visible.filter((column) => column.pinned === 'left'),
    ...visible.filter((column) => !column.pinned),
    ...visible.filter((column) => column.pinned === 'right'),
  ];
}

export function getColumnType<T>(column: Column<T>): GridTableColumnType {
  return column.type ?? 'text';
}

export function isActionsColumn<T>(column: Column<T>): boolean {
  return getColumnType(column) === 'actions';
}

export function isColumnSortable<T>(column: Column<T>): boolean {
  if (column.sortable != null) return column.sortable;
  return !isActionsColumn(column);
}

export function isColumnFilterable<T>(column: Column<T>): boolean {
  if (column.filterable != null) return column.filterable;
  return !isActionsColumn(column);
}

export function defaultAlign<T>(column: Column<T>): 'left' | 'center' | 'right' {
  if (column.align) return column.align;
  const type = getColumnType(column);
  switch (type) {
    case 'number':
    case 'currency':
    case 'percent':
    case 'actions':
      return 'right';
    case 'text':
    case 'date':
    case 'status':
    case 'custom':
      return 'left';
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

export function defaultFilterOperators<T>(column: Column<T>): GridTableFilterOperator[] {
  if (column.filterOperators) return column.filterOperators;
  const type = getColumnType(column);
  switch (type) {
    case 'number':
    case 'currency':
    case 'percent':
    case 'date':
      return ['equals', 'gt', 'lt'];
    case 'actions':
      return [];
    case 'text':
    case 'status':
    case 'custom':
      return ['contains', 'equals', 'startsWith', 'endsWith'];
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

export function filterOperatorLabel(operator: GridTableFilterOperator): string {
  switch (operator) {
    case 'contains':
      return 'Contains';
    case 'equals':
      return 'Equals';
    case 'startsWith':
      return 'Starts with';
    case 'endsWith':
      return 'Ends with';
    case 'gt':
      return '>';
    case 'lt':
      return '<';
    default: {
      const _exhaustive: never = operator;
      return _exhaustive;
    }
  }
}

export function getCellValue<T>(row: T, column: Column<T>): unknown {
  if (typeof column.accessor === 'function') return column.accessor(row);
  if (column.accessor != null) return (row as Record<string, unknown>)[column.accessor as string];
  return undefined;
}

export function toNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9.+-]/g, '');
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

export function isNumericZero(value: unknown): boolean {
  if (value == null || value === '') return false;
  if (typeof value === 'number') return value === 0;
  const cleaned = String(value).replace(/[^0-9.+-]/g, '');
  if (cleaned === '' || cleaned === '-' || cleaned === '+' || cleaned === '.') return false;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) && parsed === 0;
}

export function primitiveString(value: unknown): string {
  if (value == null) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return '';
}

export function isPrimitiveValue(value: unknown): boolean {
  return (
    value == null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value instanceof Date
  );
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

export function compareRows<T>(a: T, b: T, columns: Column<T>[], sort: GridTableSortState): number {
  if (!sort) return 0;
  const column = columns.find((col) => col.id === sort.field);
  if (!column) return 0;
  const direction = sort.direction === 'asc' ? 1 : -1;
  if (column.sortComparator) return column.sortComparator(a, b) * direction;
  return compareValues(getCellValue(a, column), getCellValue(b, column)) * direction;
}

export function sortRows<T>(rows: T[], columns: Column<T>[], sort: GridTableSortState): T[] {
  if (!sort) return rows;
  const copy = rows.slice();
  copy.sort((a, b) => compareRows(a, b, columns, sort));
  return copy;
}

export function cycleSortState(current: GridTableSortState, field: string): GridTableSortState {
  if (!current || current.field !== field) return { field, direction: 'asc' };
  if (current.direction === 'asc') return { field, direction: 'desc' };
  return null;
}

export function isEmptyFilterValue(filter?: GridTableFilterValue): boolean {
  if (!filter) return true;
  return filter.value.trim() === '';
}

export function matchFilter(cellValue: unknown, filter: GridTableFilterValue): boolean {
  const raw = primitiveString(cellValue);
  const needle = filter.value;
  switch (filter.operator) {
    case 'contains':
      return raw.toLowerCase().includes(needle.toLowerCase());
    case 'equals':
      if (typeof cellValue === 'number' || typeof cellValue === 'boolean') {
        return toNumber(cellValue) === toNumber(needle);
      }
      return raw.toLowerCase() === needle.toLowerCase();
    case 'startsWith':
      return raw.toLowerCase().startsWith(needle.toLowerCase());
    case 'endsWith':
      return raw.toLowerCase().endsWith(needle.toLowerCase());
    case 'gt':
      return toNumber(cellValue) > toNumber(needle);
    case 'lt':
      return toNumber(cellValue) < toNumber(needle);
    default: {
      const _exhaustive: never = filter.operator;
      return _exhaustive;
    }
  }
}

export function applyColumnFilters<T>(
  rows: T[],
  columns: Column<T>[],
  filters: Record<string, GridTableFilterValue | undefined>
): T[] {
  const active = Object.entries(filters).filter(([, value]) => !isEmptyFilterValue(value));
  if (active.length === 0) return rows;
  return rows.filter((row) =>
    active.every(([columnId, filterValue]) => {
      if (!filterValue) return true;
      const column = columns.find((col) => col.id === columnId);
      if (!column) return true;
      return matchFilter(getCellValue(row, column), filterValue);
    })
  );
}

export function applyQuickFilter<T>(rows: T[], columns: Column<T>[], query: string): T[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return rows;
  const searchable = columns.filter((column) => !isActionsColumn(column));
  return rows.filter((row) =>
    searchable.some((column) => {
      const value = getCellValue(row, column);
      if (!isPrimitiveValue(value)) return false;
      return primitiveString(value).toLowerCase().includes(needle);
    })
  );
}

export function processRows<T>(
  rows: T[],
  columns: Column<T>[],
  quickFilter: string,
  filters: Record<string, GridTableFilterValue | undefined>,
  sort: GridTableSortState
): T[] {
  const quickFiltered = applyQuickFilter(rows, columns, quickFilter);
  const columnFiltered = applyColumnFilters(quickFiltered, columns, filters);
  return sortRows(columnFiltered, columns, sort);
}

export function slicePage<T>(
  rows: T[],
  page: number,
  pageSize: number,
  mode: 'client' | 'server' | undefined
): T[] {
  if (!mode || mode === 'server' || pageSize === -1) return rows;
  const start = (Math.max(page, 1) - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  if (pageSize === -1) return 1;
  return Math.max(1, Math.ceil(totalItems / Math.max(pageSize, 1)));
}

export function resolvePageSizeOption(option: GridTablePageSizeOption): {
  value: number;
  label: string;
} {
  if (typeof option === 'number') return { value: option, label: String(option) };
  return { value: option.value, label: option.label };
}

export function getColumnHeaderLabel<T>(column: Column<T>): string {
  if (typeof column.header === 'string' || typeof column.header === 'number') {
    return String(column.header);
  }
  return column.id;
}

export function sumBy<T>(rows: T[], getValue: (row: T) => unknown): number {
  return rows.reduce((sum, row) => sum + toNumber(getValue(row)), 0);
}

export function avgBy<T>(rows: T[], getValue: (row: T) => unknown): number {
  if (rows.length === 0) return 0;
  return sumBy(rows, getValue) / rows.length;
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
