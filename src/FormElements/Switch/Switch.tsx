import React from 'react';
import './Switch.css';

const styles: Record<string, string> = {
  wrapper: 'bs-switch--wrapper',
  input: 'bs-switch--input',
  slider: 'bs-switch--slider',
  label: 'bs-switch--label',
  wrapperInForm: 'bs-switch--wrapperInForm',
  warning: 'bs-switch--warning',
  wrapperInFormWarning: 'bs-switch--wrapperInFormWarning',
  labelOnTopWrapper: 'bs-switch--labelOnTopWrapper',
};

export interface SwitchProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  label: string;
  checked: boolean;
  /** Called with the next checked state. */
  onChange: (checked: boolean) => void;
  inForm?: boolean;
  warningMessage?: string;
  labelOnTop?: boolean;
}

export const Switch = ({
  label,
  checked,
  onChange,
  inForm = false,
  warningMessage,
  labelOnTop = false,
  className,
  ...props
}: SwitchProps) => {
  let wrapperClass = styles.wrapper;
  if (labelOnTop) {
    wrapperClass = styles.labelOnTopWrapper;
  } else if (inForm) {
    wrapperClass = warningMessage ? styles.wrapperInFormWarning : styles.wrapperInForm;
  }

  return (
    <label className={[wrapperClass, className].filter(Boolean).join(' ')} {...props}>
      <span className={styles.label}>{label}</span>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.slider} />
      {inForm && warningMessage && <span className={styles.warning}>{warningMessage}</span>}
    </label>
  );
};
