import React from 'react';
import styles from './RadioButton.module.css';

/**
 * @typedef {Object} RadioButtonProps
 * @property {string} label - Label for the radio button
 * @property {boolean} checked - Whether the radio button is selected
 * @property {function} onChange - Change handler
 * @property {string} name - Name for the radio group
 * @property {string} value - Value for the radio button
 */

const RadioButton = ({ label, checked, onChange, name, value }) => (
  <label className={styles.wrapper}>
    <input
      type="radio"
      className={styles.input}
      checked={checked}
      onChange={e => onChange(e.target.value)}
      name={name}
      value={value}
    />
    <span className={styles.custom} />
    <span className={styles.label}>{label}</span>
  </label>
);

export const RadioButtonGroup = ({ children, horizontal = false, className = '', ...props }) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      gap: '12px',
      ...props.style
    }}
    {...props}
  >
    {children}
  </div>
);

export default RadioButton; 