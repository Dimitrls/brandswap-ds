import React from 'react';
import './RadioButton.css';

const styles: Record<string, string> = {
  wrapper: 'bs-radio-button--wrapper',
  input: 'bs-radio-button--input',
  custom: 'bs-radio-button--custom',
  label: 'bs-radio-button--label',
  disabled: 'bs-radio-button--disabled',
};

export interface RadioButtonProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  label: React.ReactNode;
  checked: boolean;
  /** Called with this radio's `value` when selected. */
  onChange: (value: string) => void;
  name: string;
  value: string;
  disabled?: boolean;
}

export const RadioButton = ({
  label,
  checked,
  onChange,
  name,
  value,
  disabled = false,
  className,
  ...props
}: RadioButtonProps) => (
  <label
    className={[styles.wrapper, disabled ? styles.disabled : '', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    <input
      type="radio"
      className={styles.input}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
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
  disabled?: boolean;
}

export const RadioButtonGroup = ({
  children,
  horizontal = false,
  disabled = false,
  className = '',
  style,
  ...props
}: RadioButtonGroupProps) => (
  <div
    className={[className, disabled ? 'bs-radio-button-group--disabled' : '']
      .filter(Boolean)
      .join(' ')}
    style={{
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      gap: '12px',
      ...style,
    }}
    aria-disabled={disabled || undefined}
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child) || !disabled) return child;
      return React.cloneElement(child as React.ReactElement<{ disabled?: boolean }>, {
        disabled: true,
      });
    })}
  </div>
);
