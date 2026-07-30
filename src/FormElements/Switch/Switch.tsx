import React from 'react';
import styles from './Switch.module.css';

export interface SwitchProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  label: string;
  checked: boolean;
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
