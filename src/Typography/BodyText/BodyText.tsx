import React from 'react';
import './BodyText.css';

const styles: Record<string, string> = {
  body: "bs-body-text--body",
  bodyLarge: "bs-body-text--bodyLarge",
  bodySmall: "bs-body-text--bodySmall",
  bodyLight: "bs-body-text--bodyLight",
  bodyLargeLight: "bs-body-text--bodyLargeLight",
  bodySmallLight: "bs-body-text--bodySmallLight",
};

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
