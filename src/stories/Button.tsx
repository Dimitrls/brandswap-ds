import React from 'react';

import './button.css';

export interface ButtonProps {
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
}

/** Primary UI component for user interaction */
export const Button = ({
  variant = 'filled',
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const variantClass = `bs-button--${variant}`;
  return (
    <button
      type="button"
      className={['bs-button', `bs-button--${size}`, variantClass].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
