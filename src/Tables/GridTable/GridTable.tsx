import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './GridTable.css';

import { Button } from '../../Buttons/Button';
import { Checkbox } from '../../FormElements/Checkbox';
import { Icon } from '../../Icons/Icon';
import { Heading } from '../../Typography/Heading';
import { DateCell } from './cells/DateCell';
import { MoneyCell } from './cells/MoneyCell';
import { PercentCell } from './cells/PercentCell';
import { StatusCell } from './cells/StatusCell';
import { exportRowsToCsv, exportRowsToXls } from './exportCsv';
import { GridTableHeader } from './GridTableHeader';
import type { GridTableCellPin } from './GridTableHeader';
import { GridTableToolbar } from './GridTableToolbar';
import type { GridTableExportFormat } from './GridTableToolbar';
import type {
  Column,
  GridTableAlign,
  GridTableColumnType,
  GridTableCountryCode,
  GridTableFilterValue,
  GridTableProps,
  GridTableRowId,
  GridTableSortState,
} from './GridTable.types';
import {
  cycleSortState,
  DEFAULT_PAGE_SIZE_OPTIONS,
  defaultAlign,
  EXPAND_KEY,
  getCellValue,
  getDisplayColumns,
  getTotalPages,
  HOVER_KEY,
  isNumericZero,
  primitiveString,
  processRows,
  SELECT_KEY,
  slicePage,
  toCssSize,
  useControllableState,
} from './GridTable.utils';

const styles: Record<string, string> = {
  root: 'bs-grid-table',
  title: 'bs-grid-table--title',
  body: 'bs-grid-table--body',
  scroll: 'bs-grid-table--scroll',
  sticky: 'bs-grid-table--sticky',
  stickySummary: 'bs-grid-table--stickySummary',
  pingLeft: 'bs-grid-table--pingLeft',
  pingRight: 'bs-grid-table--pingRight',
  table: 'bs-grid-table--table',
  col: 'bs-grid-table--col',
  colFlex: 'bs-grid-table--colFlex',
  hoverCol: 'bs-grid-table--hoverCol',
  alignLeft: 'bs-grid-table--alignLeft',
  alignCenter: 'bs-grid-table--alignCenter',
  alignRight: 'bs-grid-table--alignRight',
  selectCol: 'bs-grid-table--selectCol',
  expandCol: 'bs-grid-table--expandCol',
  actionsCol: 'bs-grid-table--actionsCol',
  cellWrap: 'bs-grid-table--cellWrap',
  pinned: 'bs-grid-table--pinned',
  pinnedLeftEdge: 'bs-grid-table--pinnedLeftEdge',
  pinnedRightEdge: 'bs-grid-table--pinnedRightEdge',
  clickable: 'bs-grid-table--clickable',
  selected: 'bs-grid-table--selected',
  hoverRow: 'bs-grid-table--hoverRow',
  hoverAnchor: 'bs-grid-table--hoverAnchor',
  hoverActions: 'bs-grid-table--hoverActions',
  hoverChip: 'bs-grid-table--hoverChip',
  iconBtn: 'bs-grid-table--iconBtn',
  expandedRow: 'bs-grid-table--expandedRow',
  expandedCell: 'bs-grid-table--expandedCell',
  summary: 'bs-grid-table--summary',
  emptyRow: 'bs-grid-table--emptyRow',
  overlay: 'bs-grid-table--overlay',
  spinner: 'bs-grid-table--spinner',
  paginationBottom: 'bs-grid-table--paginationBottom',
  bulkBar: 'bs-grid-table--bulkBar',
  bulkCount: 'bs-grid-table--bulkCount',
  bulkActions: 'bs-grid-table--bulkActions',
};

const INTERACTIVE_SELECTOR = 'button, a, input, label, textarea, select, [data-stop-row-click], [data-bs-filter]';

const NO_PIN: GridTableCellPin = {};

function joinClasses(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(' ');
}

function alignClass(align: GridTableAlign): string {
  if (align === 'center') return styles.alignCenter;
  if (align === 'right') return styles.alignRight;
  return styles.alignLeft;
}

