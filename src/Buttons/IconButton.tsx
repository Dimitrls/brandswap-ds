import React from 'react';
import Icon from '../Icons/Icon';
import './button.css';

export interface IconButtonProps {
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
      className={['bs-button', 'bs-icon-button', sizeClass, variantClass].join(' ')}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
};

