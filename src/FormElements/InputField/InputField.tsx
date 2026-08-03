import React from 'react';
import './InputField.css';

import { Icon, IconName } from '../../Icons/Icon';

const styles: Record<string, string> = {
  input: "bs-input-field--input",
  suffix: "bs-input-field--suffix",
  "input-wrapper": "bs-input-field--input-wrapper",
  label: "bs-input-field--label",
  inputSmall: "bs-input-field--inputSmall",
  inputMedium: "bs-input-field--inputMedium",
  inputLarge: "bs-input-field--inputLarge",
  labelSmall: "bs-input-field--labelSmall",
  labelMedium: "bs-input-field--labelMedium",
  labelLarge: "bs-input-field--labelLarge",
  inputWarning: "bs-input-field--inputWarning",
  warningMessage: "bs-input-field--warningMessage",
  inputWrapper: "bs-input-field--inputWrapper",
  prefix: "bs-input-field--prefix",
  prefixSmall: "bs-input-field--prefixSmall",
  prefixMedium: "bs-input-field--prefixMedium",
  prefixLarge: "bs-input-field--prefixLarge",
  suffixSmall: "bs-input-field--suffixSmall",
  suffixMedium: "bs-input-field--suffixMedium",
  suffixLarge: "bs-input-field--suffixLarge",
};

export interface InputFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'prefix' | 'onChange' | 'onBlur'
  > {
  label?: React.ReactNode;
  value?: string | number;
  /** Called with the input's current string value (Ant Design–style value callback). */
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  size?: 'small' | 'medium' | 'large';
  warning?: boolean;
  warningMessage?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  spinner?: boolean;
  showArrows?: boolean;
  icon?: boolean;
  iconName?: IconName;
  disabled?: boolean;
  /** Additional class names for the outer wrapper */
  wrapperClassName?: string;
}

export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  size = 'medium',
  warning = false,
  warningMessage = '',
  prefix,
  suffix,
  spinner = false,
  showArrows = true,
  icon = false,
  iconName = 'search',
  disabled = false,
  min,
  max,
  step = 1,
  className,
  wrapperClassName,
  ...props
}: InputFieldProps) => {
  const currentValue = value === undefined || value === null ? '' : String(value);

  const handleIncrement = () => {
    if (disabled) return;
    let newValue = currentValue === '' ? 0 : Number(currentValue);
    newValue += Number(step);
    if (typeof max !== 'undefined' && newValue > Number(max)) newValue = Number(max);
    onChange(String(newValue));
  };

  const handleDecrement = () => {
    if (disabled) return;
    let newValue = currentValue === '' ? 0 : Number(currentValue);
    newValue -= Number(step);
    if (typeof min !== 'undefined' && newValue < Number(min)) newValue = Number(min);
    onChange(String(newValue));
  };

  const getInputSizeClass = () => {
    if (size === 'small') return styles.inputSmall;
    if (size === 'large') return styles.inputLarge;
    return styles.inputMedium;
  };

  const getLabelSizeClass = () => {
    if (size === 'small') return styles.labelSmall;
    if (size === 'large') return styles.labelLarge;
    return styles.labelMedium;
  };

  const getPrefixSizeClass = () => {
    if (size === 'small') return styles.prefixSmall;
    if (size === 'large') return styles.prefixLarge;
    return styles.prefixMedium;
  };

  const getSuffixSizeClass = () => {
    if (size === 'small') return styles.suffixSmall;
    if (size === 'large') return styles.suffixLarge;
    return styles.suffixMedium;
  };

  const { style: propsStyle, ...restProps } = props;

  return (
    <div
      className={wrapperClassName}
      style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}
    >
      {label && <label className={`${styles.label} ${getLabelSizeClass()}`}>{label}</label>}
      <div className={styles.inputWrapper} style={{ position: 'relative' }}>
        {prefix && <span className={`${styles.prefix} ${getPrefixSizeClass()}`}>{prefix}</span>}
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icon name={iconName} size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={[
            styles.input,
            getInputSizeClass(),
            warning ? styles.inputWarning : '',
            disabled ? 'bs-input-field--inputDisabled' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            ...(icon && { paddingLeft: size === 'small' ? 36 : size === 'large' ? 44 : 40 }),
            ...propsStyle,
          }}
          {...restProps}
        />
        {type === 'number' && showArrows && !disabled && (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              right: 4,
              top: '50%',
              transform: 'translateY(-50%)',
              height: '60%',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <button
              type="button"
              onClick={handleIncrement}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                height: 16,
                width: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              tabIndex={-1}
            >
              <Icon name="chevron-up" size={16} />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                height: 16,
                width: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              tabIndex={-1}
            >
              <Icon name="chevron-down" size={16} />
            </button>
          </span>
        )}
        {spinner ? (
          <span className={`${styles.suffix} ${getSuffixSizeClass()}`}>
            <svg className={styles.spinner} width="20" height="20" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#3AB78F"
                strokeWidth="4"
                strokeDasharray="31.4 31.4"
                transform="rotate(-90 25 25)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </span>
        ) : (
          suffix && <span className={`${styles.suffix} ${getSuffixSizeClass()}`}>{suffix}</span>
        )}
      </div>
      {warning && warningMessage && <span className={styles.warningMessage}>{warningMessage}</span>}
    </div>
  );
};
