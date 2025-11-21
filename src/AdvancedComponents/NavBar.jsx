import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavBar.module.css';

const NavBar = ({ items, activeItem, onItemClick, className, ...props }) => {
  return (
    <nav className={[styles.navBar, className].filter(Boolean).join(' ')} {...props}>
      {items.map((item, index) => (
        <button
          key={item.id || index}
          className={[styles.navBar__item, activeItem === item.id ? styles['navBar__item--active'] : ''].filter(Boolean).join(' ')}
          onClick={() => onItemClick && onItemClick(item.id)}
        >
          {item.icon && <span className={styles.navBar__icon}>{item.icon}</span>}
          {item.label}
          {item.badge && <span className={styles.navBar__badge}>{item.badge}</span>}
        </button>
      ))}
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
};

export default NavBar;

