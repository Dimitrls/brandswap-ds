import React, { useEffect, useMemo } from 'react';
import './GridTable.css';

import { Checkbox } from '../../FormElements/Checkbox';
import { Icon } from '../../Icons/Icon';
import { DateCell } from './cells/DateCell';
import { MoneyCell } from './cells/MoneyCell';
import { PercentCell } from './cells/PercentCell';
import { StatusCell } from './cells/StatusCell';
import { exportRowsToCsv } from './exportCsv';
import { GridTableHeader } from './GridTableHeader';
import { GridTableToolbar } from './GridTableToolbar';
import type {
  Column,
  GridTableColumnType,
  GridTableCountryCode,
  GridTableFilterValue,
  GridTableProps,
  GridTableRowId,
} from './GridTable.types';
import {
  cycleSortState,
  DEFAULT_PAGE_SIZE_OPTIONS,
  defaultAlign,
  getCellValue,
  getTotalPages,
  isNumericZero,
  primitiveString,
  processRows,
  slicePage,
  toCssSize,
  useControllableState,
} from './GridTable.utils';

const styles: Record<string, string> = {
  root: 'bs-grid-table',
  body: 'bs-grid-table--body',
  scroll: 'bs-grid-table--scroll',
  sticky: 'bs-grid-table--sticky',
  table: 'bs-grid-table--table',
  col: 'bs-grid-table--col',
  colFlex: 'bs-grid-table--colFlex',
  alignLeft: 'bs-grid-table--alignLeft',
  alignCenter: 'bs-grid-table--alignCenter',
  alignRight: 'bs-grid-table--alignRight',
  selectCol: 'bs-grid-table--selectCol',
  expandCol: 'bs-grid-table--expandCol',
  actionsCol: 'bs-grid-table--actionsCol',
  cellWrap: 'bs-grid-table--cellWrap',
  clickable: 'bs-grid-table--clickable',
  selected: 'bs-grid-table--selected',
  iconBtn: 'bs-grid-table--iconBtn',
  expandedRow: 'bs-grid-table--expandedRow',
  expandedCell: 'bs-grid-table--expandedCell',
  summary: 'bs-grid-table--summary',
  emptyRow: 'bs-grid-table--emptyRow',
  overlay: 'bs-grid-table--overlay',
  spinner: 'bs-grid-table--spinner',
  paginationBottom: 'bs-grid-table--paginationBottom',
};

const INTERACTIVE_SELECTOR = 'button, a, input, label, textarea, select, [data-stop-row-click], [data-bs-filter]';

function alignClass(align: 'left' | 'center' | 'right'): string {
  if (align === 'center') return styles.alignCenter;
  if (align === 'right') return styles.alignRight;
  return styles.alignLeft;
}

function densityClass(density: GridTableProps<unknown>['density']): string {
  if (density === 'compact') return 'bs-grid-table--density-compact';
  if (density === 'media') return 'bs-grid-table--density-media';
  return 'bs-grid-table--density-default';
}

function getColumnCount<T>(
  columns: Column<T>[],
  selectionEnabled: boolean,
  expandableEnabled: boolean
): number {
  return columns.length + (selectionEnabled ? 1 : 0) + (expandableEnabled ? 1 : 0);
}

