import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavBar.module.css';
import Icon from '../Icons/Icon';

const NavBar = ({ items, activeItem, onItemClick, className, logo, collapsed = false, onToggleCollapse, ...props }) => {
  return (
    <nav className={[styles.navBar, collapsed ? styles['navBar--collapsed'] : styles['navBar--expanded'], className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.navBar__header}>
        {logo && (
          <div className={styles.navBar__logo}>
            {logo}
          </div>
        )}
        {onToggleCollapse && (
          <button
            className={styles.navBar__toggle}
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            type="button"
          >
            <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} size={16} />
          </button>
        )}
      </div>
      <div className={styles.navBar__items}>
        {items.map((item, index) => (
          <button
            key={item.id || index}
            className={[styles.navBar__item, activeItem === item.id ? styles['navBar__item--active'] : ''].filter(Boolean).join(' ')}
            onClick={() => onItemClick && onItemClick(item.id)}
            title={collapsed ? item.label : undefined}
            type="button"
          >
            {item.icon && <span className={styles.navBar__icon}>{item.icon}</span>}
            {!collapsed && <span className={styles.navBar__label}>{item.label}</span>}
            {item.badge && <span className={styles.navBar__badge}>{item.badge}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      badge: PropTypes.node,
    })
  ).isRequired,
  activeItem: PropTypes.string,
  onItemClick: PropTypes.func,
  className: PropTypes.string,
  logo: PropTypes.node,
  collapsed: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
};

export default NavBar;

