import React from 'react';
import Icon from '../Icons/Icon';
import './button.module.css';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: string;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  variant?: 'filled' | 'outline' | 'subtle' | 'warning' | 'subtle-warning' | 'filled-warning' | 'outline-warning';
  sizeVariant?: 'small' | 'medium' | 'large';
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
      className={['bs-button', 'bs-icon-button', className, sizeClass, variantClass].join(' ')}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
};

