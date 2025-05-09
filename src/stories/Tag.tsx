import React from 'react';
import './button.css';
import Icon from '../Icons/Icon';

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

export interface RemovableTagProps extends TagProps {
  onRemove: () => void;
}

export const RemovableTag = ({ label, variant = 'neutral', subtle = false, onRemove }: RemovableTagProps) => {
  const variantClass = `bs-tag--${variant}`;
  const subtleClass = subtle ? 'bs-tag--subtle' : '';
  const removableClass = 'bs-tag--removable';
  return (
    <span className={['bs-tag', variantClass, subtleClass, removableClass].join(' ')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <button
        type="button"
        aria-label="Remove tag"
        onClick={onRemove}
        className="bs-tag__remove-btn"
      >
        <Icon name="close" size={16} />
      </button>
      {label}
    </span>
  );
}; 