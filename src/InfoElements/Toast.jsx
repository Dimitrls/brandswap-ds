import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icons/Icon';
import styles from './Toast.module.css';

const VARIANT_ICON = {
  success: 'check-circle',
  info: 'info-circle',
  warning: 'alert-triangle',
  error: 'x-circle',
};

const Toast = ({
  title,
  message,
  variant = 'info',
  dismissible = false,
  onDismiss,
  actionLabel,
  onAction,
  icon,
  ...props
}) => {
  const variantClass = styles[`toast--${variant}`] || '';
  const iconName = icon || VARIANT_ICON[variant] || 'info-circle';

  return (
    <div className={[styles.toast, variantClass].filter(Boolean).join(' ')} role="status" {...props}>
      <span className={styles.toast__icon} aria-hidden="true">
        <Icon name={iconName} size={18} />
      </span>
      <div className={styles.toast__body}>
        {title ? <div className={styles.toast__title}>{title}</div> : null}
        {message ? <div className={styles.toast__message}>{message}</div> : null}
        {actionLabel && onAction ? (
          <div className={styles.toast__actions}>
            <button type="button" className={styles.toast__button} onClick={onAction}>
              {actionLabel}
            </button>
          </div>
        ) : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className={styles.toast__dismiss}
        >
          <Icon name="x" size={16} />
        </button>
      ) : null}
    </div>
  );
};

Toast.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  icon: PropTypes.string,
};

export default Toast;

