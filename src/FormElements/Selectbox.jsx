import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Selectbox.module.css';
import Icon from '../Icons/Icon';

/**
 * @typedef {Object} SelectboxProps
 * @property {string} [label] - Label above the select
 * @property {string[]} options - Array of option strings
 * @property {function} [onChange] - Optional change handler
 * @property {'small' | 'medium' | 'large'} [size='medium'] - Size of the selectbox
 * @property {boolean} [icon=false] - Whether to show an icon at the beginning
 * @property {string} [iconName='search'] - Name of the icon to display
 */

const Selectbox = ({ label, options = [], onChange, size = 'medium', icon = false, iconName = 'search' }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0] || '');
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onChange && onChange(option);
  };

  const getSelectSizeClass = () => {
    if (size === 'small') return styles.selectSmall;
    if (size === 'large') return styles.selectLarge;
    return styles.selectMedium;
  };

  const getLabelSizeClass = () => {
    if (size === 'small') return styles.labelSmall;
    if (size === 'large') return styles.labelLarge;
    return styles.labelMedium;
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && <label className={`${styles.label} ${getLabelSizeClass()}`}>{label}</label>}
      <div className={styles.selectWrapper} style={{ position: 'relative' }}>
        {icon && (
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 1, opacity: 0.6, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <Icon name={iconName} size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        )}
        <div 
          className={`${styles.select} ${getSelectSizeClass()}`} 
          onClick={() => setOpen(!open)}
          style={{
            ...(icon && { paddingLeft: size === 'small' ? 36 : size === 'large' ? 44 : 40 }),
          }}
        >
          {selected}
          <span className={styles.arrow}>
            <Icon name="chevron-down" size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        </div>
      </div>
      {open && (
        <ul className={styles.dropdown}>
          {options.map((option, idx) => (
            <li
              key={idx}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Selectbox.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.bool,
  iconName: PropTypes.string,
};

export default Selectbox; 