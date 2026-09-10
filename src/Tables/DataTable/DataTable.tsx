import React, { useEffect, useMemo, useRef } from 'react';
import './DataTable.css';

import { Checkbox } from '../../FormElements/Checkbox';
import { Icon } from '../../Icons/Icon';
import { Pagination } from '../../Navigation/Pagination';
import { Heading } from '../../Typography/Heading';
import { BodyText } from '../../Typography/BodyText';
import { DataTableHeader } from './DataTableHeader';
import type {
  DataTableActionsConfig,
  DataTableBulkActionsContext,
  DataTableColumn,
  DataTableFooterContext,
  DataTableProps,
  DataTableRowId,
} from './DataTable.types';
import {
  compareRows,
  cycleSortState,
  defaultGetRowId,
  filterRows,
  getAddItemConfig,
  getCellValue,
  getPaginationConfig,
  getSelectionConfig,
  isPaginationEnabled,
  isSelectionEnabled,
  renderDefaultCell,
  toCssSize,
  useControllableState,
} from './DataTable.utils';

const styles: Record<string, string> = {
  root: 'bs-data-table',
  heading: 'bs-data-table--heading',
  headingMain: 'bs-data-table--headingMain',
  headerActions: 'bs-data-table--headerActions',
  topContent: 'bs-data-table--topContent',
  toolbar: 'bs-data-table--toolbar',
  scroll: 'bs-data-table--scroll',
  table: 'bs-data-table--table',
  separated: 'bs-data-table--separated',
  stickyHeader: 'bs-data-table--stickyHeader',
  stickyFooter: 'bs-data-table--stickyFooter',
  hideHeader: 'bs-data-table--hideHeader',
  selectedRow: 'bs-data-table--selectedRow',
  clickableRow: 'bs-data-table--clickableRow',
  actionsOnHover: 'bs-data-table--actionsOnHover',
  hasBulk: 'bs-data-table--hasBulk',
  hasPagination: 'bs-data-table--hasPagination',
  addItemRow: 'bs-data-table--addItemRow',
  alignLeft: 'bs-data-table--alignLeft',
  alignCenter: 'bs-data-table--alignCenter',
  alignRight: 'bs-data-table--alignRight',
  selectCol: 'bs-data-table--selectCol',
  expandCol: 'bs-data-table--expandCol',
  actionsCol: 'bs-data-table--actionsCol',
  iconBtn: 'bs-data-table--iconBtn',
  expandedRow: 'bs-data-table--expandedRow',
  expandedCell: 'bs-data-table--expandedCell',
  footerRow: 'bs-data-table--footerRow',
  statusRow: 'bs-data-table--statusRow',
  addItem: 'bs-data-table--addItem',
  bulkWrap: 'bs-data-table--bulkWrap',
  bulkActions: 'bs-data-table--bulkActions',
  bulkCount: 'bs-data-table--bulkCount',
  pagination: 'bs-data-table--pagination',
  range: 'bs-data-table--range',
};

function alignClass(align?: 'left' | 'center' | 'right'): string {
  if (align === 'center') return styles.alignCenter;
  if (align === 'right') return styles.alignRight;
  return styles.alignLeft;
}

function getActionsConfig<T>(
  actions: DataTableProps<T>['actions']
): DataTableActionsConfig<T> | null {
  if (!actions) return null;
  if (typeof actions === 'function') return { render: actions };
  return actions;
}

function renderBulkActions<T>(
  bulkActions: DataTableProps<T>['bulkActions'],
  ctx: DataTableBulkActionsContext<T>
): React.ReactNode {
  if (!bulkActions) return null;
  if (typeof bulkActions === 'function') return bulkActions(ctx);
  return bulkActions.render(ctx);
}

function getColumnCount<T>(
  columns: DataTableColumn<T>[],
  selectionEnabled: boolean,
  expandableEnabled: boolean,
  hasActions: boolean
): number {
  return columns.length + (selectionEnabled ? 1 : 0) + (expandableEnabled ? 1 : 0) + (hasActions ? 1 : 0);
}

function getActionsOnHover<T>(actions: DataTableProps<T>['actions']): boolean {
  return Boolean(actions && typeof actions !== 'function' && actions.showOnHover);
}

function getBulkShowCount<T>(bulkActions: DataTableProps<T>['bulkActions']): boolean {
  if (!bulkActions || typeof bulkActions === 'function') return true;
  return bulkActions.showCount !== false;
}

function renderNode(value: React.ReactNode, stringRenderer: (text: string) => React.ReactNode) {
  if (typeof value === 'string' || typeof value === 'number') {
    return stringRenderer(String(value));
  }
  return value;
}

