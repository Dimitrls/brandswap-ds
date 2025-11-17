import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputField.module.css';
import Icon from '../Icons/Icon';

const InputField = ({
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
  min,
  max,
  step = 1,
  ...props
}) => {
  // Only for number input: handle increment/decrement
  const handleIncrement = () => {
    let newValue = (value === '' || value === undefined) ? 0 : Number(value);
    newValue += Number(step);
    if (typeof max !== 'undefined' && newValue > max) newValue = max;
    onChange({ target: { value: newValue } });
  };
  const handleDecrement = () => {
    let newValue = (value === '' || value === undefined) ? 0 : Number(value);
    newValue -= Number(step);
    if (typeof min !== 'undefined' && newValue < min) newValue = min;
    onChange({ target: { value: newValue } });
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
      {label && (
        <label
          className={`${styles.label} ${getLabelSizeClass()}`}
        >
          {label}
        </label>
      )}
      <div className={styles.inputWrapper} style={{ position: 'relative' }}>
        {prefix && <span className={`${styles.prefix} ${getPrefixSizeClass()}`}>{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={[
            styles.input,
            getInputSizeClass(),
            warning ? styles.inputWarning : '',
          ].join(' ')}
          {...props}
        />
        {/* Custom arrows for number input */}
        {type === 'number' && showArrows && (
          <span style={{ display: 'flex', flexDirection: 'column', position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', height: '60%', justifyContent: 'center', zIndex: 2 }}>
            <button type="button" onClick={handleIncrement} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', height: 16, width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} tabIndex={-1}>
              <Icon name="chevron-up" size={16} />
            </button>
            <button type="button" onClick={handleDecrement} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', height: 16, width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} tabIndex={-1}>
              <Icon name="chevron-down" size={16} />
            </button>
          </span>
        )}
        {spinner ? (
          <span className={`${styles.suffix} ${getSuffixSizeClass()}`}>
            <svg className={styles.spinner} width="20" height="20" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="#3AB78F" strokeWidth="4" strokeDasharray="31.4 31.4" transform="rotate(-90 25 25)"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/></circle></svg>
          </span>
        ) : (
          suffix && <span className={`${styles.suffix} ${getSuffixSizeClass()}`}>{suffix}</span>
        )}
      </div>
      {warning && warningMessage && (
        <span className={styles.warningMessage}>{warningMessage}</span>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  warning: PropTypes.bool,
  warningMessage: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  spinner: PropTypes.bool,
  showArrows: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

export default InputField; 