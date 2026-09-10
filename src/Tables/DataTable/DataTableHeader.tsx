import React from 'react';
import { Checkbox } from '../../FormElements/Checkbox';
import { Icon } from '../../Icons/Icon';
import { DataTableColumnFilterControl, getColumnHeaderLabel, hasActiveFilterValue } from './DataTableFilter';
import type { DataTableColumn, DataTableSortState } from './DataTable.types';
import { toCssSize } from './DataTable.utils';

const styles: Record<string, string> = {
  alignLeft: 'bs-data-table--alignLeft',
  alignCenter: 'bs-data-table--alignCenter',
  alignRight: 'bs-data-table--alignRight',
  selectCol: 'bs-data-table--selectCol',
  expandCol: 'bs-data-table--expandCol',
  actionsCol: 'bs-data-table--actionsCol',
  headerInner: 'bs-data-table--headerInner',
  sortButton: 'bs-data-table--sortButton',
  sortIcon: 'bs-data-table--sortIcon',
  sortIconActive: 'bs-data-table--sortIconActive',
  sortActive: 'bs-data-table--sortActive',
  iconBtn: 'bs-data-table--iconBtn',
  iconBtnActive: 'bs-data-table--iconBtnActive',
  filterPopover: 'bs-data-table--filterPopover',
  headerCell: 'bs-data-table--headerCell',
};

function alignClass(align?: 'left' | 'center' | 'right'): string {
  if (align === 'center') return styles.alignCenter;
  if (align === 'right') return styles.alignRight;
  return styles.alignLeft;
}

export interface DataTableHeaderProps<T> {
  columns: DataTableColumn<T>[];
  selectionEnabled: boolean;
  expandableEnabled: boolean;
  hasActions: boolean;
  actionsHeader?: React.ReactNode;
  allSelected: boolean;
  someSelected: boolean;
  onToggleSelectAll: (checked: boolean) => void;
  sort: DataTableSortState;
  onSort: (columnId: string) => void;
  filters: Record<string, unknown>;
  onFilterChange: (columnId: string, value: unknown) => void;
  openFilterId: string | null;
  onOpenFilter: (columnId: string | null) => void;
}

export function DataTableHeader<T>({
  columns,
  selectionEnabled,
  expandableEnabled,
  hasActions,
  actionsHeader,
  allSelected,
  someSelected,
  onToggleSelectAll,
  sort,
  onSort,
  filters,
  onFilterChange,
  openFilterId,
  onOpenFilter,
}: DataTableHeaderProps<T>) {
  return (
    <thead>
      <tr>
        {expandableEnabled && <th className={styles.expandCol} scope="col" aria-label="Expand" />}
        {selectionEnabled && (
          <th className={styles.selectCol} scope="col">
            <Checkbox
              label="Select all rows"
              hideLabel
              checked={allSelected}
              indeterminate={someSelected && !allSelected}
              onChange={onToggleSelectAll}
            />
          </th>
        )}
        {columns.map((column) => {
          const isSorted = sort?.id === column.id;
          const ariaSort = !column.sortable
            ? undefined
            : isSorted
              ? sort.direction === 'asc'
                ? 'ascending'
                : 'descending'
              : 'none';
          const headerLabel = getColumnHeaderLabel(column);
          const filterOpen = openFilterId === column.id;
          const filterActive = hasActiveFilterValue(filters[column.id]);
          const width = toCssSize(column.width);
          const minWidth = toCssSize(column.minWidth);
          const maxWidth = toCssSize(column.maxWidth);

          return (
            <th
              key={column.id}
              className={[
                styles.headerCell,
                alignClass(column.align),
                isSorted ? styles.sortActive : '',
                column.headerClassName,
              ]
                .filter(Boolean)
                .join(' ')}
              scope="col"
              aria-sort={ariaSort}
              style={{ width, minWidth, maxWidth }}
            >
              <div className={styles.headerInner}>
                {column.sortable ? (
                  <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => onSort(column.id)}
                    aria-label={`Sort by ${headerLabel}`}
                  >
                    <span>{column.header}</span>
                    <span
                      className={[styles.sortIcon, isSorted ? styles.sortIconActive : '']
                        .filter(Boolean)
                        .join(' ')}
                      aria-hidden="true"
                    >
                      <Icon
                        name={isSorted && sort.direction === 'asc' ? 'chevron-up' : 'chevron-down'}
                        size={14}
                      />
                    </span>
                  </button>
                ) : (
                  <span>{column.header}</span>
                )}
                {column.filterable && (
                  <button
                    type="button"
                    data-bs-filter="button"
                    className={[styles.iconBtn, filterActive || filterOpen ? styles.iconBtnActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    aria-label={`Filter ${headerLabel}`}
                    aria-expanded={filterOpen}
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpenFilter(filterOpen ? null : column.id);
                    }}
                  >
                    <Icon name="filter" size={16} />
                  </button>
                )}
              </div>
              {column.filterable && filterOpen && (
                <div
                  className={styles.filterPopover}
                  data-bs-filter="popover"
                  role="dialog"
                  aria-label={`Filter ${headerLabel}`}
                >
                  <DataTableColumnFilterControl
                    column={column}
                    value={filters[column.id]}
                    onChange={(next) => onFilterChange(column.id, next)}
                  />
                </div>
              )}
            </th>
          );
        })}
        {hasActions && (
          <th className={styles.actionsCol} scope="col">
            {actionsHeader}
          </th>
        )}
      </tr>
    </thead>
  );
}