/**
 * Generic, opt-in data table. Configure columns independently for sort, filter,
 * alignment and custom cells. Selection, expansion, actions, pagination, add-item,
 * footer and top content are all optional.
 */
export function DataTable<T>({
  columns,
  data,
  getRowId = defaultGetRowId,
  title,
  description,
  topContent,
  toolbar,
  headerActions,
  selection,
  expandable,
  actions,
  bulkActions,
  addItem,
  pagination,
  sorting,
  filtering,
  footer,
  loading = false,
  loadingContent,
  emptyContent,
  emptyMessage = 'No data',
  variant = 'default',
  hideHeader = false,
  stickyHeader = false,
  stickyFooter = false,
  maxHeight,
  getRowClassName,
  onRowClick,
  className,
  ...props
}: DataTableProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const selectionEnabled = isSelectionEnabled(selection);
  const selectionConfig = getSelectionConfig(selection);
  const showCheckboxes = selectionEnabled && selectionConfig.showCheckboxes !== false;
  const expandableEnabled = Boolean(expandable && expandable.enabled !== false);
  const actionsConfig = getActionsConfig(actions);
  const hasActions = Boolean(actionsConfig);
  const addItemConfig = getAddItemConfig(addItem);
  const paginationEnabled = isPaginationEnabled(pagination);
  const paginationConfig = getPaginationConfig(pagination);
  const colSpan = getColumnCount(columns, showCheckboxes, expandableEnabled, hasActions);

  const [sort, setSort] = useControllableState({
    value: sorting?.sort,
    defaultValue: sorting?.defaultSort ?? null,
    onChange: sorting?.onSortChange,
  });
  const [filters, setFilters] = useControllableState({
    value: filtering?.filters,
    defaultValue: filtering?.defaultFilters ?? {},
    onChange: filtering?.onFiltersChange,
  });
  const [selectedRowIds, setSelectedRowIds] = useControllableState<DataTableRowId[]>({
    value: selectionConfig.selectedRowIds,
    defaultValue: selectionConfig.defaultSelectedRowIds ?? [],
    onChange: (ids) => {
      const selectedRows = data.filter((row, index) => ids.includes(getRowId(row, index)));
      selectionConfig.onChange?.(ids, selectedRows);
    },
  });
  const [expandedRowIds, setExpandedRowIds] = useControllableState<DataTableRowId[]>({
    value: expandable?.expandedRowIds,
    defaultValue: expandable?.defaultExpandedRowIds ?? [],
    onChange: expandable?.onChange,
  });
  const [page, setPage] = useControllableState({
    value: paginationConfig.page,
    defaultValue: paginationConfig.defaultPage ?? 1,
    onChange: paginationConfig.onPageChange,
  });
  const [pageSize] = useControllableState({
    value: paginationConfig.pageSize,
    defaultValue: paginationConfig.defaultPageSize ?? 10,
    onChange: paginationConfig.onPageSizeChange,
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

  const processedEntries = useMemo(() => {
    let entries = data.map((row, index) => ({ row, index }));
    if (!filtering?.manual) {
      const passing = new Set(filterRows(data, columns, filters));
      entries = entries.filter(({ row }) => passing.has(row));
    }
    if (!sorting?.manual && sort) {
      entries = entries.slice().sort((a, b) => compareRows(a.row, b.row, columns, sort));
    }
    return entries;
  }, [columns, data, filters, filtering?.manual, sort, sorting?.manual]);

  const manualPagination =
    paginationConfig.manual ||
    paginationConfig.totalItems != null ||
    paginationConfig.totalPages != null;
  const totalItems = paginationConfig.totalItems ?? processedEntries.length;
  const totalPages =
    paginationConfig.totalPages ?? Math.max(1, Math.ceil(totalItems / Math.max(pageSize, 1)));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const visibleEntries = useMemo(() => {
    if (!paginationEnabled || manualPagination) return processedEntries;
    const start = (currentPage - 1) * pageSize;
    return processedEntries.slice(start, start + pageSize);
  }, [currentPage, manualPagination, pageSize, paginationEnabled, processedEntries]);

  const visibleIds = visibleEntries.map(({ row, index }) => getRowId(row, index));
  const selectedVisibleCount = visibleIds.filter((id) => selectedRowIds.includes(id)).length;
  const allSelected = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
  const someSelected = selectedVisibleCount > 0 && !allSelected;
  const selectedRows = data.filter((row, index) => selectedRowIds.includes(getRowId(row, index)));
  const showBulkActions = selectionEnabled && selectedRowIds.length > 0 && Boolean(bulkActions);

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      const next = Array.from(new Set([...selectedRowIds, ...visibleIds]));
      setSelectedRowIds(next);
      return;
    }
    setSelectedRowIds(selectedRowIds.filter((id) => !visibleIds.includes(id)));
  };

  const handleToggleRow = (rowId: DataTableRowId, checked: boolean) => {
    setSelectedRowIds(
      checked
        ? Array.from(new Set([...selectedRowIds, rowId]))
        : selectedRowIds.filter((id) => id !== rowId)
    );
  };

  const handleToggleExpand = (rowId: DataTableRowId) => {
    setExpandedRowIds(
      expandedRowIds.includes(rowId)
        ? expandedRowIds.filter((id) => id !== rowId)
        : [...expandedRowIds, rowId]
    );
  };

  const handleFilterChange = (columnId: string, value: unknown) => {
    setFilters({ ...filters, [columnId]: value });
  };

  const footerCtx: DataTableFooterContext<T> = {
    rows: processedEntries.map(({ row }) => row),
    columns,
  };
  const footerCells =
    footer && !footer.render
      ? typeof footer.cells === 'function'
        ? footer.cells(footerCtx)
        : footer.cells
      : undefined;

  const empty = !loading && visibleEntries.length === 0;
  const actionsOnHover = getActionsOnHover(actions);
  const addItemPlacement = addItemConfig?.placement ?? 'start';
  const showAddItemStart = Boolean(addItemConfig) && addItemPlacement === 'start' && !loading;
  const showAddItemEnd = Boolean(addItemConfig) && addItemPlacement === 'end' && !loading;

  const renderAddItem = () => {
    if (!addItemConfig) return null;
    if (addItemConfig.render) return addItemConfig.render();
    return (
      <button type="button" className={styles.addItem} onClick={addItemConfig.onClick}>
        <Icon name="plus" size={16} />
        <span>{addItemConfig.label}</span>
      </button>
    );
  };

  const bulkCtx: DataTableBulkActionsContext<T> = {
    selectedRows,
    selectedRowIds,
    clearSelection: () => setSelectedRowIds([]),
    totalCount: paginationConfig.totalItems ?? processedEntries.length,
  };

  return (
    <div
      ref={rootRef}
      className={[
        styles.root,
        variant === 'separated' ? styles.separated : '',
        actionsOnHover ? styles.actionsOnHover : '',
        showBulkActions ? styles.hasBulk : '',
        paginationEnabled ? styles.hasPagination : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {(title != null || description != null || headerActions != null) && (
        <div className={styles.heading}>
          <div className={styles.headingMain}>
            {title != null &&
              renderNode(title, (text) => <Heading level={3}>{text}</Heading>)}
            {description != null &&
              renderNode(description, (text) => (
                <BodyText variant="light">{text}</BodyText>
              ))}
          </div>
          {headerActions != null && <div className={styles.headerActions}>{headerActions}</div>}
        </div>
      )}
      {topContent != null && <div className={styles.topContent}>{topContent}</div>}
      {toolbar != null && <div className={styles.toolbar}>{toolbar}</div>}
      <div
        className={[
          styles.scroll,
          hideHeader ? styles.hideHeader : '',
          stickyHeader ? styles.stickyHeader : '',
          stickyFooter ? styles.stickyFooter : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={maxHeight != null ? { maxHeight: toCssSize(maxHeight) } : undefined}
      >
        <table className={styles.table}>
          {!hideHeader && (
            <DataTableHeader
              columns={columns}
              selectionEnabled={showCheckboxes}
              expandableEnabled={expandableEnabled}
              hasActions={hasActions}
              actionsHeader={actionsConfig?.header}
              allSelected={allSelected}
              someSelected={someSelected}
              onToggleSelectAll={handleToggleSelectAll}
              sort={sort}
              onSort={(columnId) => setSort(cycleSortState(sort, columnId))}
              filters={filters}
              onFilterChange={handleFilterChange}
              openFilterId={openFilterId}
              onOpenFilter={setOpenFilterId}
            />
          )}
          <tbody>
            {loading && (
              <tr className={styles.statusRow}>
                <td colSpan={colSpan}>{loadingContent ?? 'Loading...'}</td>
              </tr>
            )}
            {showAddItemStart && (
              <tr className={styles.addItemRow}>
                <td colSpan={colSpan}>{renderAddItem()}</td>
              </tr>
            )}
            {!loading &&
              visibleEntries.map(({ row, index: rowIndex }) => {
                const rowId = getRowId(row, rowIndex);
                const selected = selectedRowIds.includes(rowId);
                const expanded = expandedRowIds.includes(rowId);
                const canExpand =
                  expandableEnabled &&
                  (expandable?.getRowCanExpand ? expandable.getRowCanExpand(row) : true);

                return (
                  <React.Fragment key={rowId}>
                    <tr
                      className={[
                        selected ? styles.selectedRow : '',
                        actionsOnHover ? styles.actionsOnHover : '',
                        onRowClick ? styles.clickableRow : '',
                        getRowClassName?.(row, rowIndex),
                      ]
                        .filter(Boolean)
                        .join(' ') || undefined}
                      onClick={
                        onRowClick
                          ? (event) => {
                              const target = event.target as HTMLElement;
                              if (target.closest('button, a, input, label, [data-bs-filter]')) return;
                              onRowClick(row, rowIndex);
                            }
                          : undefined
                      }
                    >
                      {expandableEnabled && (
                        <td className={styles.expandCol}>
                          {canExpand ? (
                            <button
                              type="button"
                              className={styles.iconBtn}
                              aria-expanded={expanded}
                              aria-label={expanded ? `Collapse row ${rowId}` : `Expand row ${rowId}`}
                              onClick={() => handleToggleExpand(rowId)}
                            >
                              <Icon name={expanded ? 'chevron-down' : 'chevron-right'} size={16} />
                            </button>
                          ) : null}
                        </td>
                      )}
                      {showCheckboxes && (
                        <td className={styles.selectCol}>
                          <Checkbox
                            label={`Select row ${rowId}`}
                            hideLabel
                            checked={selected}
                            onChange={(checked) => handleToggleRow(rowId, checked)}
                          />
                        </td>
                      )}
                      {columns.map((column) => {
                        const value = getCellValue(row, column);
                        const content = column.cell
                          ? column.cell({ value, row, rowIndex, column })
                          : renderDefaultCell(value);
                        return (
                          <td
                            key={column.id}
                            className={[alignClass(column.align), column.cellClassName]
                              .filter(Boolean)
                              .join(' ')}
                            style={{
                              width: toCssSize(column.width),
                              minWidth: toCssSize(column.minWidth),
                              maxWidth: toCssSize(column.maxWidth),
                            }}
                          >
                            {content}
                          </td>
                        );
                      })}
                      {hasActions && actionsConfig && (
                        <td className={styles.actionsCol}>{actionsConfig.render(row, rowIndex)}</td>
                      )}
                    </tr>
                    {canExpand && expanded && expandable && (
                      <tr className={styles.expandedRow}>
                        <td className={styles.expandedCell} colSpan={colSpan}>
                          {expandable.renderExpandedRow(row, rowIndex)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            {empty && (
              <tr className={styles.statusRow}>
                <td colSpan={colSpan}>{emptyContent ?? emptyMessage}</td>
              </tr>
            )}
          </tbody>
          {footer && !loading && (
            <tfoot>
              <tr className={styles.footerRow}>
                {footer.render ? (
                  <td colSpan={colSpan}>{footer.render(footerCtx)}</td>
                ) : (
                  <>
                    {expandableEnabled && <td className={styles.expandCol} />}
                    {showCheckboxes && <td className={styles.selectCol} />}
                    {columns.map((column) => (
                      <td key={column.id} className={alignClass(column.align)}>
                        {footerCells?.[column.id]}
                      </td>
                    ))}
                    {hasActions && <td className={styles.actionsCol} />}
                  </>
                )}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      {showAddItemEnd && renderAddItem()}
      {showBulkActions && (
        <div className={styles.bulkWrap}>
          <div className={styles.bulkActions} role="region" aria-label="Bulk actions">
            {getBulkShowCount(bulkActions) && (
              <span className={styles.bulkCount}>
                {selectedRows.length} of {bulkCtx.totalCount} selected
              </span>
            )}
            {renderBulkActions(bulkActions, bulkCtx)}
          </div>
        </div>
      )}
      {paginationEnabled && (
        <div
          className={styles.pagination}
          data-has-range={paginationConfig.showRange ? 'true' : undefined}
        >
          {paginationConfig.showRange && (
            <span className={styles.range}>
              {totalItems === 0
                ? 'Showing 0 of 0'
                : `Showing ${Math.min((currentPage - 1) * pageSize + 1, totalItems)}-${Math.min(
                    currentPage * pageSize,
                    totalItems
                  )} of ${totalItems}`}
            </span>
          )}
          <Pagination totalPages={totalPages} currentPage={currentPage} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
