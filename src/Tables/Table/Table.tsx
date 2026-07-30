import React, { useState, useRef, useEffect } from 'react';
import './Table.css';

import { Pagination } from '../../Navigation/Pagination';
import { Icon } from '../../Icons/Icon';

const styles: Record<string, string> = {
  tableWrapper: "bs-table--tableWrapper",
  table: "bs-table--table",
  title: "bs-table--title",
  tableActions: "bs-table--tableActions",
  "align-left": "bs-table--align-left",
  "align-center": "bs-table--align-center",
  "align-right": "bs-table--align-right",
  sortIcon: "bs-table--sortIcon",
  actionsCol: "bs-table--actionsCol",
  expandCol: "bs-table--expandCol",
  actionsOnHover: "bs-table--actionsOnHover",
  expandedRow: "bs-table--expandedRow",
  totalsRow: "bs-table--totalsRow",
  tableActionsButton: "bs-table--tableActionsButton",
  actionsDropdown: "bs-table--actionsDropdown",
  actionsDropdownItem: "bs-table--actionsDropdownItem",
};

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface TableProps<T extends Record<string, React.ReactNode> = Record<string, React.ReactNode>>
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  pagination?: boolean;
  tableActions?: boolean;
  totals?: boolean;
  actionsOnHover?: boolean;
  expandableRows?: boolean;
  columns: TableColumn[];
  data: T[];
  totalsRow?: Partial<T>;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onRowExpand?: (row: T) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  renderRowActions?: (row: T) => React.ReactNode;
  renderExpandedRow?: (row: T) => React.ReactNode;
}

export function Table<T extends Record<string, React.ReactNode>>({
  title,
  pagination,
  tableActions,
  totals,
  actionsOnHover,
  expandableRows,
  columns,
  data,
  totalsRow,
  onSort,
  onRowExpand,
  page = 1,
  totalPages = 1,
  onPageChange,
  renderRowActions,
  renderExpandedRow,
  className,
  ...props
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const actionsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!actionsMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target as Node)) {
        setActionsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [actionsMenuOpen]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortKey === key && sortDirection === 'asc') direction = 'desc';
    setSortKey(key);
    setSortDirection(direction);
    if (onSort) onSort(key, direction);
  };

  const handleExpand = (rowIdx: number) => {
    setExpandedRows(prev =>
      prev.includes(rowIdx)
        ? prev.filter(idx => idx !== rowIdx)
        : [...prev, rowIdx]
    );
    if (onRowExpand) onRowExpand(data[rowIdx]);
  };

  return (
    <div className={[styles.tableWrapper, className].filter(Boolean).join(' ')} {...props}>
      {title && <div className={styles.title}>{title}</div>}
      {tableActions && (
        <div className={styles.tableActions} ref={actionsMenuRef}>
          <button
            className={styles.tableActionsButton}
            aria-label="Table actions"
            aria-haspopup="menu"
            aria-expanded={actionsMenuOpen}
            onClick={() => setActionsMenuOpen(open => !open)}
          >
            <Icon name="dots-vertical" />
          </button>
          {actionsMenuOpen && (
            <ul className={styles.actionsDropdown} role="menu">
              <li role="menuitem" tabIndex={0} className={styles.actionsDropdownItem}>
                <Icon name="file-export" /> Export as CSV
              </li>
              <li role="menuitem" tabIndex={0} className={styles.actionsDropdownItem}>
                <Icon name="file-export" /> Export as XLS
              </li>
              <li role="menuitem" tabIndex={0} className={styles.actionsDropdownItem}>
                <Icon name="pencil" /> Edit Columns
              </li>
            </ul>
          )}
        </div>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            {expandableRows && <th className={styles.expandCol}></th>}
            {columns.map(col => (
              <th
                key={col.key}
                className={styles[`align-${col.align}`]}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                style={{ cursor: col.sortable ? 'pointer' : 'default' }}
              >
                {col.label}
                {col.sortable && sortKey === col.key && (
                  <span className={styles.sortIcon}>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
            {renderRowActions && <th className={styles.actionsCol}></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <React.Fragment key={rowIdx}>
              <tr
                className={
                  actionsOnHover ? styles.actionsOnHover : undefined
                }
              >
                {expandableRows && (
                  <td className={styles.expandCol}>
                    <button onClick={() => handleExpand(rowIdx)} aria-label="Expand row">
                      <Icon name={expandedRows.includes(rowIdx) ? 'chevron-down' : 'chevron-right'} />
                    </button>
                  </td>
                )}
                {columns.map(col => (
                  <td key={col.key} className={styles[`align-${col.align}`]}>
                    {row[col.key]}
                  </td>
                ))}
                {renderRowActions && (
                  <td className={styles.actionsCol}>
                    {renderRowActions(row)}
                  </td>
                )}
              </tr>
              {expandableRows && expandedRows.includes(rowIdx) && renderExpandedRow && (
                <tr className={styles.expandedRow}>
                  <td colSpan={columns.length + (expandableRows ? 1 : 0) + (renderRowActions ? 1 : 0)}>
                    {renderExpandedRow(row)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
        {totals && totalsRow && (
          <tfoot>
            <tr className={styles.totalsRow}>
              {expandableRows && <td className={styles.expandCol}></td>}
              {columns.map(col => (
                <td key={col.key} className={styles[`align-${col.align}`]}>
                  {totalsRow[col.key]}
                </td>
              ))}
              {renderRowActions && <td className={styles.actionsCol}></td>}
            </tr>
          </tfoot>
        )}
      </table>
      {pagination && onPageChange && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onChange={onPageChange}
        />
      )}
    </div>
  );
}
