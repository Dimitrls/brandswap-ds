import React from 'react';
import { Checkbox } from '../../FormElements/Checkbox';
import { InputField } from '../../FormElements/InputField';
import { Select } from '../../FormElements/Select';
import { Icon } from '../../Icons/Icon';
import { Tooltip } from '../../InfoElements/Tooltip';
import type {
  Column,
  GridTableFilterOperator,
  GridTableFilterValue,
  GridTableSortState,
} from './GridTable.types';
import {
  defaultAlign,
  defaultFilterOperators,
  filterOperatorLabel,
  getColumnHeaderLabel,
  isColumnFilterable,
  isColumnSortable,
  isEmptyFilterValue,
} from './GridTable.utils';

const styles: Record<string, string> = {
  alignLeft: 'bs-grid-table--alignLeft',
  alignCenter: 'bs-grid-table--alignCenter',
  alignRight: 'bs-grid-table--alignRight',
  selectCol: 'bs-grid-table--selectCol',
  expandCol: 'bs-grid-table--expandCol',
  headerInner: 'bs-grid-table--headerInner',
  headerLabel: 'bs-grid-table--headerLabel',
  sortButton: 'bs-grid-table--sortButton',
  sortIcon: 'bs-grid-table--sortIcon',
  sortIconActive: 'bs-grid-table--sortIconActive',
  sortActive: 'bs-grid-table--sortActive',
  iconBtn: 'bs-grid-table--iconBtn',
  iconBtnActive: 'bs-grid-table--iconBtnActive',
  filterPopover: 'bs-grid-table--filterPopover',
};

function alignClass(align: 'left' | 'center' | 'right'): string {
  if (align === 'center') return styles.alignCenter;
  if (align === 'right') return styles.alignRight;
  return styles.alignLeft;
}

export interface GridTableHeaderProps<T> {
  columns: Column<T>[];
  selectionEnabled: boolean;
  showSelectAll: boolean;
  expandableEnabled: boolean;
  allSelected: boolean;
  someSelected: boolean;
  onToggleSelectAll: (checked: boolean) => void;
  sort: GridTableSortState;
  onSort: (columnId: string) => void;
  filters: Record<string, GridTableFilterValue | undefined>;
  onFilterChange: (columnId: string, value: GridTableFilterValue | undefined) => void;
  openFilterId: string | null;
  onOpenFilter: (columnId: string | null) => void;
}

export function GridTableHeader<T>({
  columns,
  selectionEnabled,
  showSelectAll,
  expandableEnabled,
  allSelected,
  someSelected,
  onToggleSelectAll,
  sort,
  onSort,
  filters,
  onFilterChange,
  openFilterId,
  onOpenFilter,
}: GridTableHeaderProps<T>) {
  return (
    <thead>
      <tr>
        {expandableEnabled && <th className={styles.expandCol} scope="col" aria-label="Expand" />}
        {selectionEnabled && (
          <th className={styles.selectCol} scope="col">
            {showSelectAll ? (
              <Checkbox
                label="Select all rows"
                hideLabel
                checked={allSelected}
                indeterminate={someSelected && !allSelected}
                onChange={onToggleSelectAll}
              />
            ) : null}
          </th>
        )}
        {columns.map((column) => {
          const sortable = isColumnSortable(column);
          const filterable = isColumnFilterable(column);
          const isSorted = sort?.field === column.id;
          const ariaSort = !sortable
            ? undefined
            : isSorted
              ? sort.direction === 'asc'
                ? 'ascending'
                : 'descending'
              : 'none';
          const headerLabel = getColumnHeaderLabel(column);
          const filterOpen = openFilterId === column.id;
          const currentFilter = filters[column.id];
          const filterActive = !isEmptyFilterValue(currentFilter);
          const operators = defaultFilterOperators(column);
          const align = defaultAlign(column);
          const operator: GridTableFilterOperator = currentFilter?.operator ?? operators[0] ?? 'contains';

          const headerNode = (
            <span className={styles.headerLabel}>
              {column.header}
              {column.headerTooltip ? (
                <Tooltip content={column.headerTooltip}>
                  <span className={styles.iconBtn} aria-label={`${headerLabel} info`}>
                    <Icon name="info-circle" size={14} />
                  </span>
                </Tooltip>
              ) : null}
            </span>
          );

          return (
            <th
              key={column.id}
              className={[alignClass(align), isSorted ? styles.sortActive : ''].filter(Boolean).join(' ')}
              scope="col"
              aria-sort={ariaSort}
            >
              <div className={styles.headerInner}>
                {sortable ? (
                  <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => onSort(column.id)}
                    aria-label={`Sort by ${headerLabel}`}
                  >
                    {headerNode}
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
                  headerNode
                )}
                {filterable && (
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
              {filterable && filterOpen && (
                <div
                  className={styles.filterPopover}
                  data-bs-filter="popover"
                  role="dialog"
                  aria-label={`Filter ${headerLabel}`}
                >
                  <Select
                    size="small"
                    options={operators}
                    value={operator}
                    getOptionLabel={filterOperatorLabel}
                    getOptionKey={(item) => item}
                    onChange={(next) =>
                      onFilterChange(column.id, {
                        operator: next ?? operator,
                        value: currentFilter?.value ?? '',
                      })
                    }
                    placeholder="Operator"
                    searchable={false}
                  />
                  <InputField
                    size="small"
                    value={currentFilter?.value ?? ''}
                    onChange={(next) =>
                      onFilterChange(column.id, next.trim() === '' ? undefined : { operator, value: next })
                    }
                    placeholder="Filter"
                    aria-label={`Filter ${headerLabel}`}
                  />
                </div>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
