import React from 'react';
import './button.css';

export interface TagProps {
  label: string;
  variant?: 'neutral' | 'positive' | 'negative' | 'accent1' | 'accent2';
  subtle?: boolean;
}

export const Tag = ({ label, variant = 'neutral', subtle = false }: TagProps) => {
  const variantClass = `bs-tag--${variant}`;
  const subtleClass = subtle ? 'bs-tag--subtle' : '';
  return (
    <span className={['bs-tag', variantClass, subtleClass].join(' ')}>
      {label}
    </span>
  );
}; 