import React, { useState, useRef, useEffect } from 'react';
import styles from './Selectbox.module.css';
import Icon from '../Icons/Icon';

/**
 * @typedef {Object} SelectboxProps
 * @property {string} [label] - Label above the select
 * @property {string[]} options - Array of option strings
 * @property {function} [onChange] - Optional change handler
 */

const Selectbox = ({ label, options = [], onChange }) => {
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

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.select} onClick={() => setOpen(!open)}>
        {selected}
        <span className={styles.arrow}>
          <Icon name="chevron-down" size={18} />
        </span>
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

export default Selectbox; 