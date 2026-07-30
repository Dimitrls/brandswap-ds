import React from 'react';
import { Icon, IconName } from '../../Icons/Icon';
import { ToastVariant } from '../../shared/types';
import './Toast.css';

const styles: Record<string, string> = {
  toast: "bs-toast--toast",
  toast__icon: "bs-toast--toast__icon",
  toast__body: "bs-toast--toast__body",
  toast__title: "bs-toast--toast__title",
  toast__message: "bs-toast--toast__message",
  toast__actions: "bs-toast--toast__actions",
  toast__button: "bs-toast--toast__button",
  toast__dismiss: "bs-toast--toast__dismiss",
  "toast--success": "bs-toast--toast--success",
  "toast--info": "bs-toast--toast--info",
  "toast--warning": "bs-toast--toast--warning",
  "toast--error": "bs-toast--toast--error",
};

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
