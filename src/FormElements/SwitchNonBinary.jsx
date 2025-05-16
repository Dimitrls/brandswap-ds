import React from 'react';
import styles from './SwitchNonBinary.module.css';

/**
 * @typedef {Object} SwitchNonBinaryProps
 * @property {string[]} options - The labels for each state/tab
 * @property {string} value - The currently selected value
 * @property {function} onChange - Callback when selection changes
 */

const SwitchNonBinary = ({ options, value, onChange }) => {
  return (
    <div className={styles.switchNonBinary}>
      {options.map(option => (
        <button
          key={option}
          type="button"
          className={
            value === option
              ? `${styles.tab} ${styles.selected}`
              : styles.tab
          }
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SwitchNonBinary; 