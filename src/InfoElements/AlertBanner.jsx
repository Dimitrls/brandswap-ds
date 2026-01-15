import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icons/Icon';
import styles from './AlertBanner.module.css';

const VARIANT_ICON = {
  success: 'check-circle',
  info: 'info-circle',
  warning: 'alert-octagon',
  error: 'alert-triangle',
};

const AlertBanner = ({
  title,
  message,
  variant = 'info',
  dismissible = false,
  onDismiss,
  actionLabel,
  onAction,
  icon,
  className,
  ...props
}) => {
  const variantClass = styles[`alertBanner--${variant}`] || '';
  const iconName = icon || VARIANT_ICON[variant] || 'info-circle';

  return (
    <div 
      className={[styles.alertBanner, variantClass, className].filter(Boolean).join(' ')} 
      role="alert" 
      {...props}
    >
      <span className={styles.alertBanner__icon} aria-hidden="true">
        <Icon name={iconName} size={20} />
      </span>
      <div className={styles.alertBanner__body}>
        {title ? <div className={styles.alertBanner__title}>{title}</div> : null}
        {message ? <div className={styles.alertBanner__message}>{message}</div> : null}
      </div>
      {actionLabel && onAction ? (
        <div className={styles.alertBanner__actions}>
          <button type="button" className={styles.alertBanner__button} onClick={onAction}>
            {actionLabel}
          </button>
        </div>
      ) : null}
      {dismissible && onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className={styles.alertBanner__dismiss}
        >
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </div>
  );
};

AlertBanner.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default AlertBanner;
