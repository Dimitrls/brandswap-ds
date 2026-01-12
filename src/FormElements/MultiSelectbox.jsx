import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Selectbox.module.css';
import Checkbox from './Checkbox';
import { RemovableTag } from '../Buttons/Tag';
import Icon from '../Icons/Icon';
/**
 * @typedef {Object} MultiSelectboxProps
 * @property {string[]} options - Array of option strings
 * @property {string[]} selected - Array of selected values
 * @property {function} onChange - Callback when selection changes
 * @property {string} [label] - Optional label
 * @property {string} [placeholder] - Optional placeholder
 * @property {boolean} [inForm] - If true, use in-form wrapper styles
 * @property {boolean} [labelOnTop] - If true, render the label above the select
 * @property {boolean} [labelInside=false] - If true, render label inside the select element
 * @property {boolean} [icon=false] - Whether to show an icon at the beginning
 * @property {string} [iconName='search'] - Name of the icon to display
 * @property {'small' | 'medium' | 'large'} [size='medium'] - Size of the multiselectbox
 */

const MultiSelectbox = ({ options = [], selected = [], onChange, label, placeholder = 'Select...', inForm = false, labelOnTop = false, labelInside = false, icon = false, iconName = 'search', size = 'medium' }) => {
  const [open, setOpen] = useState(false);
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

  const handleToggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleRemove = (option) => {
    onChange(selected.filter((item) => item !== option));
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

  let wrapperClass = styles.wrapper;
  if (labelOnTop) {
    wrapperClass = styles.labelOnTopWrapper;
  } else if (inForm) {
    wrapperClass = styles.wrapperInForm;
  }

  return (
    <div className={wrapperClass} ref={ref}>
      {!labelInside && labelOnTop ? (
        <span className={`${styles.label} ${getLabelSizeClass()}`} style={{ marginBottom: 4 }}>{label}</span>
      ) : !labelInside && label ? (
        <span className={`${styles.label} ${getLabelSizeClass()}`}>{label}</span>
      ) : null}
      <div className={styles.selectWrapper} style={{ position: 'relative' }}>
        {icon && (
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 1, opacity: 0.6, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <Icon name={iconName} size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        )}
        <div 
          className={`${styles.select} ${getSelectSizeClass()}`} 
          onClick={() => setOpen(!open)} 
          tabIndex={0}
          style={{
            ...(icon && { paddingLeft: size === 'small' ? 36 : size === 'large' ? 44 : 40 }),
          }}
        >
          {labelInside && label && (
            <span className="labelInside" style={{ color: 'var(--text-muted)', marginRight: '6px' }}>
              {label}:
            </span>
          )}
          {selected.length === 0 ? (
            <span className={styles.placeholder}>{placeholder}</span>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {selected.map((option) => (
                <RemovableTag key={option} label={option} onRemove={() => handleRemove(option)} />
              ))}
            </div>
          )}
          <span className={styles.arrow}>
            <Icon name="chevron-down" size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        </div>
      </div>
      {open && (
        <ul className={styles.dropdown} style={{ maxHeight: 220, overflowY: 'auto' }}>
          {options.map((option, idx) => (
            <li key={idx} className={styles.option} style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                label={option}
                checked={selected.includes(option)}
                onChange={() => handleToggle(option)}
                inForm={false}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

MultiSelectbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inForm: PropTypes.bool,
  labelOnTop: PropTypes.bool,
  labelInside: PropTypes.bool,
  icon: PropTypes.bool,
  iconName: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default MultiSelectbox; 