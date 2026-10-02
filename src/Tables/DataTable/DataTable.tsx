import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './DataTable.css';
import { Checkbox } from '../../FormElements/Checkbox';
import { Heading } from '../../Typography/Heading';
import { Icon } from '../../Icons/Icon';
import { Pagination } from '../../Navigation/Pagination';
import { downloadCsv, downloadXls, getExportRows } from './DataTable.export';
import { DataTableFilter } from './DataTableFilter';
import { DataTableMenu } from './DataTableMenu';
import type {
  DataTableColumn,
  DataTableFilters,
  DataTableHoverActionsPosition,
  DataTableProps,
  DataTableRowId,
} from './DataTable.types';
import {
  DEFAULT_COL_WIDTH,
  EXPAND_COL_WIDTH,
  SELECT_COL_WIDTH,
  cycleSortState,
  defaultGetRowId,
  filterRows,
  getCellValue,
  getFixedOffsets,
  getPaginationConfig,
  getSelectionConfig,
  getVisibleColumns,
  isSelectionEnabled,
  paginateRows,
  sortRows,
  toCssSize,
  toPx,
  useControllableState,
} from './DataTable.utils';

type CellRole = 'header' | 'body' | 'footer';

function getAlignClass(align?: DataTableColumn<unknown>['align']) {
  if (align === 'center') return 'bs-data-table--alignCenter';
  if (align === 'right') return 'bs-data-table--alignRight';
  return 'bs-data-table--alignLeft';
}

function renderCell<T>(row: T, column: DataTableColumn<T>) {
  const value = getCellValue(row, column);
  if (column.cell) return column.cell({ value, row, column });
  if (value == null) return '';
  return String(value);
}

