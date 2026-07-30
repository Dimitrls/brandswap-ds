import React, { useState, useCallback } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  children: React.ReactNode;
}

export const Tooltip = ({
  content,
  placement = 'top',
  delay = 100,
  children,
  ...props
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const show = useCallback(() => {
    const id = window.setTimeout(() => setVisible(true), delay);
    setTimeoutId(id);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    setVisible(false);
  }, [timeoutId]);

  return (
    <span
      className={[styles.tooltip, styles[`tooltip--${placement}`]].join(' ')}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...props}
    >
      {children}
      <span className={styles.tooltip__bubble} data-visible={visible}>
        {content}
      </span>
    </span>
  );
};
