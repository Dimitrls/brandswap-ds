import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  inForm?: boolean;
}

export const Checkbox = ({
  label,
  checked,
  onChange,
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
    />
    <span className={styles.custom} />
    <span className={styles.label}>{label}</span>
  </label>
);
