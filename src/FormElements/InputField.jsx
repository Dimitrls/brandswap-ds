import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputField.module.css';

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  size = 'default',
  warning = false,
  warningMessage = '',
  prefix,
  suffix,
  ...props
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {label && (
      <label
        className={`${styles.label} ${size === 'small' ? styles.labelSmall : ''}`}
      >
        {label}
      </label>
    )}
    <div className={styles.inputWrapper}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${size === 'small' ? styles.inputSmall : ''} ${warning ? styles.inputWarning : ''}`}
        {...props}
      />
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </div>
    {warning && warningMessage && (
      <span className={styles.warningMessage}>{warningMessage}</span>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(['default', 'small']),
  warning: PropTypes.bool,
  warningMessage: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
};

export default InputField; 