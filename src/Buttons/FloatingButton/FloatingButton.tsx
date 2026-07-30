import React from 'react';
import '../shared/button-base.css';
import { Icon } from '../../Icons/Icon';
import type { IconName } from '../../Icons/Icon';
import type { FloatingButtonVariant } from '../../shared/types';

export interface FloatingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: IconName;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  variant?: FloatingButtonVariant;
  sizeVariant?: 'default' | 'large';
}

export const FloatingButton = ({
  icon,
  size = 24,
  ariaLabel,
  onClick,
  variant = 'filled',
  sizeVariant = 'default',
  style,
  className,
  ...props
}: FloatingButtonProps) => {
  const variantClass = `bs-button--${variant}`;
  const sizeClass = sizeVariant === 'large' ? 'bs-floating-button--large' : '';
  return (
    <button
      type="button"
      className={['bs-button', 'bs-floating-button', className, sizeClass, variantClass]
        .filter(Boolean)
        .join(' ')}
      aria-label={ariaLabel}
      onClick={onClick}
      style={style}
      {...props}
    >
      <Icon name={icon} size={sizeVariant === 'large' && size === 24 ? 28 : size} />
    </button>
  );
};
