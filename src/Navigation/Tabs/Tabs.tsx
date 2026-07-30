import React from 'react';
import styles from './Tabs.module.css';

export interface TabOption {
  label: string;
  icon?: React.ReactNode;
  value: string;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Tabs = ({ options, value, onChange, className, ...props }: TabsProps) => {
  return (
    <div className={[styles.tabs, className].filter(Boolean).join(' ')} {...props}>
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
