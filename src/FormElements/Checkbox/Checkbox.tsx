import React from 'react';
import './Checkbox.css';

const styles: Record<string, string> = {
  wrapper: 'bs-checkbox--wrapper',
  input: 'bs-checkbox--input',
  custom: 'bs-checkbox--custom',
  label: 'bs-checkbox--label',
  wrapperInForm: 'bs-checkbox--wrapperInForm',
};

export interface CheckboxProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  label: React.ReactNode;
  checked: boolean;
  /** Called with the next checked state. */
  onChange: (checked: boolean) => void;
  inForm?: boolean;
  disabled?: boolean;
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  inForm = false,
  disabled = false,
  className,
  ...props
}: CheckboxProps) => (
  <label
    className={[
      inForm ? styles.wrapperInForm : styles.wrapper,
      disabled ? 'bs-checkbox--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    <input
      type="checkbox"
      className={styles.input}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className={styles.custom} />
    <span className={styles.label}>{label}</span>
  </label>
);
