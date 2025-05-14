import React from 'react';
import styles from './Checkbox.module.css';

/**
 * @typedef {Object} CheckboxProps
 * @property {string} label - Label for the checkbox
 * @property {boolean} checked - Whether the checkbox is checked
 * @property {function} onChange - Change handler
 */

const Checkbox = ({ label, checked, onChange }) => (
  <label className={styles.wrapper}>
    <input
      type="checkbox"
      className={styles.input}
      checked={checked}
      onChange={e => onChange(e.target.checked)}
    />
    <span className={styles.custom} />
    <span className={styles.label}>{label}</span>
  </label>
);

export default Checkbox; 