import React from 'react';
import { Icon, IconName } from '../../Icons/Icon';
import { ToastVariant } from '../../shared/types';
import './AlertBanner.css';

const styles: Record<string, string> = {
  alertBanner: "bs-alert-banner--alertBanner",
  alertBanner__icon: "bs-alert-banner--alertBanner__icon",
  alertBanner__body: "bs-alert-banner--alertBanner__body",
  alertBanner__title: "bs-alert-banner--alertBanner__title",
  alertBanner__message: "bs-alert-banner--alertBanner__message",
  alertBanner__actions: "bs-alert-banner--alertBanner__actions",
  alertBanner__button: "bs-alert-banner--alertBanner__button",
  alertBanner__dismiss: "bs-alert-banner--alertBanner__dismiss",
  "alertBanner--success": "bs-alert-banner--alertBanner--success",
  "alertBanner--info": "bs-alert-banner--alertBanner--info",
  "alertBanner--warning": "bs-alert-banner--alertBanner--warning",
  "alertBanner--error": "bs-alert-banner--alertBanner--error",
};

const VARIANT_ICON: Record<ToastVariant, string> = {
  success: 'check-circle',
  info: 'info-circle',
  warning: 'alert-octagon',
  error: 'alert-triangle',
};

export interface AlertBannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string;
  message: string;
  variant?: ToastVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  icon?: IconName;
}

export const AlertBanner = ({
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
}: AlertBannerProps) => {
  const variantClass = styles[`alertBanner--${variant}`] || '';
  const iconName: IconName = icon || (VARIANT_ICON[variant] as IconName) || 'info-circle';

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
