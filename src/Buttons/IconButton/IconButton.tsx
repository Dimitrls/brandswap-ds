import React from 'react';
import '../shared/button-base.css';
import { Icon } from '../../Icons/Icon';
import type { IconName } from '../../Icons/Icon';
import type { IconButtonVariant, SizeVariant } from '../../shared/types';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: IconName;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  variant?: IconButtonVariant;
  sizeVariant?: SizeVariant;
}

export const IconButton = ({
  icon,
  size,
  ariaLabel,
  onClick,
  variant = 'filled',
  sizeVariant = 'medium',
  className,
  ...props
}: IconButtonProps) => {
  const variantClass = `bs-button--${variant}`;
  const sizeClass =
    sizeVariant === 'small'
      ? 'bs-icon-button--small'
      : sizeVariant === 'large'
        ? 'bs-icon-button--large'
        : '';
  const iconSize = size || (sizeVariant === 'small' ? 16 : sizeVariant === 'large' ? 24 : 20);
  return (
    <button
      type="button"
      className={['bs-button', 'bs-icon-button', className, sizeClass, variantClass]
        .filter(Boolean)
        .join(' ')}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
};
