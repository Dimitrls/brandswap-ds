import React from 'react';
import styles from './Switch.module.css';

/**
 * @typedef {Object} SwitchProps
 * @property {string} label - Label for the switch
 * @property {boolean} checked - Whether the switch is on
 * @property {function} onChange - Change handler
 * @property {boolean} [inForm] - If true, use in-form wrapper styles
 */

const Switch = ({ label, checked, onChange, inForm = false }) => (
  <label className={inForm ? styles.wrapperInForm : styles.wrapper}>
    <span className={styles.label}>{label}</span>
    <input
      type="checkbox"
      className={styles.input}
      checked={checked}
      onChange={e => onChange(e.target.checked)}
    />
    <span className={styles.slider} />
  </label>
);

export default Switch; 