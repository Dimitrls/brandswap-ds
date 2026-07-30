import React from 'react';
import styles from './NavBar.module.css';
import { Icon } from '../../Icons/Icon';
import { Logo } from '../../Icons/Logo';

export interface NavBarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  items: NavBarItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  className?: string;
  logo?: React.ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const NavBar = ({
  items,
  activeItem,
  onItemClick,
  className,
  logo,
  collapsed = false,
  onToggleCollapse,
  ...props
}: NavBarProps) => {
  return (
    <nav
      className={[
        styles.navBar,
        collapsed ? styles['navBar--collapsed'] : styles['navBar--expanded'],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <div className={styles.navBar__header}>
        {logo ? (
          <div className={styles.navBar__logo}>{logo}</div>
        ) : (
          <div className={styles.navBar__logo}>
            <Logo variant={collapsed ? 'icon' : 'default'} color="primary" />
          </div>
        )}
      </div>
      <div className={styles.navBar__items}>
        {items.map((item, index) => (
          <button
            key={item.id || index}
            className={[
              styles.navBar__item,
              activeItem === item.id ? styles['navBar__item--active'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onItemClick?.(item.id)}
            title={collapsed ? item.label : undefined}
            type="button"
          >
            {item.icon && <span className={styles.navBar__icon}>{item.icon}</span>}
            {!collapsed && <span className={styles.navBar__label}>{item.label}</span>}
            {item.badge && <span className={styles.navBar__badge}>{item.badge}</span>}
          </button>
        ))}
      </div>
      <div className={styles.navBar__footer}>
        {onToggleCollapse && (
          <button
            className={styles.navBar__toggle}
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            type="button"
          >
            <Icon name={collapsed ? 'chevrons-right' : 'chevrons-left'} size={16} />
          </button>
        )}
      </div>
    </nav>
  );
};
