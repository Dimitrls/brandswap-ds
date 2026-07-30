import React from 'react';
import './SwitchNonBinary.css';

import { defaultGetOptionKey, defaultGetOptionLabel } from '../optionHelpers';

const styles: Record<string, string> = {
  switchNonBinary: 'bs-switch-non-binary--switchNonBinary',
  tab: 'bs-switch-non-binary--tab',
  selected: 'bs-switch-non-binary--selected',
};

export interface SwitchNonBinaryProps<T = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur'> {
  options: T[];
  value: T;
  /** Called with the selected option (same type as `options` items). */
  onChange: (value: T) => void;
  onBlur?: (value: T) => void;
  getOptionLabel?: (option: T) => string;
  getOptionKey?: (option: T, index?: number) => string | number;
}

export function SwitchNonBinary<T = string>({
  options,
  value,
  onChange,
  onBlur,
  getOptionLabel = defaultGetOptionLabel,
  getOptionKey = defaultGetOptionKey,
  className,
  ...props
}: SwitchNonBinaryProps<T>) {
  const selectedKey = getOptionKey(value);

  return (
    <div
      className={[styles.switchNonBinary, className].filter(Boolean).join(' ')}
      onBlur={() => onBlur?.(value)}
      {...props}
    >
      {options.map((option, index) => {
        const key = getOptionKey(option, index);
        const selected = key === selectedKey;
        return (
          <button
            key={key}
            type="button"
            className={selected ? `${styles.tab} ${styles.selected}` : styles.tab}
            onClick={() => onChange(option)}
          >
            {getOptionLabel(option)}
          </button>
        );
      })}
    </div>
  );
}
