import React from 'react';
import styles from './TabsSecondary.module.css';

export interface TabSecondaryOption {
  label: string;
  icon?: React.ReactNode;
  value: string;
}

export interface TabsSecondaryProps {
  options: TabSecondaryOption[];
  value: string;
  onChange: (value: string) => void;
}

export const TabsSecondary = ({ options, value, onChange }: TabsSecondaryProps) => {
  return (
    <div className={styles.tabsSecondary}>
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
          {option.label ? <span>{option.label}</span> : null}
        </button>
      ))}
    </div>
  );
};
