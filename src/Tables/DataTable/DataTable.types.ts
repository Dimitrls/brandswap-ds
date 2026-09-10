import type React from 'react';

export type DataTableAlign = 'left' | 'center' | 'right';

export type DataTableSortDirection = 'asc' | 'desc';

export type DataTableRowId = string | number;

export type DataTableFilterType = 'text' | 'select' | 'multi-select' | 'custom';

export type DataTableSortState = {
  id: string;
  direction: DataTableSortDirection;
} | null;

export interface DataTableCellContext<T> {
  value: unknown;
  row: T;
  rowIndex: number;
  column: DataTableColumn<T>;
}

export interface DataTableFilterContext<T> {
  value: unknown;
  onChange: (value: unknown) => void;
  column: DataTableColumn<T>;
}

export interface DataTableColumnFilter<T> {
  /** Built-in filter UI. Ignored when `render` is provided. */
  type?: DataTableFilterType;
  options?: unknown[];
  placeholder?: string;
  render?: (ctx: DataTableFilterContext<T>) => React.ReactNode;
}

export interface DataTableColumn<T> {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T & string;
  accessor?: (row: T) => unknown;
  cell?: (ctx: DataTableCellContext<T>) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  sortFn?: (a: T, b: T) => number;
  filterFn?: (row: T, filterValue: unknown) => boolean;
  filter?: DataTableColumnFilter<T>;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  align?: DataTableAlign;
  headerClassName?: string;
  cellClassName?: string;
}

export interface DataTableSelectionConfig<T> {
  enabled?: boolean;
  selectedRowIds?: DataTableRowId[];
  defaultSelectedRowIds?: DataTableRowId[];
  onChange?: (selectedRowIds: DataTableRowId[], selectedRows: T[]) => void;
  /** Hide the checkbox column while still supporting selected row styling. */
  showCheckboxes?: boolean;
}

export interface DataTableExpandableConfig<T> {
  enabled?: boolean;
  expandedRowIds?: DataTableRowId[];
  defaultExpandedRowIds?: DataTableRowId[];
  onChange?: (expandedRowIds: DataTableRowId[]) => void;
  renderExpandedRow: (row: T, rowIndex: number) => React.ReactNode;
  getRowCanExpand?: (row: T) => boolean;
}

export interface DataTablePaginationConfig {
  enabled?: boolean;
  /** Skip client-side paging when the consumer already sliced `data`. */
  manual?: boolean;
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  defaultPageSize?: number;
  totalItems?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showRange?: boolean;
}

export interface DataTableSortingConfig {
  sort?: DataTableSortState;
  defaultSort?: DataTableSortState;
  onSortChange?: (sort: DataTableSortState) => void;
  manual?: boolean;
}

export interface DataTableFilteringConfig {
  filters?: Record<string, unknown>;
  defaultFilters?: Record<string, unknown>;
  onFiltersChange?: (filters: Record<string, unknown>) => void;
  manual?: boolean;
}

export interface DataTableAddItemConfig {
  label?: string;
  onClick?: () => void;
  render?: () => React.ReactNode;
  /** `start` sits below the header; `end` sits after the rows. */
  placement?: 'start' | 'end';
}

export interface DataTableActionsConfig<T> {
  header?: React.ReactNode;
  render: (row: T, rowIndex: number) => React.ReactNode;
  showOnHover?: boolean;
}

export interface DataTableBulkActionsContext<T> {
  selectedRows: T[];
  selectedRowIds: DataTableRowId[];
  clearSelection: () => void;
  totalCount: number;
}

export interface DataTableBulkActionsConfig<T> {
  render: (ctx: DataTableBulkActionsContext<T>) => React.ReactNode;
  showCount?: boolean;
}

export interface DataTableFooterContext<T> {
  rows: T[];
  columns: DataTableColumn<T>[];
}

export interface DataTableFooterConfig<T> {
  /** Single full-width footer. Takes precedence over `cells`. */
  render?: (ctx: DataTableFooterContext<T>) => React.ReactNode;
  /** Per-column footer values keyed by column id. */
  cells?:
    | Record<string, React.ReactNode>
    | ((ctx: DataTableFooterContext<T>) => Record<string, React.ReactNode>);
}

export type DataTableSelectionProp<T> = boolean | DataTableSelectionConfig<T>;

export type DataTableActionsProp<T> =
  | DataTableActionsConfig<T>
  | ((row: T, rowIndex: number) => React.ReactNode);

export type DataTableBulkActionsProp<T> =
  | DataTableBulkActionsConfig<T>
  | ((ctx: DataTableBulkActionsContext<T>) => React.ReactNode);

export type DataTablePaginationProp = boolean | DataTablePaginationConfig;

export type DataTableAddItemProp = boolean | DataTableAddItemConfig;

export type DataTableVariant = 'default' | 'separated';

/**
 * Flexible data table. All features (selection, sorting, filtering, expansion,
 * actions, pagination, add-item, footer) are opt-in via props/column config.
 */
export interface DataTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId?: (row: T, index: number) => DataTableRowId;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Slot above the table (upload area, custom filters, etc.). */
  topContent?: React.ReactNode;
  toolbar?: React.ReactNode;
  /** Table-level actions (e.g. export menu), typically top-right. */
  headerActions?: React.ReactNode;
  selection?: DataTableSelectionProp<T>;
  expandable?: DataTableExpandableConfig<T>;
  actions?: DataTableActionsProp<T>;
  bulkActions?: DataTableBulkActionsProp<T>;
  addItem?: DataTableAddItemProp;
  pagination?: DataTablePaginationProp;
  sorting?: DataTableSortingConfig;
  filtering?: DataTableFilteringConfig;
  footer?: DataTableFooterConfig<T>;
  loading?: boolean;
  loadingContent?: React.ReactNode;
  emptyContent?: React.ReactNode;
  emptyMessage?: string;
  /** `separated` renders rows as spaced, rounded surfaces. */
  variant?: DataTableVariant;
  hideHeader?: boolean;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  maxHeight?: string | number;
  getRowClassName?: (row: T, rowIndex: number) => string;
  onRowClick?: (row: T, rowIndex: number) => void;
}
