import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css';
import Pagination from '../FormElements/Pagination';
import Icon from '../Icons/Icon';

const Table = ({
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
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedRows, setExpandedRows] = useState([]);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const actionsMenuRef = useRef(null);

  useEffect(() => {
    if (!actionsMenuOpen) return;
    function handleClickOutside(event) {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target)) {
        setActionsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [actionsMenuOpen]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortKey === key && sortDirection === 'asc') direction = 'desc';
    setSortKey(key);
    setSortDirection(direction);
    if (onSort) onSort(key, direction);
  };

  const handleExpand = (rowIdx) => {
    setExpandedRows((prev) =>
      prev.includes(rowIdx)
        ? prev.filter((idx) => idx !== rowIdx)
        : [...prev, rowIdx]
    );
    if (onRowExpand) onRowExpand(data[rowIdx]);
  };

  return (
    <div className={styles.tableWrapper}>
      {title && <div className={styles.title}>{title}</div>}
      {tableActions && (
        <div className={styles.tableActions} ref={actionsMenuRef}>
          <button
            className={styles.tableActionsButton}
            aria-label="Table actions"
            aria-haspopup="menu"
            aria-expanded={actionsMenuOpen}
            onClick={() => setActionsMenuOpen((open) => !open)}
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
            {columns.map((col) => (
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
                      <Icon name={expandedRows.includes(rowIdx) ? "chevron-down" : "chevron-right"} />
                    </button>
                  </td>
                )}
                {columns.map((col) => (
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
              {columns.map((col) => (
                <td key={col.key} className={styles[`align-${col.align}`]}>
                  {totalsRow[col.key]}
                </td>
              ))}
              {renderRowActions && <td className={styles.actionsCol}></td>}
            </tr>
          </tfoot>
        )}
      </table>
      {pagination && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};

Table.propTypes = {
  title: PropTypes.string,
  pagination: PropTypes.bool,
  tableActions: PropTypes.bool,
  totals: PropTypes.bool,
  actionsOnHover: PropTypes.bool,
  expandableRows: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      sortable: PropTypes.bool,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalsRow: PropTypes.object,
  onSort: PropTypes.func,
  onRowExpand: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  renderRowActions: PropTypes.func,
  renderExpandedRow: PropTypes.func,
};

export default Table; 