function renderTypedCell<T>(
  type: GridTableColumnType,
  value: unknown,
  hideZero: boolean,
  countryCode: GridTableCountryCode
): React.ReactNode {
  if (hideZero && isNumericZero(value)) return null;
  switch (type) {
    case 'status':
      return <StatusCell value={value} />;
    case 'currency':
      return <MoneyCell value={value} countryCode={countryCode} hideZero={hideZero} />;
    case 'percent':
      return <PercentCell value={value} hideZero={hideZero} />;
    case 'date':
      return <DateCell value={value} countryCode={countryCode} />;
    case 'number':
      if (value == null || value === '') return null;
      return primitiveString(value);
    case 'text':
    case 'custom':
      if (value == null || value === '') return null;
      return primitiveString(value);
    case 'actions':
      return null;
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

function renderCell<T>(
  column: Column<T>,
  row: T,
  rowIndex: number,
  countryCode: GridTableCountryCode
): React.ReactNode {
  const value = getCellValue(row, column);
  if (column.render) {
    return column.render({ value, row, rowIndex, column });
  }
  return renderTypedCell(column.type ?? 'text', value, Boolean(column.hideZero), countryCode);
}

function getColVars<T>(column: Column<T>): React.CSSProperties {
  const vars: Record<string, string> = {};
  const width = toCssSize(column.width);
  const minWidth = toCssSize(column.minWidth);
  if (width) vars['--bs-grid-col-width'] = width;
  if (minWidth) vars['--bs-grid-col-min-width'] = minWidth;
  return vars as React.CSSProperties;
}

/**
 * Admin-ready data grid. FiltersBar stays above; GridTable owns sort, quick
 * filter, paging, selection, expand, insight summary, and CSV export.
 */
export function GridTable<T>({
  rows,
  columns,
  getRowId,
  loading = false,
  emptyText = 'No data',
  density = 'default',
  sorting,
  defaultSorting = null,
  onSortChange,
  filtering,
  pagination,
  selection,
  onRowClick,
  getRowClassName,
  expandable,
  summary,
  exportCsv,
  stickyHeader = false,
  countryCode = 'GB',
  className,
  ...props
}: GridTableProps<T>) {
  const selectionMode = selection?.mode ?? 'none';
  const selectionEnabled = selectionMode === 'single' || selectionMode === 'multiple';
  const expandableEnabled = Boolean(expandable);
  const colSpan = getColumnCount(columns, selectionEnabled, expandableEnabled);
  const paginationPlacement = pagination?.placement ?? 'top';

  const [sort, setSort] = useControllableState({
    value: sorting,
    defaultValue: defaultSorting,
    onChange: onSortChange,
  });
  const [filters, setFilters] = useControllableState<Record<string, GridTableFilterValue | undefined>>({
    value: filtering?.filters,
    defaultValue: filtering?.defaultFilters ?? {},
    onChange: filtering?.onFiltersChange,
  });
  const [quickFilter, setQuickFilter] = useControllableState({
    value: filtering?.quickFilter,
    defaultValue: filtering?.defaultQuickFilter ?? '',
    onChange: filtering?.onQuickFilterChange,
  });
  const [selectedIds, setSelectedIds] = useControllableState<GridTableRowId[]>({
    value: selection?.selectedIds,
    defaultValue: selection?.defaultSelectedIds ?? [],
    onChange: (ids) => {
      const selectedRows = rows.filter((row) => ids.includes(getRowId(row)));
      selection?.onChange?.(ids, selectedRows);
    },
  });
  const [openFilterId, setOpenFilterId] = useControllableState<string | null>({
    defaultValue: null,
  });

  useEffect(() => {
    if (!openFilterId) return undefined;
    const handlePointer = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target && target.closest('[data-bs-filter]')) return;
      setOpenFilterId(null);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenFilterId(null);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [openFilterId, setOpenFilterId]);

  const processedRows = useMemo(
    () => processRows(rows, columns, quickFilter, filters, sort),
    [columns, filters, quickFilter, rows, sort]
  );

  const page = pagination?.page ?? 1;
  const pageSize = pagination?.pageSize ?? 10;
  const totalItems =
    pagination?.mode === 'server' ? (pagination.total ?? processedRows.length) : processedRows.length;
  const totalPages = getTotalPages(totalItems, pageSize);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const visibleRows = useMemo(
    () => slicePage(processedRows, currentPage, pageSize, pagination?.mode),
    [currentPage, pageSize, pagination?.mode, processedRows]
  );

  const selectableVisible = visibleRows.filter((row) =>
    selection?.isRowSelectable ? selection.isRowSelectable(row) : true
  );
  const selectableVisibleIds = selectableVisible.map((row) => getRowId(row));
  const selectedVisibleCount = selectableVisibleIds.filter((id) => selectedIds.includes(id)).length;
  const allSelected = selectableVisibleIds.length > 0 && selectedVisibleCount === selectableVisibleIds.length;
  const someSelected = selectedVisibleCount > 0 && !allSelected;

  const summaryRow = useMemo(() => {
    if (!summary) return null;
    return typeof summary.row === 'function' ? summary.row(processedRows) : summary.row;
  }, [processedRows, summary]);

  const handleToggleSelectAll = (checked: boolean) => {
    if (selectionMode !== 'multiple') return;
    if (checked) {
      setSelectedIds(Array.from(new Set([...selectedIds, ...selectableVisibleIds])));
      return;
    }
    setSelectedIds(selectedIds.filter((id) => !selectableVisibleIds.includes(id)));
  };

  const handleToggleRow = (row: T, checked: boolean) => {
    const rowId = getRowId(row);
    if (selectionMode === 'single') {
      setSelectedIds(checked ? [rowId] : []);
      return;
    }
    setSelectedIds(
      checked ? Array.from(new Set([...selectedIds, rowId])) : selectedIds.filter((id) => id !== rowId)
    );
  };

  const handleRowClick = (row: T, event: React.MouseEvent) => {
    if (!onRowClick) return;
    const target = event.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTOR)) return;
    onRowClick(row);
  };

  const handleExport = () => {
    exportRowsToCsv(processedRows, columns, exportCsv);
  };

  const pager = pagination ? (
    <GridTableToolbar
      showSearch={false}
      quickFilter={quickFilter}
      onQuickFilterChange={setQuickFilter}
      showExport={false}
      onExport={handleExport}
      showPagination
      page={currentPage}
      pageSize={pageSize}
      totalPages={totalPages}
      pageSizeOptions={pagination.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS}
      onPageChange={(nextPage) => pagination.onChange({ page: nextPage, pageSize })}
      onPageSizeChange={(nextSize) => pagination.onChange({ page: 1, pageSize: nextSize })}
    />
  ) : null;

  const showTopToolbar = Boolean(filtering) || Boolean(exportCsv) || (Boolean(pagination) && paginationPlacement === 'top');

  return (
    <div className={[styles.root, densityClass(density), className].filter(Boolean).join(' ')} {...props}>
      {showTopToolbar && (
        <GridTableToolbar
          showSearch={Boolean(filtering)}
          quickFilter={quickFilter}
          onQuickFilterChange={setQuickFilter}
          showExport={Boolean(exportCsv)}
          onExport={handleExport}
          showPagination={Boolean(pagination) && paginationPlacement === 'top'}
          page={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          pageSizeOptions={pagination?.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS}
          onPageChange={(nextPage) => pagination?.onChange({ page: nextPage, pageSize })}
          onPageSizeChange={(nextSize) => pagination?.onChange({ page: 1, pageSize: nextSize })}
        />
      )}
      <div className={styles.body}>
        <div className={[styles.scroll, stickyHeader ? styles.sticky : ''].filter(Boolean).join(' ')}>
          <table className={styles.table}>
            <colgroup>
              {expandableEnabled && <col className={styles.expandCol} />}
              {selectionEnabled && <col className={styles.selectCol} />}
              {columns.map((column) => (
                <col
                  key={column.id}
                  className={[styles.col, column.flex ? styles.colFlex : ''].filter(Boolean).join(' ')}
                  style={getColVars(column)}
                />
              ))}
            </colgroup>
            <GridTableHeader
              columns={columns}
              selectionEnabled={selectionEnabled}
              showSelectAll={selectionMode === 'multiple'}
              expandableEnabled={expandableEnabled}
              allSelected={allSelected}
              someSelected={someSelected}
              onToggleSelectAll={handleToggleSelectAll}
              sort={sort}
              onSort={(columnId) => setSort(cycleSortState(sort, columnId))}
              filters={filters}
              onFilterChange={(columnId, value) => setFilters({ ...filters, [columnId]: value })}
              openFilterId={openFilterId}
              onOpenFilter={setOpenFilterId}
            />
            <tbody>
              {!loading &&
                visibleRows.map((row, rowIndex) => {
                  const rowId = getRowId(row);
                  const selected = selectedIds.includes(rowId);
                  const expanded = Boolean(expandable?.isExpanded(row));
                  const canSelect =
                    selectionEnabled &&
                    (selection?.isRowSelectable ? selection.isRowSelectable(row) : true);

                  return (
                    <React.Fragment key={rowId}>
                      <tr
                        className={
                          [
                            selected ? styles.selected : '',
                            onRowClick ? styles.clickable : '',
                            getRowClassName?.(row),
                          ]
                            .filter(Boolean)
                            .join(' ') || undefined
                        }
                        onClick={onRowClick ? (event) => handleRowClick(row, event) : undefined}
                      >
                        {expandableEnabled && expandable && (
                          <td className={styles.expandCol}>
                            <button
                              type="button"
                              className={styles.iconBtn}
                              aria-expanded={expanded}
                              aria-label={expanded ? `Collapse row ${rowId}` : `Expand row ${rowId}`}
                              onClick={() => expandable.onToggle(row)}
                            >
                              <Icon name={expanded ? 'chevron-down' : 'chevron-right'} size={16} />
                            </button>
                          </td>
                        )}
                        {selectionEnabled && (
                          <td className={styles.selectCol}>
                            {canSelect ? (
                              <Checkbox
                                label={`Select row ${rowId}`}
                                hideLabel
                                checked={selected}
                                onChange={(checked) => handleToggleRow(row, checked)}
                              />
                            ) : null}
                          </td>
                        )}
                        {columns.map((column) => {
                          const type = column.type ?? 'text';
                          const align = defaultAlign(column);
                          return (
                            <td
                              key={column.id}
                              className={[
                                alignClass(align),
                                type === 'actions' ? styles.actionsCol : '',
                                type === 'text' ? styles.cellWrap : '',
                              ]
                                .filter(Boolean)
                                .join(' ')}
                            >
                              {renderCell(column, row, rowIndex, countryCode)}
                            </td>
                          );
                        })}
                      </tr>
                      {expanded && expandable && (
                        <tr className={styles.expandedRow}>
                          <td className={styles.expandedCell} colSpan={colSpan}>
                            {expandable.renderExpanded(row)}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              {(loading || visibleRows.length === 0) && (
                <tr className={styles.emptyRow}>
                  <td colSpan={colSpan}>{loading ? null : emptyText}</td>
                </tr>
              )}
            </tbody>
            {summary && summaryRow && !loading && (
              <tfoot>
                <tr className={styles.summary}>
                  {expandableEnabled && <td className={styles.expandCol} />}
                  {selectionEnabled && <td className={styles.selectCol} />}
                  {columns.map((column, index) => {
                    const align = defaultAlign(column);
                    const isFirstData = index === 0;
                    const value = getCellValue(summaryRow as T, column);
                    const content = isFirstData && summary.label
                      ? summary.label
                      : column.render
                        ? column.render({
                            value,
                            row: summaryRow as T,
                            rowIndex: -1,
                            column,
                          })
                        : renderTypedCell(column.type ?? 'text', value, Boolean(column.hideZero), countryCode);
                    return (
                      <td key={column.id} className={alignClass(align)}>
                        {content}
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        {loading && (
          <div className={styles.overlay} role="status" aria-live="polite" aria-label="Loading">
            <span className={styles.spinner} aria-hidden="true" />
          </div>
        )}
      </div>
      {pagination && paginationPlacement === 'bottom' && (
        <div className={styles.paginationBottom}>{pager}</div>
      )}
    </div>
  );
}
