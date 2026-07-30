import React from 'react';
import './TabsSecondary.css';

const styles: Record<string, string> = {
  tabsSecondary: "bs-tabs-secondary--tabsSecondary",
  tab: "bs-tabs-secondary--tab",
  selected: "bs-tabs-secondary--selected",
  icon: "bs-tabs-secondary--icon",
};

export interface TabSecondaryOption {
  label: string;
  icon?: React.ReactNode;
  value: string;
}

export interface TabsSecondaryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: TabSecondaryOption[];
  value: string;
  onChange: (value: string) => void;
}

export const TabsSecondary = ({
  options,
  value,
  onChange,
  className,
  ...props
}: TabsSecondaryProps) => {
  return (
    <div className={[styles.tabsSecondary, className].filter(Boolean).join(' ')} {...props}>
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
