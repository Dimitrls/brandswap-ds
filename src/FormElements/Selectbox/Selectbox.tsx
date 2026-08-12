import React, { useState, useRef, useEffect } from 'react';
import './Selectbox.css';

import { Icon, IconName } from '../../Icons/Icon';
import { defaultGetOptionKey, defaultGetOptionLabel } from '../optionHelpers';

const styles: Record<string, string> = {
  wrapper: 'bs-selectbox--wrapper',
  label: 'bs-selectbox--label',
  labelSmall: 'bs-selectbox--labelSmall',
  labelMedium: 'bs-selectbox--labelMedium',
  labelLarge: 'bs-selectbox--labelLarge',
  selectWrapper: 'bs-selectbox--selectWrapper',
  select: 'bs-selectbox--select',
  selectSmall: 'bs-selectbox--selectSmall',
  selectMedium: 'bs-selectbox--selectMedium',
  selectLarge: 'bs-selectbox--selectLarge',
  arrow: 'bs-selectbox--arrow',
  dropdown: 'bs-selectbox--dropdown',
  option: 'bs-selectbox--option',
  placeholder: 'bs-selectbox--placeholder',
  wrapperInForm: 'bs-selectbox--wrapperInForm',
  labelOnTopWrapper: 'bs-selectbox--labelOnTopWrapper',
  searchBox: 'bs-selectbox--searchBox',
  searchInput: 'bs-selectbox--searchInput',
  searchIcon: 'bs-selectbox--searchIcon',
  emptyState: 'bs-selectbox--emptyState',
  optionSelected: 'bs-selectbox--optionSelected',
  dropdownScroll: 'bs-selectbox--dropdownScroll',
};

export interface SelectboxProps<T = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: React.ReactNode;
  options: T[];
  value?: T | null;
  onChange?: (option: T) => void;
  getOptionLabel?: (option: T) => string;
  getOptionKey?: (option: T, index?: number) => string | number;
  size?: 'small' | 'medium' | 'large';
  icon?: boolean;
  iconName?: IconName;
  labelInside?: boolean;
  disabled?: boolean;
  dropdownMaxHeight?: number;
}

export function Selectbox<T = string>({
  label,
  options = [],
  value,
  onChange,
  getOptionLabel = defaultGetOptionLabel,
  getOptionKey = defaultGetOptionKey,
  size = 'medium',
  icon = false,
  iconName = 'search',
  labelInside = false,
  disabled = false,
  dropdownMaxHeight,
  className,
  ...props
}: SelectboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<T | null>(options[0] ?? null);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internalSelected;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: T) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalSelected(option);
    }
    setOpen(false);
    onChange?.(option);
  };

  const getSelectSizeClass = () => {
    if (size === 'small') return styles.selectSmall;
    if (size === 'large') return styles.selectLarge;
    return styles.selectMedium;
  };

  const getLabelSizeClass = () => {
    if (size === 'small') return styles.labelSmall;
    if (size === 'large') return styles.labelLarge;
    return styles.labelMedium;
  };

  return (
    <div
      className={[styles.wrapper, disabled ? 'bs-selectbox--disabled' : '', className]
        .filter(Boolean)
        .join(' ')}
      ref={ref}
      {...props}
    >
      {label && !labelInside && (
        <label className={`${styles.label} ${getLabelSizeClass()}`}>{label}</label>
      )}
      <div className={styles.selectWrapper} style={{ position: 'relative' }}>
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icon name={iconName} size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        )}
        <div
          className={`${styles.select} ${getSelectSizeClass()}`}
          onClick={() => {
            if (!disabled) setOpen(!open);
          }}
          aria-disabled={disabled || undefined}
          style={{
            ...(icon && { paddingLeft: size === 'small' ? 36 : size === 'large' ? 44 : 40 }),
          }}
        >
          {labelInside && label && (
            <span
              className="bs-selectbox--labelInside"
              style={{ color: 'var(--text-muted)', marginRight: '6px' }}
            >
              {label}:
            </span>
          )}
          {selected != null ? getOptionLabel(selected) : ''}
          <span className={styles.arrow}>
            <Icon name="chevron-down" size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        </div>
      </div>
      {open && !disabled && (
        <ul
          className={styles.dropdown}
          style={
            dropdownMaxHeight != null
              ? { maxHeight: dropdownMaxHeight, overflow: 'auto' }
              : undefined
          }
        >
          {options.length === 0 ? (
            <li className={styles.emptyState}>No data</li>
          ) : (
            options.map((option, idx) => (
              <li
                key={getOptionKey(option, idx)}
                className={styles.option}
                onClick={() => handleSelect(option)}
              >
                {getOptionLabel(option)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
