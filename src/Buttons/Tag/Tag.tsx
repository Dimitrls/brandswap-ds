import React from 'react';
import '../shared/button-base.css';
import { Icon } from '../../Icons/Icon';
import type { TagVariant } from '../../shared/types';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: TagVariant;
  subtle?: boolean;
}

export const Tag = ({
  label,
  variant = 'neutral',
  subtle = false,
  className,
  ...props
}: TagProps) => {
  const variantClass = `bs-tag--${variant}`;
  const subtleClass = subtle ? 'bs-tag--subtle' : '';
  return (
    <span className={['bs-tag', variantClass, subtleClass, className].filter(Boolean).join(' ')} {...props}>
      {label}
    </span>
  );
};

export interface RemovableTagProps extends TagProps {
  onRemove: () => void;
}

export const RemovableTag = ({
  label,
  variant = 'neutral',
  subtle = false,
  onRemove,
  className,
  style,
  ...props
}: RemovableTagProps) => {
  const variantClass = `bs-tag--${variant}`;
  const subtleClass = subtle ? 'bs-tag--subtle' : '';
  const removableClass = 'bs-tag--removable';
  return (
    <span
      className={['bs-tag', variantClass, subtleClass, removableClass, className].filter(Boolean).join(' ')}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}
      {...props}
    >
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
