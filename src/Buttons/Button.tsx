import React from 'react';
import './button.module.css';
import Icon from '../Icons/Icon';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Button visual variant */
  variant?: 'filled' | 'outline' | 'filled-warning' | 'outline-warning' | 'subtle' | 'subtle-warning';
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Icon name to show before label */
  icon?: string;
}

/** Primary UI component for user interaction */
export const Button = ({
  variant = 'filled',
  size = 'medium',
  backgroundColor,
  label,
  icon,
  onClick,
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  const variantClass = `bs-button--${variant}`;
  return (
    <button
      type={type}
      className={['bs-button', `bs-button--${size}`, variantClass, className]
        .filter(Boolean)
        .join(' ')}
      style={{ backgroundColor }}
      onClick={onClick}
      {...props}
    >
      {icon && <Icon name={icon} size={20} />}
      {label}
    </button>
  );
};

