import React from 'react';

export type DataTableAlign = 'left' | 'center' | 'right';

export type DataTableSortDirection = 'asc' | 'desc';

export type DataTableRowId = string | number;

export type DataTableFixed = 'left' | 'right';

export type DataTableMode = 'client' | 'server';

export type DataTableSortState = {
  columnId: string;
  direction: DataTableSortDirection;
} | null;

export type DataTableFilters = Record<string, string>;

export interface DataTableCellContext<T> {
  value: unknown;
  row: T;
  column: DataTableColumn<T>;
}

export interface DataTableColumn<T> {
  id: string;
  title: React.ReactNode;
  dataIndex?: keyof T;
  accessor?: (row: T) => unknown;
  cell?: (ctx: DataTableCellContext<T>) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterPlaceholder?: string;
  hidden?: boolean;
  align?: DataTableAlign;
  width?: number | string;
  minWidth?: number | string;
  fixed?: DataTableFixed;
}

export interface DataTableSelectionConfig<T> {
  selectedRowIds?: DataTableRowId[];
  defaultSelectedRowIds?: DataTableRowId[];
  onChange?: (selectedRowIds: DataTableRowId[], selectedRows: T[]) => void;
}

export interface DataTableExpandableConfig<T> {
  expandedRowIds?: DataTableRowId[];
  defaultExpandedRowIds?: DataTableRowId[];
  onChange?: (expandedRowIds: DataTableRowId[]) => void;
  renderExpandedRow: (row: T) => React.ReactNode;
}

export interface DataTablePaginationConfig {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
}

export interface DataTableBulkActionsContext<T> {
  selectedRows: T[];
  selectedRowIds: DataTableRowId[];
  clearSelection: () => void;
}

export interface DataTableScrollConfig {
  x?: number | string;
  y?: number | string;
}

export type DataTableHoverActionsPosition = DataTableAlign;

export interface DataTableSummaryContext<T> {
  rows: T[];
  columns: DataTableColumn<T>[];
}

export type DataTableTotalRow<T> =
  | Record<string, React.ReactNode>
  | ((ctx: DataTableSummaryContext<T>) => Record<string, React.ReactNode>);

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId?: (row: T, index: number) => DataTableRowId;
  title?: React.ReactNode;
  rowSelection?: boolean | DataTableSelectionConfig<T>;
  expandable?: DataTableExpandableConfig<T>;
  sort?: DataTableSortState;
  defaultSort?: DataTableSortState;
  onSortChange?: (sort: DataTableSortState) => void;
  sortMode?: DataTableMode;
  filters?: DataTableFilters;
  defaultFilters?: DataTableFilters;
  onFiltersChange?: (filters: DataTableFilters) => void;
  filterMode?: DataTableMode;
  pagination?: false | DataTablePaginationConfig;
  rowActions?: (row: T) => React.ReactNode;
  hoverActions?: (row: T) => React.ReactNode;
  hoverActionsPosition?: DataTableHoverActionsPosition;
  bulkActions?: (ctx: DataTableBulkActionsContext<T>) => React.ReactNode;
  totalRow?: DataTableTotalRow<T>;
  stickyTotalRow?: boolean;
  showExportMenu?: boolean;
  exportFileName?: string;
  onExportCsv?: () => void;
  onExportXls?: () => void;
  scroll?: DataTableScrollConfig;
  loading?: boolean;
  emptyMessage?: React.ReactNode;
  nested?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
