import React from 'react';
import { Icon, IconName } from '../../Icons/Icon';
import { ToastVariant } from '../../shared/types';
import styles from './Toast.module.css';

const VARIANT_ICON: Record<ToastVariant, string> = {
  success: 'check-circle',
  info: 'info-circle',
  warning: 'alert-octagon',
  error: 'alert-triangle',
};

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string;
  message: string;
  variant?: ToastVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  icon?: IconName;
}

export const Toast = ({
  title,
  message,
  variant = 'info',
  dismissible = false,
  onDismiss,
  actionLabel,
  onAction,
  icon,
  ...props
}: ToastProps) => {
  const variantClass = styles[`toast--${variant}`] || '';
  const iconName: IconName = icon || (VARIANT_ICON[variant] as IconName) || 'info-circle';

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
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </div>
  );
};
