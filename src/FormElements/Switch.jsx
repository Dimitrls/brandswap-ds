import React from 'react';
import styles from './Switch.module.css';

/**
 * @typedef {Object} SwitchProps
 * @property {string} label - Label for the switch
 * @property {boolean} checked - Whether the switch is on
 * @property {function} onChange - Change handler
 * @property {boolean} [inForm] - If true, use in-form wrapper styles
 * @property {string} [warningMessage] - Optional warning message (only shown in inForm mode)
 */

const Switch = ({ label, checked, onChange, inForm = false, warningMessage }) => {
  let wrapperClass = styles.wrapper;
  if (inForm) {
    wrapperClass = warningMessage ? styles.wrapperInFormWarning : styles.wrapperInForm;
  }
  return (
    <label className={wrapperClass}>
      <span className={styles.label}>{label}</span>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className={styles.slider} />
      {inForm && warningMessage && (
        <span className={styles.warning}>{warningMessage}</span>
      )}
    </label>
  );
};

export default Switch; 