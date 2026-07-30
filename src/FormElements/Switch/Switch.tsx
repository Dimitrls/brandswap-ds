import React from 'react';
import styles from './Switch.module.css';

export interface SwitchProps {
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
}: SwitchProps) => {
  let wrapperClass = styles.wrapper;
  if (labelOnTop) {
    wrapperClass = styles.labelOnTopWrapper;
  } else if (inForm) {
    wrapperClass = warningMessage ? styles.wrapperInFormWarning : styles.wrapperInForm;
  }

  return (
    <label className={wrapperClass}>
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
