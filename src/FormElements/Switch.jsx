import React from 'react';
import styles from './Switch.module.css';

/**
 * @typedef {Object} SwitchProps
 * @property {string} label - Label for the switch
 * @property {boolean} checked - Whether the switch is on
 * @property {function} onChange - Change handler
 */

const Switch = ({ label, checked, onChange }) => (
  <label className={styles.wrapper}>
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