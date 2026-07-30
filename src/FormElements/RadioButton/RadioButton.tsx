import React from 'react';
import styles from './RadioButton.module.css';

export interface RadioButtonProps {
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  name: string;
  value: string;
}

export const RadioButton = ({ label, checked, onChange, name, value }: RadioButtonProps) => (
  <label className={styles.wrapper}>
    <input
      type="radio"
      className={styles.input}
      checked={checked}
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
