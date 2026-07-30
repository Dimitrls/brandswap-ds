import React, { useState, useRef, useEffect } from 'react';
import './Selectbox.css';

import { Icon, IconName } from '../../Icons/Icon';

const styles: Record<string, string> = {
  wrapper: "bs-selectbox--wrapper",
  label: "bs-selectbox--label",
  labelSmall: "bs-selectbox--labelSmall",
  labelMedium: "bs-selectbox--labelMedium",
  labelLarge: "bs-selectbox--labelLarge",
  selectWrapper: "bs-selectbox--selectWrapper",
  select: "bs-selectbox--select",
  selectSmall: "bs-selectbox--selectSmall",
  selectMedium: "bs-selectbox--selectMedium",
  selectLarge: "bs-selectbox--selectLarge",
  arrow: "bs-selectbox--arrow",
  dropdown: "bs-selectbox--dropdown",
  option: "bs-selectbox--option",
  placeholder: "bs-selectbox--placeholder",
  wrapperInForm: "bs-selectbox--wrapperInForm",
  labelOnTopWrapper: "bs-selectbox--labelOnTopWrapper",
  searchBox: "bs-selectbox--searchBox",
  searchInput: "bs-selectbox--searchInput",
  searchIcon: "bs-selectbox--searchIcon",
  emptyState: "bs-selectbox--emptyState",
  optionSelected: "bs-selectbox--optionSelected",
  dropdownScroll: "bs-selectbox--dropdownScroll",
};

export interface SelectboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: string;
  options: string[];
  onChange?: (option: string) => void;
  size?: 'small' | 'medium' | 'large';
  icon?: boolean;
  iconName?: IconName;
  labelInside?: boolean;
}

export const Selectbox = ({
  label,
  options = [],
  onChange,
  size = 'medium',
  icon = false,
  iconName = 'search',
  labelInside = false,
  className,
  ...props
}: SelectboxProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0] || '');
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

  const handleSelect = (option: string) => {
    setSelected(option);
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
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')} ref={ref} {...props}>
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
          onClick={() => setOpen(!open)}
          style={{
            ...(icon && { paddingLeft: size === 'small' ? 36 : size === 'large' ? 44 : 40 }),
          }}
        >
          {labelInside && label && (
            <span className="bs-selectbox--labelInside" style={{ color: 'var(--text-muted)', marginRight: '6px' }}>
              {label}:
            </span>
          )}
          {selected}
          <span className={styles.arrow}>
            <Icon name="chevron-down" size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        </div>
      </div>
      {open && (
        <ul className={styles.dropdown}>
          {options.map((option, idx) => (
            <li key={idx} className={styles.option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
