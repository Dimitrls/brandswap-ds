import React from 'react';
import { Button } from '../../Buttons/Button';
import { InputField } from '../../FormElements/InputField';
import { Select } from '../../FormElements/Select';
import { Pagination } from '../../Navigation/Pagination';
import type { GridTablePageSizeOption } from './GridTable.types';
import { DEFAULT_PAGE_SIZE_OPTIONS, resolvePageSizeOption } from './GridTable.utils';

const styles: Record<string, string> = {
  toolbar: 'bs-grid-table--toolbar',
  toolbarStart: 'bs-grid-table--toolbarStart',
  toolbarEnd: 'bs-grid-table--toolbarEnd',
  search: 'bs-grid-table--search',
  pageSize: 'bs-grid-table--pageSize',
  pagination: 'bs-grid-table--pagination',
};

export interface GridTableToolbarProps {
  showSearch: boolean;
  quickFilter: string;
  onQuickFilterChange: (value: string) => void;
  showExport: boolean;
  onExport: () => void;
  showPagination: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  pageSizeOptions: GridTablePageSizeOption[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function GridTableToolbar({
  showSearch,
  quickFilter,
  onQuickFilterChange,
  showExport,
  onExport,
  showPagination,
  page,
  pageSize,
  totalPages,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: GridTableToolbarProps) {
  if (!showSearch && !showExport && !showPagination) return null;

  const options = (pageSizeOptions.length > 0 ? pageSizeOptions : DEFAULT_PAGE_SIZE_OPTIONS).map(
    resolvePageSizeOption
  );
  const selected = options.find((option) => option.value === pageSize) ?? options[0];

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarStart}>
        {showSearch && (
          <div className={styles.search}>
            <InputField
              size="small"
              value={quickFilter}
              onChange={onQuickFilterChange}
              placeholder="Search"
              icon
              iconName="search"
              aria-label="Quick filter"
            />
          </div>
        )}
      </div>
      <div className={styles.toolbarEnd}>
        {showExport && (
          <Button
            variant="outline"
            size="small"
            label="Export"
            icon="file-export"
            onClick={onExport}
            aria-label="Export CSV"
          />
        )}
        {showPagination && (
          <div className={styles.pagination}>
            <div className={styles.pageSize}>
              <Select
                size="small"
                options={options}
                value={selected}
                getOptionLabel={(option) => option.label}
                getOptionKey={(option) => option.value}
                onChange={(next) => {
                  if (next) onPageSizeChange(next.value);
                }}
                searchable={false}
                aria-label="Rows per page"
              />
            </div>
            <Pagination totalPages={totalPages} currentPage={page} onChange={onPageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
