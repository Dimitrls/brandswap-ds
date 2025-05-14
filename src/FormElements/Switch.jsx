import React from 'react';
import styles from './Switch.module.css';

/**
 * @typedef {Object} SwitchProps
 * @property {string} label - Label for the switch
 * @property {boolean} checked - Whether the switch is on
 * @property {function} onChange - Change handler
 * @property {boolean} [inForm] - If true, use in-form wrapper styles
 * @property {string} [warningMessage] - Optional warning message (only shown in inForm mode)
 * @property {boolean} [labelOnTop] - If true, render the label above the switch
 */

const Switch = ({ label, checked, onChange, inForm = false, warningMessage, labelOnTop = false }) => {
  let wrapperClass = styles.wrapper;
  if (labelOnTop) {
    wrapperClass = styles.labelOnTopWrapper;
  } else if (inForm) {
    wrapperClass = warningMessage ? styles.wrapperInFormWarning : styles.wrapperInForm;
  }
  return (
    <label className={wrapperClass}>
      {labelOnTop ? (
        <span className={styles.label}>{label}</span>
      ) : (
        <span className={styles.label}>{label}</span>
      )}
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