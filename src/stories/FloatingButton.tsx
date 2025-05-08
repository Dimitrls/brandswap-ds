import React from 'react';
import Icon from '../Icons/Icon';
import './button.css';

export interface FloatingButtonProps {
  icon: string;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  variant?: 'filled' | 'outline';
  style?: React.CSSProperties;
}

export const FloatingButton = ({
  icon,
  size = 24,
  ariaLabel,
  onClick,
  variant = 'filled',
  style,
  ...props
}: FloatingButtonProps) => {
  const variantClass = `bs-button--${variant}`;
  return (
    <button
      type="button"
      className={['bs-button', 'bs-floating-button', variantClass].join(' ')}
      aria-label={ariaLabel}
      onClick={onClick}
      style={style}
      {...props}
    >
      <Icon name={icon} size={size} />
    </button>
  );
}; 