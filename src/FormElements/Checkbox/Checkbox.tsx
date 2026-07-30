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
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange' | 'onBlur'> {
  label: string;
  checked: boolean;
  /** Called with the next checked state. */
  onChange: (checked: boolean) => void;
  /** Called with the current checked state on blur. */
  onBlur?: (checked: boolean) => void;
  inForm?: boolean;
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  onBlur,
  inForm = false,
  className,
  ...props
}: CheckboxProps) => (
  <label
    className={[inForm ? styles.wrapperInForm : styles.wrapper, className].filter(Boolean).join(' ')}
    {...props}
  >
    <input
      type="checkbox"
      className={styles.input}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      onBlur={() => onBlur?.(checked)}
    />
    <span className={styles.custom} />
    <span className={styles.label}>{label}</span>
  </label>
);
