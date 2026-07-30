import React from 'react';
import styles from './Tabs.module.css';

export interface TabOption {
  label: string;
  icon?: React.ReactNode;
  value: string;
}

export interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Tabs = ({ options, value, onChange }: TabsProps) => {
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
