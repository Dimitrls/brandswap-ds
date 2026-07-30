import React from 'react';
import './RadioButton.css';

const styles: Record<string, string> = {
  wrapper: 'bs-radio-button--wrapper',
  input: 'bs-radio-button--input',
  custom: 'bs-radio-button--custom',
  label: 'bs-radio-button--label',
};

export interface RadioButtonProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange' | 'onBlur'> {
  label: string;
  checked: boolean;
  /** Called with this radio's `value` when selected. */
  onChange: (value: string) => void;
  /** Called with this radio's `value` on blur. */
  onBlur?: (value: string) => void;
  name: string;
  value: string;
}

export const RadioButton = ({
  label,
  checked,
  onChange,
  onBlur,
  name,
  value,
  className,
  ...props
}: RadioButtonProps) => (
  <label className={[styles.wrapper, className].filter(Boolean).join(' ')} {...props}>
    <input
      type="radio"
      className={styles.input}
      checked={checked}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => onBlur?.(value)}
      name={name}
      value={value}
    />
    <span className={styles.custom} />
    <span className={styles.label}>{label}</span>
  </label>
);

export interface RadioButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  horizontal?: boolean;
}

export const RadioButtonGroup = ({
  children,
  horizontal = false,
  className = '',
  style,
  ...props
}: RadioButtonGroupProps) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      gap: '12px',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);
