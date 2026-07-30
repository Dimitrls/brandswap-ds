import React from 'react';
import '../shared/button-base.css';
import { Icon } from '../../Icons/Icon';
import type { IconName } from '../../Icons/Icon';
import type { ButtonVariant, SizeVariant } from '../../shared/types';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  backgroundColor?: string;
  size?: SizeVariant;
  label: string;
  onClick?: () => void;
  icon?: IconName;
}

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
