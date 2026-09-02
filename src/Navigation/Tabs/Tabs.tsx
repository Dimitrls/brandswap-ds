import React from 'react';
import './Tabs.css';

const styles: Record<string, string> = {
  tabs: "bs-tabs--tabs",
  tab: "bs-tabs--tab",
  selected: "bs-tabs--selected",
  icon: "bs-tabs--icon",
  separator: "bs-tabs--separator",
};

export interface TabOption {
  label: string;
  icon?: React.ReactNode;
  value: string;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: TabOption[];
  /** Optional tabs rendered after a vertical separator. */
  separatedOptions?: TabOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Tabs = ({
  options,
  separatedOptions,
  value,
  onChange,
  className,
  ...props
}: TabsProps) => {
  const renderTab = (option: TabOption) => (
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
  );

  return (
    <div className={[styles.tabs, className].filter(Boolean).join(' ')} {...props}>
      {options.map(renderTab)}
      {separatedOptions && separatedOptions.length > 0 && (
        <>
          <span className={styles.separator} aria-hidden="true" />
          {separatedOptions.map(renderTab)}
        </>
      )}
    </div>
  );
};
