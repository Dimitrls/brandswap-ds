import type React from 'react';

export type GridTableRowId = string | number;

export type GridTableAlign = 'left' | 'center' | 'right';

export type GridTableDensity = 'compact' | 'default' | 'media';

export type GridTableColumnType =
  | 'text'
  | 'number'
  | 'date'
  | 'currency'
  | 'percent'
  | 'status'
  | 'actions'
  | 'custom';

export type GridTableSortDirection = 'asc' | 'desc';

export type GridTableFilterOperator =
  | 'contains'
  | 'equals'
  | 'startsWith'
  | 'endsWith'
  | 'gt'
  | 'lt';

export type GridTableCountryCode = 'GB' | 'US';

export type GridTableSortState = {
  field: string;
  direction: GridTableSortDirection;
} | null;

export interface GridTableFilterValue {
  operator: GridTableFilterOperator;
  value: string;
}

export interface GridTableCellContext<T> {
  value: unknown;
  row: T;
  rowIndex: number;
  column: Column<T>;
}

export interface Column<T> {
  id: string;
  header: React.ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
  width?: string | number;
  minWidth?: string | number;
  flex?: number;
  align?: GridTableAlign;
  sortable?: boolean;
  filterable?: boolean;
  type?: GridTableColumnType;
  render?: (ctx: GridTableCellContext<T>) => React.ReactNode;
  sortComparator?: (a: T, b: T) => number;
  headerTooltip?: React.ReactNode;
  hideZero?: boolean;
  filterOperators?: GridTableFilterOperator[];
}

export interface GridTableFilteringConfig {
  filters?: Record<string, GridTableFilterValue | undefined>;
  defaultFilters?: Record<string, GridTableFilterValue | undefined>;
  onFiltersChange?: (filters: Record<string, GridTableFilterValue | undefined>) => void;
  quickFilter?: string;
  defaultQuickFilter?: string;
  onQuickFilterChange?: (value: string) => void;
}

export type GridTablePageSizeOption = number | { value: -1; label: string };

export interface GridTablePaginationConfig {
  mode: 'client' | 'server';
  page: number;
  pageSize: number;
  total?: number;
  pageSizeOptions?: GridTablePageSizeOption[];
  onChange: (next: { page: number; pageSize: number }) => void;
  placement?: 'top' | 'bottom';
}

export interface GridTableSelectionConfig<T> {
  mode: 'none' | 'single' | 'multiple';
  selectedIds?: GridTableRowId[];
  defaultSelectedIds?: GridTableRowId[];
  onChange?: (ids: GridTableRowId[], rows: T[]) => void;
  isRowSelectable?: (row: T) => boolean;
}

export interface GridTableExpandableConfig<T> {
  isExpanded: (row: T) => boolean;
  onToggle: (row: T) => void;
  renderExpanded: (row: T) => React.ReactNode;
}

export interface GridTableSummaryConfig<T> {
  row: Partial<T> | ((processedRows: T[]) => Partial<T>);
  label?: string;
}

export interface GridTableExportCsvConfig {
  filename?: string;
  utf8Bom?: boolean;
}

export interface GridTableProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  rows: T[];
  columns: Column<T>[];
  getRowId: (row: T) => GridTableRowId;
  loading?: boolean;
  emptyText?: string;
  density?: GridTableDensity;
  sorting?: GridTableSortState;
  defaultSorting?: GridTableSortState;
  onSortChange?: (next: GridTableSortState) => void;
  filtering?: GridTableFilteringConfig;
  pagination?: GridTablePaginationConfig;
  selection?: GridTableSelectionConfig<T>;
  onRowClick?: (row: T) => void;
  getRowClassName?: (row: T) => string;
  expandable?: GridTableExpandableConfig<T>;
  summary?: GridTableSummaryConfig<T>;
  exportCsv?: GridTableExportCsvConfig;
  stickyHeader?: boolean;
  countryCode?: GridTableCountryCode;
}

export type ColumnType = Column<unknown>;
