import React, { useState, useRef, useEffect, useId, useMemo } from 'react';
import '../Selectbox/Selectbox.css';

import { Checkbox } from '../Checkbox';
import { RadioButton } from '../RadioButton';
import { RemovableTag, Tag } from '../../Buttons/Tag';
import { Icon, IconName } from '../../Icons/Icon';
import { defaultGetOptionKey, defaultGetOptionLabel } from '../optionHelpers';
import { useVisibleTagCount } from '../useVisibleTagCount';

export { defaultGetOptionKey, defaultGetOptionLabel } from '../optionHelpers';

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

export type SelectOptionVariant = 'default' | 'checkbox' | 'radio';

type SelectSharedProps<T> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> & {
  options: T[];
  /** Resolve the display label for an option (defaults to string / label / name) */
  getOptionLabel?: (option: T) => string;
  /** Resolve a stable key for comparison and React keys */
  getOptionKey?: (option: T, index?: number) => string | number;
  label?: React.ReactNode;
  placeholder?: string;
  inForm?: boolean;
  labelOnTop?: boolean;
  labelInside?: boolean;
  icon?: boolean;
  iconName?: IconName;
  size?: 'small' | 'medium' | 'large';
  optionVariant?: SelectOptionVariant;
  searchable?: boolean;
  searchPlaceholder?: string;
};

export type SelectSingleProps<T = string> = SelectSharedProps<T> & {
  multiple?: false;
  value?: T | null;
  onChange: (value: T | null) => void;
};

export type SelectMultiProps<T = string> = SelectSharedProps<T> & {
  multiple: true;
  value?: T[];
  onChange: (value: T[]) => void;
};

export type SelectProps<T = string> = SelectSingleProps<T> | SelectMultiProps<T>;

function isMulti<T>(props: SelectProps<T>): props is SelectMultiProps<T> {
  return props.multiple === true;
}

function isEmptyValue<T>(value: T | null | undefined): boolean {
  return value == null || value === ('' as unknown as T);
}

/** Multi overload first so `multiple` + `value: T[]` infers T from `options`, not from the array itself. */
export function Select<T = string>(props: SelectMultiProps<T>): React.ReactElement;
export function Select<T = string>(props: SelectSingleProps<T>): React.ReactElement;
export function Select<T = string>(props: SelectProps<T>): React.ReactElement {
  const multiple = isMulti(props);
  const {
    options = [],
    getOptionLabel = defaultGetOptionLabel,
    getOptionKey,
    label,
    placeholder = 'Select...',
    inForm = false,
    labelOnTop = false,
    labelInside = false,
    icon = false,
    iconName = 'search',
    size = 'medium',
    optionVariant = 'default',
    searchable = true,
    searchPlaceholder = 'Search...',
    className,
    value,
    onChange,
    multiple: _multiple,
    ...divProps
  } = props;

  const resolveKey = (option: T, index = 0) =>
    getOptionKey ? getOptionKey(option) : defaultGetOptionKey(option, index);

  const selectedValues: T[] = multiple
    ? ((value as T[] | undefined) ?? [])
    : isEmptyValue(value as T | null | undefined)
      ? []
      : [value as T];

  const selectedKey = selectedValues.map((option, index) => resolveKey(option, index)).join('\0');

  const isSelected = (option: T) =>
    selectedValues.some(
      (selected, index) => resolveKey(selected, index) === resolveKey(option)
    );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const radioGroupName = useId();

  const selectedLabels = useMemo(
    () => selectedValues.map((option) => getOptionLabel(option)),
    // selectedKey tracks value identity; getOptionLabel is typically stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedKey, getOptionLabel]
  );

  const visibleCount = useVisibleTagCount(tagsContainerRef, {
    enabled: multiple && selectedValues.length > 0,
    selectedCount: selectedValues.length,
    selectedKey,
    labels: selectedLabels,
    size,
    icon,
    labelInside,
    label,
  });

  const filteredOptions = searchable
    ? options.filter((option) =>
        getOptionLabel(option).toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const resolvedVariant: SelectOptionVariant =
    optionVariant === 'radio' && multiple ? 'checkbox' : optionVariant;

  const closeDropdown = () => {
    setOpen(false);
    setSearch('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchable) {
      searchInputRef.current?.focus();
    }
  }, [open, searchable]);

  const emitChange = (next: T[]) => {
    if (multiple) {
      (onChange as SelectMultiProps<T>['onChange'])(next);
    } else {
      (onChange as SelectSingleProps<T>['onChange'])(next[0] ?? null);
    }
  };

  const handleSelect = (option: T) => {
    if (multiple) {
      if (isSelected(option)) {
        emitChange(
          selectedValues.filter((item) => resolveKey(item) !== resolveKey(option))
        );
      } else {
        emitChange([...selectedValues, option]);
      }
    } else {
      emitChange([option]);
      closeDropdown();
    }
  };

  const handleRemove = (option: T) => {
    emitChange(selectedValues.filter((item) => resolveKey(item) !== resolveKey(option)));
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

  const displayValue = (() => {
    if (selectedValues.length === 0) {
      return <span className={styles.placeholder}>{placeholder}</span>;
    }

    if (multiple) {
      return (
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
          {selectedValues.slice(0, visibleCount).map((option, index) => (
            <RemovableTag
              key={resolveKey(option, index)}
              label={getOptionLabel(option)}
              onRemove={() => handleRemove(option)}
            />
          ))}
          {visibleCount < selectedValues.length && (
            <Tag label={`+${selectedValues.length - visibleCount}`} variant="neutral" />
          )}
        </div>
      );
    }

    return getOptionLabel(selectedValues[0]);
  })();

  const renderOption = (option: T, index: number) => {
    const optionLabel = getOptionLabel(option);
    const optionKey = resolveKey(option, index);
    const selected = isSelected(option);

    if (resolvedVariant === 'checkbox') {
      return (
        <li
          key={optionKey}
          className={styles.option}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Checkbox
            label={optionLabel}
            checked={selected}
            onChange={() => handleSelect(option)}
            inForm={false}
          />
        </li>
      );
    }

    if (resolvedVariant === 'radio') {
      return (
        <li
          key={optionKey}
          className={styles.option}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <RadioButton
            label={optionLabel}
            checked={selected}
            onChange={() => handleSelect(option)}
            name={radioGroupName}
            value={String(optionKey)}
          />
        </li>
      );
    }

    return (
      <li
        key={optionKey}
        className={[styles.option, selected ? styles.optionSelected : '']
          .filter(Boolean)
          .join(' ')}
        onClick={() => handleSelect(option)}
        role="option"
        aria-selected={selected}
      >
        {optionLabel}
      </li>
    );
  };

  return (
    <div
      className={[wrapperClass, className].filter(Boolean).join(' ')}
      ref={ref}
      {...divProps}
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
          onClick={() => setOpen(!open)}
          tabIndex={0}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
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
          {displayValue}
          <span className={styles.arrow}>
            <Icon name="chevron-down" size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
          </span>
        </div>
      </div>
      {open && (
        <div className={styles.dropdown} role="listbox">
          {searchable && (
            <div
              className={styles.searchBox}
              style={{ position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={styles.searchIcon}>
                <Icon name="search" size={16} />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
            </div>
          )}
          <ul className={styles.dropdownScroll} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {filteredOptions.length === 0 ? (
              <li className={styles.emptyState}>No results</li>
            ) : (
              filteredOptions.map(renderOption)
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
