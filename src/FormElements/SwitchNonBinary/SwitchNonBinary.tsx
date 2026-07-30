import React from 'react';
import './SwitchNonBinary.css';

const styles: Record<string, string> = {
  switchNonBinary: "bs-switch-non-binary--switchNonBinary",
  tab: "bs-switch-non-binary--tab",
  selected: "bs-switch-non-binary--selected",
};

export interface SwitchNonBinaryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SwitchNonBinary = ({
  options,
  value,
  onChange,
  className,
  ...props
}: SwitchNonBinaryProps) => (
  <div className={[styles.switchNonBinary, className].filter(Boolean).join(' ')} {...props}>
    {options.map((option) => (
      <button
        key={option}
        type="button"
        className={value === option ? `${styles.tab} ${styles.selected}` : styles.tab}
        onClick={() => onChange(option)}
      >
        {option}
      </button>
    ))}
  </div>
);
