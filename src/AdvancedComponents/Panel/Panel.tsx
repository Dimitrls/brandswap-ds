import React from 'react';
import './Panel.css';

const styles: Record<string, string> = {
  panel: "bs-panel--panel",
  panel__header: "bs-panel--panel__header",
  panel__headerContent: "bs-panel--panel__headerContent",
  panel__icon: "bs-panel--panel__icon",
  panel__title: "bs-panel--panel__title",
  panel__description: "bs-panel--panel__description",
  panel__body: "bs-panel--panel__body",
  panel__footer: "bs-panel--panel__footer",
};

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export const Panel = ({
  children,
  title,
  footer,
  icon,
  description,
  className,
  ...props
}: PanelProps) => {
  return (
    <div className={[styles.panel, className].filter(Boolean).join(' ')} {...props}>
      {(title || icon || description) && (
        <div className={styles.panel__header}>
          <div className={styles.panel__headerContent}>
            {icon && <span className={styles.panel__icon}>{icon}</span>}
            {title && <div className={styles.panel__title}>{title}</div>}
          </div>
          {description && <div className={styles.panel__description}>{description}</div>}
        </div>
      )}
      <div className={styles.panel__body}>{children}</div>
      {footer && <div className={styles.panel__footer}>{footer}</div>}
    </div>
  );
};