function hoverPositionClass(position: GridTableAlign): string {
  switch (position) {
    case 'left':
      return 'bs-grid-table--hoverLeft';
    case 'center':
      return 'bs-grid-table--hoverCenter';
    case 'right':
      return 'bs-grid-table--hoverRight';
    default: {
      const _exhaustive: never = position;
      return _exhaustive;
    }
  }
}

function densityClass(density: GridTableProps<unknown>['density']): string {
  if (density === 'compact') return 'bs-grid-table--density-compact';
  if (density === 'media') return 'bs-grid-table--density-media';
  return 'bs-grid-table--density-default';
}

function renderTypedCell(
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

function sameOffsets(a: Record<string, number>, b: Record<string, number>): boolean {
  const aKeys = Object.keys(a);
  if (aKeys.length !== Object.keys(b).length) return false;
  return aKeys.every((key) => a[key] === b[key]);
}

/**
 * Admin-ready data grid. FiltersBar stays above; GridTable owns sort, quick
 * filter, paging, selection, expand, pinned columns, insight summary, and export.
 */
export function GridTable<T>({
  rows,
  columns,
  getRowId,
  title,
  loading = false,
  emptyText = 'No data',
  density = 'default',
  sorting,
  defaultSorting = null,
  onSortChange,
  sortMode = 'client',
  filtering,
  filterMode = 'client',
  pagination,
  selection,
  bulkActions,
  onRowClick,
  getRowClassName,
  hoverActions,
  hoverActionsPosition = 'right',
  expandable,
  summary,
  exportCsv,
  exportXls,
  onExportCsv,
  onExportXls,
  stickyHeader = false,
  maxHeight,
  countryCode = 'GB',
  className,
  ...props
}: GridTableProps<T>) {
  const displayColumns = useMemo(() => getDisplayColumns(columns), [columns]);
  const selectionMode = selection?.mode ?? 'none';
  const selectionEnabled = selectionMode === 'single' || selectionMode === 'multiple';
  const expandableEnabled = Boolean(expandable);
  const hoverEnabled = Boolean(hoverActions);
  const colSpan =
    displayColumns.length + (selectionEnabled ? 1 : 0) + (expandableEnabled ? 1 : 0) + (hoverEnabled ? 1 : 0);
  const paginationPlacement = pagination?.placement ?? 'top';
  const paginationMode = pagination?.mode ?? 'client';
  const headerSticky = stickyHeader || maxHeight != null;
  const summarySticky = headerSticky || Boolean(summary?.sticky);

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
  const [expandedIds, setExpandedIds] = useControllableState<GridTableRowId[]>({
    value: expandable?.expandedIds,
    defaultValue: expandable?.defaultExpandedIds ?? [],
    onChange: expandable?.onExpandedChange,
  });
  const [page, setPage] = useControllableState({
    value: pagination?.page,
    defaultValue: pagination?.defaultPage ?? 1,
  });
  const [pageSize, setPageSize] = useControllableState({
    value: pagination?.pageSize,
    defaultValue: pagination?.defaultPageSize ?? 10,
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

  const changePage = (nextPage: number, nextSize: number) => {
    setPage(nextPage);
    setPageSize(nextSize);
    pagination?.onChange?.({ page: nextPage, pageSize: nextSize });
  };

  const resetToFirstPage = () => {
    if (pagination && page !== 1) changePage(1, pageSize);
  };

  const updateSort = (next: GridTableSortState) => {
    setSort(next);
    resetToFirstPage();
  };

  const updateFilters = (next: Record<string, GridTableFilterValue | undefined>) => {
    setFilters(next);
    resetToFirstPage();
  };

  const updateQuickFilter = (next: string) => {
    setQuickFilter(next);
    resetToFirstPage();
  };

  const processedRows = useMemo(
    () =>
      processRows(
        rows,
        displayColumns,
        filterMode === 'server' ? '' : quickFilter,
        filterMode === 'server' ? {} : filters,
        sortMode === 'server' ? null : sort
      ),
    [displayColumns, filterMode, filters, quickFilter, rows, sort, sortMode]
  );

  const totalItems =
    paginationMode === 'server' ? (pagination?.total ?? processedRows.length) : processedRows.length;
  const totalPages = getTotalPages(totalItems, pageSize);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const visibleRows = useMemo(
    () => (pagination ? slicePage(processedRows, currentPage, pageSize, paginationMode) : processedRows),
    [currentPage, pageSize, pagination, paginationMode, processedRows]
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

  // Pinned columns: utility columns join the left pin group so they never scroll under it.
  const cellKeys = useMemo(
    () => [
      ...(hoverEnabled ? [HOVER_KEY] : []),
      ...(expandableEnabled ? [EXPAND_KEY] : []),
      ...(selectionEnabled ? [SELECT_KEY] : []),
      ...displayColumns.map((column) => column.id),
    ],
    [displayColumns, expandableEnabled, hoverEnabled, selectionEnabled]
  );
  const leftPinKeys = useMemo(() => {
    const pinnedIds = displayColumns.filter((column) => column.pinned === 'left').map((column) => column.id);
    if (pinnedIds.length === 0) return [];
    return [...(expandableEnabled ? [EXPAND_KEY] : []), ...(selectionEnabled ? [SELECT_KEY] : []), ...pinnedIds];
  }, [displayColumns, expandableEnabled, selectionEnabled]);
  const rightPinKeys = useMemo(
    () => displayColumns.filter((column) => column.pinned === 'right').map((column) => column.id),
    [displayColumns]
  );
  const hasPins = leftPinKeys.length > 0 || rightPinKeys.length > 0;

  const scrollRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [pinOffsets, setPinOffsets] = useState<Record<string, number>>({});
  const [ping, setPing] = useState({ left: false, right: false });

  useLayoutEffect(() => {
    const table = tableRef.current;
    if (!hasPins || !table) return undefined;
    const measure = () => {
      const headerCells = Array.from(table.tHead?.rows[0]?.cells ?? []);
      const widths: Record<string, number> = {};
      headerCells.forEach((cell, index) => {
        const key = cellKeys[index];
        if (key) widths[key] = cell.getBoundingClientRect().width;
      });
      const next: Record<string, number> = {};
      let left = 0;
      leftPinKeys.forEach((key) => {
        next[key] = left;
        left += widths[key] ?? 0;
      });
      let right = 0;
      [...rightPinKeys].reverse().forEach((key) => {
        next[key] = right;
        right += widths[key] ?? 0;
      });
      setPinOffsets((prev) => (sameOffsets(prev, next) ? prev : next));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    Array.from(table.tHead?.rows[0]?.cells ?? []).forEach((cell) => observer.observe(cell));
    return () => observer.disconnect();
  }, [cellKeys, hasPins, leftPinKeys, rightPinKeys, visibleRows]);

  const updateScrollState = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    const maxScroll = element.scrollWidth - element.clientWidth;
    const left = element.scrollLeft > 0;
    const right = maxScroll > 1 && element.scrollLeft < maxScroll - 1;
    setPing((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
    element.style.setProperty('--bs-grid-scroll-width', `${element.clientWidth}px`);
  }, []);

  useLayoutEffect(() => {
    const element = scrollRef.current;
    if (!element || (!hasPins && !hoverEnabled)) return undefined;
    updateScrollState();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(element);
    if (tableRef.current) observer.observe(tableRef.current);
    return () => observer.disconnect();
  }, [hasPins, hoverEnabled, updateScrollState]);

  const lastLeftKey = leftPinKeys[leftPinKeys.length - 1];
  const firstRightKey = rightPinKeys[0];

  const getPin = (key: string): GridTableCellPin => {
    const side = leftPinKeys.includes(key) ? 'left' : rightPinKeys.includes(key) ? 'right' : null;
    if (!side) return NO_PIN;
    return {
      className: joinClasses(
        styles.pinned,
        key === lastLeftKey && styles.pinnedLeftEdge,
        key === firstRightKey && styles.pinnedRightEdge
      ),
      style: side === 'left' ? { left: pinOffsets[key] ?? 0 } : { right: pinOffsets[key] ?? 0 },
    };
  };

  const isRowExpanded = (row: T): boolean => {
    if (!expandable) return false;
    if (expandable.isExpanded) return expandable.isExpanded(row);
    return expandedIds.includes(getRowId(row));
  };

  const handleToggleExpand = (row: T) => {
    if (!expandable) return;
    if (!expandable.isExpanded) {
      const rowId = getRowId(row);
      setExpandedIds(
        expandedIds.includes(rowId) ? expandedIds.filter((id) => id !== rowId) : [...expandedIds, rowId]
      );
    }
    expandable.onToggle?.(row);
  };

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

  const exportFormats: GridTableExportFormat[] = [
    ...(exportCsv || onExportCsv ? (['csv'] as const) : []),
    ...(exportXls || onExportXls ? (['xls'] as const) : []),
  ];

  const handleExport = (format: GridTableExportFormat) => {
    switch (format) {
      case 'csv':
        if (onExportCsv) onExportCsv();
        else exportRowsToCsv(processedRows, displayColumns, exportCsv);
        return;
      case 'xls':
        if (onExportXls) onExportXls();
        else exportRowsToXls(processedRows, displayColumns, exportXls);
        return;
      default: {
        const _exhaustive: never = format;
        return _exhaustive;
      }
    }
  };

  const toolbarPagingProps = {
    page: currentPage,
    pageSize,
    totalPages,
    pageSizeOptions: pagination?.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS,
    onPageChange: (nextPage: number) => changePage(nextPage, pageSize),
    onPageSizeChange: (nextSize: number) => changePage(1, nextSize),
  };

  const showTopToolbar =
    Boolean(filtering) || exportFormats.length > 0 || (Boolean(pagination) && paginationPlacement === 'top');

  const selectedRows = bulkActions ? rows.filter((row) => selectedIds.includes(getRowId(row))) : [];
  const hoverClass = hoverPositionClass(hoverActionsPosition);
  const expandPin = getPin(EXPAND_KEY);
  const selectPin = getPin(SELECT_KEY);

  return (
    <div
      className={joinClasses(
        styles.root,
        densityClass(density),
        ping.left && styles.pingLeft,
        ping.right && styles.pingRight,
        className
      )}
      {...props}
    >
      {title != null && (
        <div className={styles.title}>{typeof title === 'string' ? <Heading level={3}>{title}</Heading> : title}</div>
      )}
      {showTopToolbar && (
        <GridTableToolbar
          showSearch={Boolean(filtering)}
          quickFilter={quickFilter}
          onQuickFilterChange={updateQuickFilter}
          exportFormats={exportFormats}
          onExport={handleExport}
          showPagination={Boolean(pagination) && paginationPlacement === 'top'}
          {...toolbarPagingProps}
        />
      )}
      {bulkActions && selectedIds.length > 0 && (
        <div className={styles.bulkBar} role="region" aria-label="Bulk actions">
          <span className={styles.bulkCount}>{`${selectedIds.length} selected`}</span>
          <div className={styles.bulkActions}>
            {bulkActions({ selectedIds, selectedRows, clearSelection: () => setSelectedIds([]) })}
          </div>
          <Button variant="subtle" size="small" label="Clear selection" onClick={() => setSelectedIds([])} />
        </div>
      )}
      <div className={styles.body}>
        <div
          ref={scrollRef}
          className={joinClasses(
            styles.scroll,
            headerSticky && styles.sticky,
            summarySticky && styles.stickySummary
          )}
          style={maxHeight != null ? { maxHeight: toCssSize(maxHeight) } : undefined}
          onScroll={hasPins ? updateScrollState : undefined}
        >
          <table className={styles.table} ref={tableRef}>
            <colgroup>
              {hoverEnabled && <col className={styles.hoverCol} />}
              {expandableEnabled && <col className={styles.expandCol} />}
              {selectionEnabled && <col className={styles.selectCol} />}
              {displayColumns.map((column) => (
                <col
                  key={column.id}
                  className={joinClasses(styles.col, Boolean(column.flex) && styles.colFlex)}
                  style={getColVars(column)}
                />
              ))}
            </colgroup>
            <GridTableHeader
              columns={displayColumns}
              selectionEnabled={selectionEnabled}
              showSelectAll={selectionMode === 'multiple'}
              expandableEnabled={expandableEnabled}
              hoverAnchor={hoverEnabled}
              getPin={getPin}
              allSelected={allSelected}
              someSelected={someSelected}
              onToggleSelectAll={handleToggleSelectAll}
              sort={sort}
              onSort={(columnId) => updateSort(cycleSortState(sort, columnId))}
              filters={filters}
              onFilterChange={(columnId, value) => updateFilters({ ...filters, [columnId]: value })}
              openFilterId={openFilterId}
              onOpenFilter={setOpenFilterId}
            />
            <tbody>
              {!loading &&
                visibleRows.map((row, rowIndex) => {
                  const rowId = getRowId(row);
                  const selected = selectedIds.includes(rowId);
                  const expanded = isRowExpanded(row);
                  const canSelect =
                    selectionEnabled &&
                    (selection?.isRowSelectable ? selection.isRowSelectable(row) : true);

                  return (
                    <React.Fragment key={rowId}>
                      <tr
                        className={
                          joinClasses(
                            selected && styles.selected,
                            onRowClick && styles.clickable,
                            hoverEnabled && styles.hoverRow,
                            getRowClassName?.(row)
                          ) || undefined
                        }
                        onClick={onRowClick ? (event) => handleRowClick(row, event) : undefined}
                      >
                        {hoverEnabled && hoverActions && (
                          <td className={styles.hoverAnchor}>
                            <div className={joinClasses(styles.hoverActions, hoverClass)}>
                              <div className={styles.hoverChip} data-stop-row-click>
                                {hoverActions(row)}
                              </div>
                            </div>
                          </td>
                        )}
                        {expandableEnabled && (
                          <td className={joinClasses(styles.expandCol, expandPin.className)} style={expandPin.style}>
                            <button
                              type="button"
                              className={styles.iconBtn}
                              aria-expanded={expanded}
                              aria-label={expanded ? `Collapse row ${rowId}` : `Expand row ${rowId}`}
                              onClick={() => handleToggleExpand(row)}
                            >
                              <Icon name={expanded ? 'chevron-down' : 'chevron-right'} size={16} />
                            </button>
                          </td>
                        )}
                        {selectionEnabled && (
                          <td className={joinClasses(styles.selectCol, selectPin.className)} style={selectPin.style}>
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
                        {displayColumns.map((column) => {
                          const type = column.type ?? 'text';
                          const pin = getPin(column.id);
                          return (
                            <td
                              key={column.id}
                              className={joinClasses(
                                alignClass(defaultAlign(column)),
                                type === 'actions' && styles.actionsCol,
                                type === 'text' && styles.cellWrap,
                                pin.className
                              )}
                              style={pin.style}
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
                  {hoverEnabled && <td className={styles.hoverAnchor} />}
                  {expandableEnabled && (
                    <td className={joinClasses(styles.expandCol, expandPin.className)} style={expandPin.style} />
                  )}
                  {selectionEnabled && (
                    <td className={joinClasses(styles.selectCol, selectPin.className)} style={selectPin.style} />
                  )}
                  {displayColumns.map((column, index) => {
                    const pin = getPin(column.id);
                    const value = getCellValue(summaryRow as T, column);
                    const content =
                      index === 0 && summary.label
                        ? summary.label
                        : column.render
                          ? column.render({ value, row: summaryRow as T, rowIndex: -1, column })
                          : renderTypedCell(column.type ?? 'text', value, Boolean(column.hideZero), countryCode);
                    return (
                      <td
                        key={column.id}
                        className={joinClasses(alignClass(defaultAlign(column)), pin.className)}
                        style={pin.style}
                      >
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
        <div className={styles.paginationBottom}>
          <GridTableToolbar
            showSearch={false}
            quickFilter={quickFilter}
            onQuickFilterChange={updateQuickFilter}
            exportFormats={[]}
            onExport={handleExport}
            showPagination
            {...toolbarPagingProps}
          />
        </div>
      )}
    </div>
  );
}
