import React, { useEffect, useRef, useState } from 'react';
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
  exportMenu: 'bs-grid-table--exportMenu',
  menu: 'bs-grid-table--menu',
  menuItem: 'bs-grid-table--menuItem',
};

export type GridTableExportFormat = 'csv' | 'xls';

function exportFormatLabel(format: GridTableExportFormat): string {
  switch (format) {
    case 'csv':
      return 'CSV';
    case 'xls':
      return 'XLS';
    default: {
      const _exhaustive: never = format;
      return _exhaustive;
    }
  }
}

function ExportControl({
  formats,
  onExport,
}: {
  formats: GridTableExportFormat[];
  onExport: (format: GridTableExportFormat) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointer = (event: MouseEvent) => {
      if (wrapperRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  if (formats.length === 1) {
    const [format] = formats;
    return (
      <Button
        variant="outline"
        size="small"
        label="Export"
        icon="file-export"
        onClick={() => onExport(format)}
        aria-label={`Export ${exportFormatLabel(format)}`}
      />
    );
  }

  return (
    <div className={styles.exportMenu} ref={wrapperRef}>
      <Button
        variant="outline"
        size="small"
        label="Export"
        icon="file-export"
        onClick={() => setOpen((value) => !value)}
        aria-label="Export"
        aria-haspopup="menu"
        aria-expanded={open}
      />
      {open && (
        <ul className={styles.menu} role="menu">
          {formats.map((format) => (
            <li key={format} role="none">
              <button
                type="button"
                role="menuitem"
                className={styles.menuItem}
                onClick={() => {
                  onExport(format);
                  setOpen(false);
                }}
              >
                {`Export as ${exportFormatLabel(format)}`}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export interface GridTableToolbarProps {
  showSearch: boolean;
  quickFilter: string;
  onQuickFilterChange: (value: string) => void;
  exportFormats: GridTableExportFormat[];
  onExport: (format: GridTableExportFormat) => void;
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
  exportFormats,
  onExport,
  showPagination,
  page,
  pageSize,
  totalPages,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: GridTableToolbarProps) {
  const showExport = exportFormats.length > 0;
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
        {showExport && <ExportControl formats={exportFormats} onExport={onExport} />}
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
