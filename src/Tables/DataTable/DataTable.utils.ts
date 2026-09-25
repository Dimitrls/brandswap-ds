import { useRef, useState } from 'react';
import type {
  DataTableColumn,
  DataTableFilters,
  DataTablePaginationConfig,
  DataTableRowId,
  DataTableSelectionConfig,
  DataTableSortState,
} from './DataTable.types';

export const SELECT_COL_WIDTH = 40;
export const EXPAND_COL_WIDTH = 40;
export const DEFAULT_COL_WIDTH = 160;

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

  const setValue = (next: T | ((prev: T) => T)) => {
    const resolved =
      typeof next === 'function' ? (next as (prev: T) => T)(valueRef.current) : next;
    valueRef.current = resolved;
    if (!isControlled) setInternal(resolved);
    onChange?.(resolved);
  };

  return [isControlled ? (value as T) : internal, setValue];
}

export function defaultGetRowId<T>(row: T, index: number): DataTableRowId {
  const record = row as { id?: DataTableRowId; key?: DataTableRowId };
  return record.id ?? record.key ?? index;
}

export function getCellValue<T>(row: T, column: DataTableColumn<T>): unknown {
  if (column.accessor) return column.accessor(row);
  if (column.dataIndex) return (row as Record<string, unknown>)[column.dataIndex as string];
  return (row as Record<string, unknown>)[column.id];
}

export function toCssSize(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export function toPx(value?: number | string, fallback = DEFAULT_COL_WIDTH): number {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return value;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function cycleSortState(
  current: DataTableSortState,
  columnId: string
): DataTableSortState {
  if (!current || current.columnId !== columnId) {
    return { columnId, direction: 'asc' };
  }
  if (current.direction === 'asc') return { columnId, direction: 'desc' };
  return null;
}

export function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

export function sortRows<T>(
  rows: T[],
  columns: DataTableColumn<T>[],
  sort: DataTableSortState
): T[] {
  if (!sort) return rows;
  const column = columns.find((item) => item.id === sort.columnId);
  if (!column) return rows;
  const next = [...rows];
  next.sort((left, right) => {
    const result = compareValues(getCellValue(left, column), getCellValue(right, column));
    return sort.direction === 'asc' ? result : -result;
  });
  return next;
}

export function filterRows<T>(
  rows: T[],
  columns: DataTableColumn<T>[],
  filters: DataTableFilters
): T[] {
  const active = Object.entries(filters).filter(([, value]) => value.trim() !== '');
  if (!active.length) return rows;
  return rows.filter((row) =>
    active.every(([columnId, value]) => {
      const column = columns.find((item) => item.id === columnId);
      if (!column) return true;
      return String(getCellValue(row, column) ?? '')
        .toLowerCase()
        .includes(value.trim().toLowerCase());
    })
  );
}

export function paginateRows<T>(rows: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}

export function isSelectionEnabled<T>(
  selection?: boolean | DataTableSelectionConfig<T>
): boolean {
  return Boolean(selection);
}

export function getSelectionConfig<T>(
  selection?: boolean | DataTableSelectionConfig<T>
): DataTableSelectionConfig<T> {
  if (!selection || selection === true) return {};
  return selection;
}

export function getPaginationConfig(
  pagination?: false | DataTablePaginationConfig
): DataTablePaginationConfig | null {
  if (pagination === false) return null;
  return pagination ?? {};
}

export function getVisibleColumns<T>(columns: DataTableColumn<T>[]): DataTableColumn<T>[] {
  return columns.filter((column) => !column.hidden);
}

export function getFixedOffsets<T>(
  columns: DataTableColumn<T>[],
  leadingWidth: number,
  trailingWidth = 0
): { left: Record<string, number>; right: Record<string, number> } {
  const left: Record<string, number> = {};
  const right: Record<string, number> = {};
  let leftOffset = leadingWidth;
  columns.forEach((column) => {
    if (column.fixed === 'left') {
      left[column.id] = leftOffset;
      leftOffset += toPx(column.width ?? column.minWidth);
    }
  });
  let rightOffset = trailingWidth;
  [...columns].reverse().forEach((column) => {
    if (column.fixed === 'right') {
      right[column.id] = rightOffset;
      rightOffset += toPx(column.width ?? column.minWidth);
    }
  });
  return { left, right };
}
