import React from 'react';
import styles from './BodyText.module.css';

export type BodyTextVariant =
  | 'default'
  | 'large'
  | 'small'
  | 'light'
  | 'largeLight'
  | 'smallLight';

const variantClass: Record<BodyTextVariant, string> = {
  default: styles.body,
  large: styles.bodyLarge,
  small: styles.bodySmall,
  light: styles.bodyLight,
  largeLight: styles.bodyLargeLight,
  smallLight: styles.bodySmallLight,
};

export interface BodyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: BodyTextVariant;
  children: React.ReactNode;
}

export const BodyText = ({ variant = 'default', children, ...props }: BodyTextProps) => (
  <p className={variantClass[variant]} {...props}>
    {children}
  </p>
);
