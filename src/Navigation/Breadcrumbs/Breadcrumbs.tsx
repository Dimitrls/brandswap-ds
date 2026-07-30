import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../../Icons/Icon';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  hasDropdown?: boolean;
  onClick?: () => void;
  dropdownItems?: string[];
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items, className, ...props }: BreadcrumbsProps) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRefs.current.every(
          ref => ref && !ref.contains(event.target as Node)
        )
      ) {
        setOpenDropdown(null);
      }
    }
    if (openDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <nav
      className={[styles.breadcrumbs, className].filter(Boolean).join(' ')}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className={styles.list}>
        {items.map((item, idx) => (
          <li key={item.label} className={styles.item} ref={el => (dropdownRefs.current[idx] = el)}>
            <button
              type="button"
              className={
                item.hasDropdown
                  ? `${styles.button} ${styles.buttonHasDropdown}`
                  : styles.button
              }
              onClick={item.onClick}
              aria-current={idx === items.length - 1 ? 'page' : undefined}
              disabled={idx === items.length - 1}
            >
              <span>{item.label}</span>
              {item.hasDropdown && (
                <span
                  className={styles.dropdownChevron}
                  onClick={e => {
                    e.stopPropagation();
                    setOpenDropdown(openDropdown === idx ? null : idx);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === idx}
                >
                  <Icon name="chevron-down" className={styles.dropdownIcon} />
                </span>
              )}
            </button>
            {item.hasDropdown && openDropdown === idx && item.dropdownItems && (
              <ul className={styles.dropdownMenu} role="menu">
                {item.dropdownItems.map(dropdownItem => (
                  <li key={dropdownItem} className={styles.dropdownMenuItem} role="menuitem">
                    {dropdownItem}
                  </li>
                ))}
              </ul>
            )}
            {idx < items.length - 1 && (
              <Icon name="chevron-right" className={styles.separator} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
