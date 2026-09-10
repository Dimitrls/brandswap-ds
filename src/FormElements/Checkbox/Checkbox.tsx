import React, { useEffect, useRef } from 'react';
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
  /** Visual mixed state for select-all. Native `indeterminate` on the input. */
  indeterminate?: boolean;
  /** Keep the accessible label but hide it visually (e.g. table selection). */
  hideLabel?: boolean;
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  inForm = false,
  disabled = false,
  indeterminate = false,
  hideLabel = false,
  className,
  ...props
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <label
      className={[
        inForm ? styles.wrapperInForm : styles.wrapper,
        disabled ? 'bs-checkbox--disabled' : '',
        hideLabel ? 'bs-checkbox--noLabel' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <input
        ref={inputRef}
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
};
