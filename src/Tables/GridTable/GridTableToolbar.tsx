import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../Buttons/Button';
import { InputField } from '../../FormElements/InputField';
import { Select } from '../../FormElements/Select';
import { Icon } from '../../Icons/Icon';
import type { IconName } from '../../Icons/Icon';
import { Pagination } from '../../Navigation/Pagination';
import type { GridTableMenuItem, GridTablePageSizeOption } from './GridTable.types';
import { DEFAULT_PAGE_SIZE_OPTIONS, resolvePageSizeOption } from './GridTable.utils';
import { GridTableFloating } from './GridTableFloating';

const styles: Record<string, string> = {
  toolbar: 'bs-grid-table--toolbar',
  toolbarStart: 'bs-grid-table--toolbarStart',
  toolbarEnd: 'bs-grid-table--toolbarEnd',
  search: 'bs-grid-table--search',
  pageSize: 'bs-grid-table--pageSize',
  pagination: 'bs-grid-table--pagination',
  exportMenu: 'bs-grid-table--exportMenu',
  actionsButton: 'bs-grid-table--actionsButton',
  menu: 'bs-grid-table--menu',
  menuItem: 'bs-grid-table--menuItem',
};

export type GridTableExportFormat = 'csv' | 'xls';

function MenuRow({
  icon,
  label,
  onClick,
}: {
  icon?: IconName;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" role="menuitem" className={styles.menuItem} onClick={onClick}>
      {icon ? [<Icon key="icon" name={icon} size={16} />, label] : label}
    </button>
  );
}

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

export function GridTableActionsMenu({
  formats,
  menuItems = [],
  onExport,
}: {
  formats: GridTableExportFormat[];
  menuItems?: GridTableMenuItem[];
  onExport: (format: GridTableExportFormat) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapperRef.current?.contains(target) || menuRef.current?.contains(target)) return;
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

  if (formats.length === 1 && menuItems.length === 0) {
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

  const menuLabel = formats.length > 0 ? 'Export' : 'Table actions';

  return (
    <div className={styles.exportMenu} ref={wrapperRef}>
      <button
        type="button"
        className={styles.actionsButton}
        onClick={() => setOpen((value) => !value)}
        aria-label={menuLabel}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon name="dots-vertical" size={16} />
      </button>
      {open && (
        <GridTableFloating
          as="ul"
          anchorRef={wrapperRef}
          align="right"
          floatingRef={menuRef}
          className={styles.menu}
          role="menu"
        >
          {formats.map((format) => (
            <li key={format} role="none">
              <MenuRow
                icon="file-export"
                label={`Export as ${exportFormatLabel(format)}`}
                onClick={() => {
                  onExport(format);
                  setOpen(false);
                }}
              />
            </li>
          ))}
          {menuItems.map((item) => (
            <li key={item.label} role="none">
              <MenuRow
                icon={item.icon}
                label={item.label}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
              />
            </li>
          ))}
        </GridTableFloating>
      )}
    </div>
  );
}

export interface GridTableToolbarProps {
  showSearch: boolean;
  quickFilter: string;
  onQuickFilterChange: (value: string) => void;
  showPagination: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  pageSizeOptions: GridTablePageSizeOption[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  /** Rendered in the toolbar, before pagination. */
  actions?: React.ReactNode;
}

export function GridTableToolbar({
  showSearch,
  quickFilter,
  onQuickFilterChange,
  showPagination,
  page,
  pageSize,
  totalPages,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  actions,
}: GridTableToolbarProps) {
  if (!showSearch && !showPagination && !actions) return null;

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
        {actions}
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