export function DataTable<T>({
  columns,
  data,
  getRowId = defaultGetRowId,
  title,
  rowSelection,
  expandable,
  sort: sortProp,
  defaultSort = null,
  onSortChange,
  sortMode = 'client',
  filters: filtersProp,
  defaultFilters = {},
  onFiltersChange,
  filterMode = 'client',
  pagination,
  rowActions,
  hoverActions,
  hoverActionsPosition = 'right',
  bulkActions,
  totalRow,
  stickyTotalRow = false,
  showExportMenu,
  exportFileName = 'table',
  onExportCsv,
  onExportXls,
  scroll,
  loading = false,
  emptyMessage = 'No data',
  nested = false,
  className,
  style,
}: DataTableProps<T>) {
  const visibleColumns = useMemo(() => getVisibleColumns(columns), [columns]);
  const selectionEnabled = isSelectionEnabled(rowSelection);
  const selectionConfig = getSelectionConfig(rowSelection);
  const paginationConfig = getPaginationConfig(pagination);
  const pageSize = paginationConfig?.pageSize ?? paginationConfig?.defaultPageSize ?? 10;
  const exportMenuVisible = showExportMenu ?? !nested;

  const [sort, setSort] = useControllableState({
    value: sortProp,
    defaultValue: defaultSort,
    onChange: onSortChange,
  });
  const [filters, setFilters] = useControllableState<DataTableFilters>({
    value: filtersProp,
    defaultValue: defaultFilters,
    onChange: onFiltersChange,
  });
  const [selectedRowIds, setSelectedRowIds] = useControllableState<DataTableRowId[]>({
    value: selectionConfig.selectedRowIds,
    defaultValue: selectionConfig.defaultSelectedRowIds ?? [],
    onChange: (ids) => {
      const rows = data.filter((row, index) => ids.includes(getRowId(row, index)));
      selectionConfig.onChange?.(ids, rows);
    },
  });
  const [expandedRowIds, setExpandedRowIds] = useControllableState<DataTableRowId[]>({
    value: expandable?.expandedRowIds,
    defaultValue: expandable?.defaultExpandedRowIds ?? [],
    onChange: expandable?.onChange,
  });
  const [page, setPage] = useControllableState({
    value: paginationConfig?.current,
    defaultValue: paginationConfig?.defaultCurrent ?? 1,
    onChange: (nextPage) => paginationConfig?.onChange?.(nextPage, pageSize),
  });
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);
  const [ping, setPing] = useState({ left: false, right: false });
  const scrollRef = useRef<HTMLDivElement>(null);

  const leadingWidth =
    (expandable ? EXPAND_COL_WIDTH : 0) + (selectionEnabled ? SELECT_COL_WIDTH : 0);
  const fixedOffsets = useMemo(
    () => getFixedOffsets(visibleColumns, leadingWidth),
    [visibleColumns, leadingWidth]
  );

  const processedRows = useMemo(() => {
    let rows = data;
    if (filterMode === 'client') rows = filterRows(rows, visibleColumns, filters);
    if (sortMode === 'client') rows = sortRows(rows, visibleColumns, sort);
    return rows;
  }, [data, filterMode, filters, sort, sortMode, visibleColumns]);

  const totalItems = paginationConfig?.total ?? processedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pagedRows = paginationConfig
    ? paginationConfig.total != null
      ? processedRows
      : paginateRows(processedRows, page, pageSize)
    : processedRows;

  const pagedIds = pagedRows.map((row, index) => getRowId(row, index));
  const selectedOnPage = pagedIds.filter((id) => selectedRowIds.includes(id));
  const allPageSelected = pagedIds.length > 0 && selectedOnPage.length === pagedIds.length;
  const somePageSelected = selectedOnPage.length > 0 && !allPageSelected;
  const selectedRows = data.filter((row, index) =>
    selectedRowIds.includes(getRowId(row, index))
  );

  const tableMinWidth =
    leadingWidth +
    visibleColumns.reduce((sum, column) => sum + toPx(column.width ?? column.minWidth), 0) +
    (rowActions ? 88 : 0);

  const extraColumns =
    (hoverActions ? 1 : 0) +
    (expandable ? 1 : 0) +
    (selectionEnabled ? 1 : 0) +
    (rowActions ? 1 : 0);
  const colSpan = visibleColumns.length + extraColumns;

  const lastLeftId = [...visibleColumns].reverse().find((column) => column.fixed === 'left')?.id;
  const firstRightId = visibleColumns.find((column) => column.fixed === 'right')?.id;
  const leftEdgeIsSelect = !lastLeftId && selectionEnabled;
  const leftEdgeIsExpand = !lastLeftId && !selectionEnabled && Boolean(expandable);

  const totalCells = useMemo(() => {
    if (!totalRow) return null;
    if (typeof totalRow === 'function') {
      return totalRow({ rows: processedRows, columns: visibleColumns });
    }
    return totalRow;
  }, [totalRow, processedRows, visibleColumns]);

  const updateScrollPing = useCallback((element: HTMLDivElement) => {
    const maxScroll = element.scrollWidth - element.clientWidth;
    const left = element.scrollLeft > 0;
    const right = maxScroll > 1 && element.scrollLeft < maxScroll - 1;
    setPing((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
  }, []);

  const syncScrollWidth = useCallback((element: HTMLDivElement) => {
    element.style.setProperty('--bs-data-table-scroll-width', `${element.clientWidth}px`);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return undefined;
    const onResize = () => {
      syncScrollWidth(element);
      updateScrollPing(element);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [visibleColumns, data, scroll, syncScrollWidth, updateScrollPing]);

  const getStickyStyle = (
    column: DataTableColumn<T>,
    role: CellRole
  ): React.CSSProperties | undefined => {
    const isHeader = role === 'header';
    const isFooter = role === 'footer';
    const pinFooter = isFooter && stickyTotalRow;
    if (!column.fixed && !isHeader && !pinFooter) return undefined;
    const style: React.CSSProperties = {
      position: 'sticky',
    };
    if (isHeader) {
      style.top = 0;
      style.zIndex = column.fixed ? 6 : 5;
    }
    if (pinFooter) {
      style.bottom = 0;
      style.zIndex = column.fixed ? 5 : 4;
    }
    if (!isHeader && !pinFooter) style.zIndex = 2;
    if (column.fixed === 'left') style.left = fixedOffsets.left[column.id];
    if (column.fixed === 'right') style.right = fixedOffsets.right[column.id];
    return style;
  };

  const getUtilityStickyStyle = (
    side: 'left' | 'right',
    offset: number,
    role: CellRole
  ): React.CSSProperties => {
    const isHeader = role === 'header';
    const pinFooter = role === 'footer' && stickyTotalRow;
    return {
      position: 'sticky',
      zIndex: isHeader ? 6 : pinFooter ? 5 : 2,
      top: isHeader ? 0 : undefined,
      bottom: pinFooter ? 0 : undefined,
      [side]: offset,
    };
  };

  const getFixedEdgeClass = (column: DataTableColumn<T>) =>
    [
      column.fixed === 'left' && lastLeftId === column.id ? 'bs-data-table--fixedLeftLast' : '',
      column.fixed === 'right' && firstRightId === column.id
        ? 'bs-data-table--fixedRightFirst'
        : '',
    ]
      .filter(Boolean)
      .join(' ');

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowIds(Array.from(new Set([...selectedRowIds, ...pagedIds])));
    } else {
      setSelectedRowIds(selectedRowIds.filter((id) => !pagedIds.includes(id)));
    }
  };

  const handleToggleRow = (rowId: DataTableRowId, checked: boolean) => {
    setSelectedRowIds(
      checked ? [...selectedRowIds, rowId] : selectedRowIds.filter((id) => id !== rowId)
    );
  };

  const handleToggleExpand = (rowId: DataTableRowId) => {
    setExpandedRowIds(
      expandedRowIds.includes(rowId)
        ? expandedRowIds.filter((id) => id !== rowId)
        : [...expandedRowIds, rowId]
    );
  };

  const applyFilter = (columnId: string, value: string) => {
    const next = { ...filters };
    if (value.trim()) next[columnId] = value;
    else delete next[columnId];
    setFilters(next);
  };

  const handleDefaultExport = (format: 'csv' | 'xls') => {
    const { headers, values } = getExportRows(visibleColumns, processedRows);
    const baseName = exportFileName.replace(/\.(csv|xls|xlsx)$/i, '');
    if (format === 'csv') downloadCsv(headers, values, `${baseName}.csv`);
    else downloadXls(headers, values, `${baseName}.xls`);
  };

  const handleExportCsv = onExportCsv ?? (() => handleDefaultExport('csv'));
  const handleExportXls = onExportXls ?? (() => handleDefaultExport('xls'));

  const hoverPositionClass = `is-${hoverActionsPosition as DataTableHoverActionsPosition}`;
  const scrollStyle: React.CSSProperties = {
    maxHeight: toCssSize(scroll?.y),
    minWidth: 0,
  };

  const renderHoverAnchor = (role: CellRole, row?: T) => {
    if (!hoverActions) return null;
    const Cell = role === 'header' ? 'th' : 'td';
    return (
      <Cell className="bs-data-table--hoverAnchor">
        {role === 'body' && row ? (
          <div className={`bs-data-table--hoverActions ${hoverPositionClass}`}>
            <div className="bs-data-table--hoverActionsChip">{hoverActions(row)}</div>
          </div>
        ) : null}
      </Cell>
    );
  };

  const renderLeadingCells = (role: CellRole, _row?: T, rowId?: DataTableRowId) => (
    <>
      {expandable && (
        role === 'header' ? (
          <th
            className={[
              'bs-data-table--expandCol',
              leftEdgeIsExpand ? 'bs-data-table--fixedLeftLast' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={getUtilityStickyStyle('left', 0, role)}
          />
        ) : (
          <td
            className={[
              'bs-data-table--expandCol',
              leftEdgeIsExpand ? 'bs-data-table--fixedLeftLast' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={getUtilityStickyStyle('left', 0, role)}
          >
            {role === 'body' && rowId != null ? (
              <button
                type="button"
                className="bs-data-table--expandButton"
                aria-expanded={expandedRowIds.includes(rowId)}
                aria-label={expandedRowIds.includes(rowId) ? 'Collapse row' : 'Expand row'}
                onClick={() => handleToggleExpand(rowId)}
              >
                <Icon
                  name={expandedRowIds.includes(rowId) ? 'chevron-down' : 'chevron-right'}
                  size={16}
                />
              </button>
            ) : null}
          </td>
        )
      )}
      {selectionEnabled &&
        (role === 'header' ? (
          <th
            className={[
              'bs-data-table--selectCol',
              leftEdgeIsSelect ? 'bs-data-table--fixedLeftLast' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={getUtilityStickyStyle('left', expandable ? EXPAND_COL_WIDTH : 0, role)}
          >
            <Checkbox
              hideLabel
              label="Select all rows"
              checked={allPageSelected}
              indeterminate={somePageSelected}
              onChange={handleToggleAll}
            />
          </th>
        ) : (
          <td
            className={[
              'bs-data-table--selectCol',
              leftEdgeIsSelect ? 'bs-data-table--fixedLeftLast' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={getUtilityStickyStyle('left', expandable ? EXPAND_COL_WIDTH : 0, role)}
          >
            {role === 'body' && rowId != null ? (
              <Checkbox
                hideLabel
                label={`Select row ${rowId}`}
                checked={selectedRowIds.includes(rowId)}
                onChange={(checked) => handleToggleRow(rowId, checked)}
              />
            ) : null}
          </td>
        ))}
    </>
  );

  return (
    <div
      className={[
        'bs-data-table',
        nested ? 'bs-data-table--nested' : '',
        ping.left ? 'bs-data-table--pingLeft' : '',
        ping.right ? 'bs-data-table--pingRight' : '',
        hoverActions ? 'bs-data-table--hasHoverActions' : '',
        exportMenuVisible ? 'bs-data-table--hasExportMenu' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {title ? (
        <div className="bs-data-table--heading">
          {typeof title === 'string' ? <Heading level={3}>{title}</Heading> : title}
        </div>
      ) : null}

      <div
        ref={scrollRef}
        className="bs-data-table--scroll"
        style={scrollStyle}
        onScroll={(event) => updateScrollPing(event.currentTarget)}
      >
        {exportMenuVisible ? (
          <div className="bs-data-table--headerMenu">
            <DataTableMenu onExportCsv={handleExportCsv} onExportXls={handleExportXls} />
          </div>
        ) : null}
        <table
          className="bs-data-table--table"
          style={{ minWidth: toCssSize(scroll?.x) || tableMinWidth }}
        >
          <colgroup>
            {hoverActions && <col style={{ width: 0 }} />}
            {expandable && <col style={{ width: EXPAND_COL_WIDTH }} />}
            {selectionEnabled && <col style={{ width: SELECT_COL_WIDTH }} />}
            {visibleColumns.map((column) => (
              <col
                key={column.id}
                style={{
                  width: toCssSize(column.width),
                  minWidth: toCssSize(column.minWidth ?? column.width ?? DEFAULT_COL_WIDTH),
                }}
              />
            ))}
            {rowActions && <col style={{ width: 88 }} />}
          </colgroup>
          <thead>
            <tr>
              {renderHoverAnchor('header')}
              {renderLeadingCells('header')}
              {visibleColumns.map((column) => {
                const isSorted = sort?.columnId === column.id;
                const ariaSort = isSorted
                  ? sort?.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : undefined;
                const filterValue = filters[column.id] ?? '';
                return (
                  <th
                    key={column.id}
                    className={[getAlignClass(column.align), getFixedEdgeClass(column)]
                      .filter(Boolean)
                      .join(' ')}
                    style={getStickyStyle(column, 'header')}
                    aria-sort={ariaSort}
                  >
                    <div className="bs-data-table--headerInner">
                      {column.sortable ? (
                        <button
                          type="button"
                          className={[
                            'bs-data-table--sortButton',
                            isSorted ? 'bs-data-table--sortActive' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          aria-label={`Sort by ${typeof column.title === 'string' ? column.title : column.id}`}
                          onClick={() => setSort(cycleSortState(sort, column.id))}
                        >
                          <span>{column.title}</span>
                          <span
                            className={
                              isSorted
                                ? 'bs-data-table--sortIconActive'
                                : 'bs-data-table--sortIcon'
                            }
                          >
                            <Icon
                              name={isSorted && sort?.direction === 'asc' ? 'chevron-up' : 'chevron-down'}
                              size={16}
                            />
                          </span>
                        </button>
                      ) : (
                        <span>{column.title}</span>
                      )}
                      {column.filterable && (
                        <DataTableFilter
                          columnId={column.id}
                          title={typeof column.title === 'string' ? column.title : column.id}
                          placeholder={column.filterPlaceholder}
                          value={filterValue}
                          open={openFilterId === column.id}
                          active={Boolean(filterValue)}
                          onOpenChange={(open) => setOpenFilterId(open ? column.id : null)}
                          onApply={(value) => applyFilter(column.id, value)}
                          onClear={() => applyFilter(column.id, '')}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
              {rowActions && (
                <th
                  className="bs-data-table--actionsCol"
                  style={
                    visibleColumns.some((column) => column.fixed === 'right')
                      ? undefined
                      : getUtilityStickyStyle('right', 0, 'header')
                  }
                />
              )}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="bs-data-table--statusRow">
                <td colSpan={colSpan}>Loading</td>
              </tr>
            )}
            {!loading && pagedRows.length === 0 && (
              <tr className="bs-data-table--statusRow">
                <td colSpan={colSpan}>{emptyMessage}</td>
              </tr>
            )}
            {!loading &&
              pagedRows.map((row, index) => {
                const rowId = getRowId(row, index);
                const expanded = expandedRowIds.includes(rowId);
                const selected = selectedRowIds.includes(rowId);
                return (
                  <React.Fragment key={rowId}>
                    <tr
                      className={[
                        selected ? 'bs-data-table--selectedRow' : '',
                        hoverActions ? 'bs-data-table--hoverRow' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {renderHoverAnchor('body', row)}
                      {renderLeadingCells('body', row, rowId)}
                      {visibleColumns.map((column) => (
                        <td
                          key={column.id}
                          className={[getAlignClass(column.align), getFixedEdgeClass(column)]
                            .filter(Boolean)
                            .join(' ')}
                          style={getStickyStyle(column, 'body')}
                        >
                          {renderCell(row, column)}
                        </td>
                      ))}
                      {rowActions && (
                        <td className="bs-data-table--actionsCol">{rowActions(row)}</td>
                      )}
                    </tr>
                    {expanded && expandable && (
                      <tr className="bs-data-table--expandedRow">
                        <td colSpan={colSpan}>
                          <div className="bs-data-table--nestedWrap">
                            {expandable.renderExpandedRow(row)}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
          </tbody>
          {totalCells && (
            <tfoot>
              <tr
                className={[
                  'bs-data-table--totalRow',
                  stickyTotalRow ? 'is-sticky' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {renderHoverAnchor('footer')}
                {renderLeadingCells('footer')}
                {visibleColumns.map((column) => (
                  <td
                    key={column.id}
                    className={[getAlignClass(column.align), getFixedEdgeClass(column)]
                      .filter(Boolean)
                      .join(' ')}
                    style={getStickyStyle(column, 'footer')}
                  >
                    {totalCells[column.id] ?? ''}
                  </td>
                ))}
                {rowActions && (
                  <td
                    className="bs-data-table--actionsCol"
                    style={
                      stickyTotalRow
                        ? { position: 'sticky', bottom: 0, zIndex: 3 }
                        : undefined
                    }
                  />
                )}
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {(bulkActions && selectedRowIds.length > 0) || paginationConfig ? (
        <div className="bs-data-table--footer">
          {bulkActions && selectedRowIds.length > 0 ? (
            <div className="bs-data-table--bulkBar">
              {bulkActions({
                selectedRows,
                selectedRowIds,
                clearSelection: () => setSelectedRowIds([]),
              })}
            </div>
          ) : (
            <span />
          )}
          {paginationConfig && (
            <div className="bs-data-table--pagination">
              <Pagination totalPages={totalPages} currentPage={page} onChange={setPage} />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
