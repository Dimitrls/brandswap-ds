import React from 'react';
import './SwitchNonBinary.css';

import { defaultGetOptionKey, defaultGetOptionLabel } from '../optionHelpers';

const styles: Record<string, string> = {
  switchNonBinary: 'bs-switch-non-binary--switchNonBinary',
  tab: 'bs-switch-non-binary--tab',
  selected: 'bs-switch-non-binary--selected',
  disabled: 'bs-switch-non-binary--disabled',
};

export interface SwitchNonBinaryProps<T = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: T[];
  value: T;
  /** Called with the selected option (same type as `options` items). */
  onChange: (value: T) => void;
  getOptionLabel?: (option: T) => string;
  getOptionKey?: (option: T, index?: number) => string | number;
  disabled?: boolean;
}

export function SwitchNonBinary<T = string>({
  options,
  value,
  onChange,
  getOptionLabel = defaultGetOptionLabel,
  getOptionKey = defaultGetOptionKey,
  disabled = false,
  className,
  ...props
}: SwitchNonBinaryProps<T>) {
  const selectedKey = getOptionKey(value);

  return (
    <div
      className={[
        styles.switchNonBinary,
        disabled ? styles.disabled : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-disabled={disabled || undefined}
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
            onClick={() => {
              if (!disabled) onChange(option);
            }}
            disabled={disabled}
          >
            {getOptionLabel(option)}
          </button>
        );
      })}
    </div>
  );
}
