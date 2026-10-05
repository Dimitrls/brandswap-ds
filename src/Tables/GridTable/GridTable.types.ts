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

export type GridTableMode = 'client' | 'server';

export type GridTablePinned = 'left' | 'right';

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
  hidden?: boolean;
  /** Sticks the column to the edge while scrolling horizontally. Pinned columns are moved to that edge. */
  pinned?: GridTablePinned;
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
  /** Defaults to `client`. */
  mode?: GridTableMode;
  /** Controlled 1-based page. Omit and use `defaultPage` to let the grid own it. */
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  defaultPageSize?: number;
  total?: number;
  pageSizeOptions?: GridTablePageSizeOption[];
  onChange?: (next: { page: number; pageSize: number }) => void;
  placement?: 'top' | 'bottom';
}

export interface GridTableSelectionConfig<T> {
  mode: 'none' | 'single' | 'multiple';
  selectedIds?: GridTableRowId[];
  defaultSelectedIds?: GridTableRowId[];
  onChange?: (ids: GridTableRowId[], rows: T[]) => void;
  isRowSelectable?: (row: T) => boolean;
}

/**
 * Either drive expansion per row (`isExpanded` + `onToggle`), or by ids
 * (`expandedIds` / `defaultExpandedIds` + `onExpandedChange`).
 */
export interface GridTableExpandableConfig<T> {
  isExpanded?: (row: T) => boolean;
  onToggle?: (row: T) => void;
  expandedIds?: GridTableRowId[];
  defaultExpandedIds?: GridTableRowId[];
  onExpandedChange?: (ids: GridTableRowId[]) => void;
  renderExpanded: (row: T) => React.ReactNode;
}

export interface GridTableSummaryConfig<T> {
  row: Partial<T> | ((processedRows: T[]) => Partial<T>);
  label?: string;
  /** Pin the summary row to the bottom of the scroll area. Implied by `stickyHeader`. */
  sticky?: boolean;
}

export interface GridTableExportCsvConfig {
  filename?: string;
  utf8Bom?: boolean;
}

export interface GridTableExportXlsConfig {
  filename?: string;
}

export interface GridTableBulkActionsContext<T> {
  selectedIds: GridTableRowId[];
  selectedRows: T[];
  clearSelection: () => void;
}

export interface GridTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
  rows: T[];
  columns: Column<T>[];
  /**
   * `index` is the row's position in `rows`. Defaults to that index, which only stays
   * stable while `rows` keeps its order; pass a real id when rows are refetched or reordered.
   */
  getRowId?: (row: T, index: number) => GridTableRowId;
  title?: React.ReactNode;
  loading?: boolean;
  emptyText?: React.ReactNode;
  density?: GridTableDensity;
  /** Styles the grid for use inside an expanded row: bordered card, compact rows, no title. */
  nested?: boolean;
  sorting?: GridTableSortState;
  defaultSorting?: GridTableSortState;
  onSortChange?: (next: GridTableSortState) => void;
  /** `server` skips client sorting; the parent sorts from `onSortChange`. */
  sortMode?: GridTableMode;
  filtering?: GridTableFilteringConfig;
  /** `server` skips client quick/column filtering; the parent filters from the filtering callbacks. */
  filterMode?: GridTableMode;
  pagination?: GridTablePaginationConfig;
  selection?: GridTableSelectionConfig<T>;
  bulkActions?: (ctx: GridTableBulkActionsContext<T>) => React.ReactNode;
  onRowClick?: (row: T) => void;
  getRowClassName?: (row: T) => string;
  hoverActions?: (row: T) => React.ReactNode;
  hoverActionsPosition?: GridTableAlign;
  expandable?: GridTableExpandableConfig<T>;
  summary?: GridTableSummaryConfig<T>;
  exportCsv?: GridTableExportCsvConfig;
  exportXls?: GridTableExportXlsConfig;
  /** Replaces the built-in CSV download, e.g. for a server-side export. Enables the CSV option. */
  onExportCsv?: () => void;
  /** Replaces the built-in XLS download. Enables the XLS option. */
  onExportXls?: () => void;
  stickyHeader?: boolean;
  /** Caps the scroll area height; header and summary stick inside it. */
  maxHeight?: string | number;
  /** Minimum table width; narrower containers scroll horizontally. */
  tableMinWidth?: string | number;
  countryCode?: GridTableCountryCode;
}

export type ColumnType = Column<unknown>;
