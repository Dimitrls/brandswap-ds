import React, { useState, useRef, useEffect, useMemo } from 'react';
import '../Selectbox/Selectbox.css';

import { Checkbox } from '../Checkbox';
import { RemovableTag, Tag } from '../../Buttons/Tag';
import { Icon, IconName } from '../../Icons/Icon';
import { defaultGetOptionKey, defaultGetOptionLabel } from '../optionHelpers';
import { useVisibleTagCount } from '../useVisibleTagCount';

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

export interface MultiSelectboxProps<T = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: T[];
  selected?: T[];
  onChange: (selected: T[]) => void;
  getOptionLabel?: (option: T) => string;
  getOptionKey?: (option: T, index?: number) => string | number;
  label?: React.ReactNode;
  placeholder?: string;
  inForm?: boolean;
  labelOnTop?: boolean;
  labelInside?: boolean;
  icon?: boolean;
  iconName?: IconName;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export function MultiSelectbox<T = string>({
  options = [],
  selected = [],
  onChange,
  getOptionLabel = defaultGetOptionLabel,
  getOptionKey = defaultGetOptionKey,
  label,
  placeholder = 'Select...',
  inForm = false,
  labelOnTop = false,
  labelInside = false,
  icon = false,
  iconName = 'search',
  size = 'medium',
  disabled = false,
  className,
  ...props
}: MultiSelectboxProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  const resolveKey = (option: T, index = 0) => getOptionKey(option, index);
  const isSelected = (option: T) =>
    selected.some((item, index) => resolveKey(item, index) === resolveKey(option));

  const selectedKey = selected.map((option, index) => resolveKey(option, index)).join('\0');
  const selectedLabels = useMemo(
    () => selected.map((option) => getOptionLabel(option)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedKey, getOptionLabel]
  );

  const visibleCount = useVisibleTagCount(tagsContainerRef, {
    enabled: selected.length > 0,
    selectedCount: selected.length,
    selectedKey,
    labels: selectedLabels,
    size,
    icon,
    labelInside,
    label,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (option: T) => {
    if (disabled) return;
    if (isSelected(option)) {
      onChange(selected.filter((item) => resolveKey(item) !== resolveKey(option)));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleRemove = (option: T) => {
    if (disabled) return;
    onChange(selected.filter((item) => resolveKey(item) !== resolveKey(option)));
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

  let wrapperClass = styles.wrapper;
  if (labelOnTop) {
    wrapperClass = styles.labelOnTopWrapper;
  } else if (inForm) {
    wrapperClass = styles.wrapperInForm;
  }

  return (
    <div
      className={[wrapperClass, disabled ? 'bs-selectbox--disabled' : '', className]
        .filter(Boolean)
        .join(' ')}
      ref={ref}
      {...props}
    >
      {!labelInside && labelOnTop ? (
        <span className={`${styles.label} ${getLabelSizeClass()}`} style={{ marginBottom: 4 }}>
          {label}
        </span>
      ) : !labelInside && label ? (
        <span className={`${styles.label} ${getLabelSizeClass()}`}>{label}</span>
      ) : null}
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
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          style={{
            ...(icon && { paddingLeft: size === 'small' ? 36 : size === 'large' ? 44 : 40 }),
          }}
        >
          {labelInside && label && (
            <span className="bs-selectbox--labelInside" style={{ color: 'var(--text-muted)', marginRight: '6px' }}>
              {label}:
            </span>
          )}
          {selected.length === 0 ? (
            <span className={styles.placeholder}>{placeholder}</span>
          ) : (
            <div
              ref={tagsContainerRef}
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: 6,
                overflow: 'hidden',
                minWidth: 0,
                flex: 1,
                alignItems: 'center',
              }}
            >
              {selected.slice(0, visibleCount).map((option, index) => (
                <RemovableTag
                  key={resolveKey(option, index)}
                  label={getOptionLabel(option)}
                  onRemove={() => handleRemove(option)}
                />
              ))}
              {visibleCount < selected.length && (
                <Tag label={`+${selected.length - visibleCount}`} variant="neutral" />
              )}
            </div>
          )}
          <span className={styles.arrow}>
            <Icon name="chevron-down" size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        </div>
      </div>
      {open && !disabled && (
        <ul className={styles.dropdown} style={{ maxHeight: 220, overflowY: 'auto' }}>
          {options.length === 0 ? (
            <li className={styles.emptyState}>No data</li>
          ) : (
            options.map((option, idx) => (
              <li
                key={resolveKey(option, idx)}
                className={styles.option}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Checkbox
                  label={getOptionLabel(option)}
                  checked={isSelected(option)}
                  onChange={() => handleToggle(option)}
                  inForm={false}
                  disabled={disabled}
                />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
