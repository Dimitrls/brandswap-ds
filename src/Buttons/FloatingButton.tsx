import React from 'react';
import Icon from '../Icons/Icon';
import './button.css';

export interface FloatingButtonProps {
  icon: string;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  variant?: 'filled' | 'outline';
  sizeVariant?: 'default' | 'large';
  style?: React.CSSProperties;
}

export const FloatingButton = ({
  icon,
  size = 24,
  ariaLabel,
  onClick,
  variant = 'filled',
  sizeVariant = 'default',
  style,
  ...props
}: FloatingButtonProps) => {
  const variantClass = `bs-button--${variant}`;
  const sizeClass = sizeVariant === 'large' ? 'bs-floating-button--large' : '';
  return (
    <button
      type="button"
      className={['bs-button', 'bs-floating-button', sizeClass, variantClass].join(' ').trim()}
      aria-label={ariaLabel}
      onClick={onClick}
      style={style}
      {...props}
    >
      <Icon name={icon} size={sizeVariant === 'large' && size === 24 ? 28 : size} />
    </button>
  );
};

