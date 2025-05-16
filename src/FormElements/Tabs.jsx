import React from 'react';
import styles from './Tabs.module.css';

/**
 * @typedef {Object} TabOption
 * @property {string} label - The tab label
 * @property {React.ReactNode} [icon] - Optional icon element
 * @property {string} value - The tab value
 */

/**
 * @param {{ options: TabOption[], value: string, onChange: (value: string) => void }} props
 */
const Tabs = ({ options, value, onChange }) => {
  return (
    <div className={styles.tabs}>
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          className={
            value === option.value
              ? `${styles.tab} ${styles.selected}`
              : styles.tab
          }
          onClick={() => onChange(option.value)}
        >
          {option.icon && <span className={styles.icon}>{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs; 