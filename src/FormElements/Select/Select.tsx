import React, { useState, useRef, useEffect, useId } from 'react';
import styles from '../Selectbox/Selectbox.module.css';
import { Checkbox } from '../Checkbox';
import { RadioButton } from '../RadioButton';
import { RemovableTag, Tag } from '../../Buttons/Tag';
import { Icon, IconName } from '../../Icons/Icon';

export type SelectOptionVariant = 'default' | 'checkbox' | 'radio';

type SelectSharedProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  options: string[];
  label?: string;
  placeholder?: string;
  inForm?: boolean;
  labelOnTop?: boolean;
  labelInside?: boolean;
  icon?: boolean;
  iconName?: IconName;
  size?: 'small' | 'medium' | 'large';
  /** How options are rendered in the dropdown */
  optionVariant?: SelectOptionVariant;
  /** Show a search input inside the dropdown */
  searchable?: boolean;
  searchPlaceholder?: string;
};

export type SelectSingleProps = SelectSharedProps & {
  multiple?: false;
  value?: string;
  onChange: (value: string) => void;
};

export type SelectMultiProps = SelectSharedProps & {
  multiple: true;
  value?: string[];
  onChange: (value: string[]) => void;
};

export type SelectProps = SelectSingleProps | SelectMultiProps;

function isMulti(props: SelectProps): props is SelectMultiProps {
  return props.multiple === true;
}

export const Select = (props: SelectProps) => {
  const multiple = isMulti(props);
  const {
    options = [],
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

  const selectedValues: string[] = multiple
    ? ((value as string[] | undefined) ?? [])
    : value
      ? [value as string]
      : [];

  const selectedKey = selectedValues.join('\0');

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(selectedValues.length);
  const ref = useRef<HTMLDivElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const radioGroupName = useId();

  const filteredOptions = searchable
    ? options.filter((option) => option.toLowerCase().includes(search.toLowerCase()))
    : options;

  // Radio only makes sense for single select; fall back to checkbox when multi
  const resolvedVariant: SelectOptionVariant =
    optionVariant === 'radio' && multiple ? 'checkbox' : optionVariant;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setSearch('');
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

  useEffect(() => {
    if (!multiple || selectedValues.length === 0) {
      setVisibleCount(selectedValues.length);
      return;
    }

    const selectElement = tagsContainerRef.current?.parentElement;
    if (!selectElement) {
      setVisibleCount(selectedValues.length);
      return;
    }

    const calculateVisibleCount = () => {
      const selectRect = selectElement.getBoundingClientRect();
      if (selectRect.width === 0) {
        setVisibleCount(selectedValues.length);
        return;
      }

      const arrowWidth = 32;
      const padding = icon
        ? size === 'small'
          ? 36
          : size === 'large'
            ? 44
            : 40
        : size === 'small'
          ? 8
          : size === 'large'
            ? 16
            : 12;
      const gap = 6;
      const labelWidth = labelInside && label ? 50 : 0;
      const usableWidth = selectRect.width - arrowWidth - padding - labelWidth;

      if (usableWidth <= 0) {
        setVisibleCount(0);
        return;
      }

      const measureContainer = document.createElement('div');
      measureContainer.style.position = 'absolute';
      measureContainer.style.visibility = 'hidden';
      measureContainer.style.display = 'flex';
      measureContainer.style.gap = `${gap}px`;
      measureContainer.style.flexWrap = 'nowrap';
      measureContainer.style.width = 'auto';
      document.body.appendChild(measureContainer);

      try {
        const overflowTagSpan = document.createElement('span');
        overflowTagSpan.className = 'bs-tag bs-tag--neutral';
        overflowTagSpan.textContent = `+${selectedValues.length}`;
        overflowTagSpan.style.display = 'inline-block';
        measureContainer.appendChild(overflowTagSpan);
        const overflowTagWidth = overflowTagSpan.offsetWidth;
        overflowTagSpan.remove();

        const tagWidths: number[] = [];
        selectedValues.forEach((option) => {
          const tagWrapper = document.createElement('div');
          tagWrapper.style.display = 'inline-flex';
          tagWrapper.style.alignItems = 'center';
          tagWrapper.style.gap = '6px';

          const tagSpan = document.createElement('span');
          tagSpan.className = 'bs-tag bs-tag--neutral bs-tag--removable';
          tagSpan.style.display = 'inline-flex';
          tagSpan.style.alignItems = 'center';
          tagSpan.style.gap = '6px';

          const removeBtn = document.createElement('button');
          removeBtn.className = 'bs-tag__remove-btn';
          removeBtn.style.cssText =
            'background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center; width: 16px; height: 16px;';

          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', '16');
          svg.setAttribute('height', '16');
          svg.setAttribute('viewBox', '0 0 16 16');
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M12 4L4 12M4 4l8 8');
          path.setAttribute('stroke', 'currentColor');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');
          svg.appendChild(path);
          removeBtn.appendChild(svg);

          tagSpan.appendChild(removeBtn);
          tagSpan.appendChild(document.createTextNode(option));
          tagWrapper.appendChild(tagSpan);
          measureContainer.appendChild(tagWrapper);

          tagWidths.push(tagWrapper.offsetWidth);
          tagWrapper.remove();
        });

        let totalWidth = 0;
        let count = 0;
        for (let i = 0; i < tagWidths.length; i++) {
          const tagWidth = tagWidths[i];
          const widthWithOverflow =
            totalWidth + tagWidth + (count > 0 ? gap : 0) + overflowTagWidth + gap;

          if (widthWithOverflow <= usableWidth || count === 0) {
            totalWidth += tagWidth + (count > 0 ? gap : 0);
            count++;
          } else {
            break;
          }
        }

        setVisibleCount(Math.min(count, selectedValues.length));
      } finally {
        document.body.removeChild(measureContainer);
      }
    };

    const rafId = requestAnimationFrame(() => {
      calculateVisibleCount();
    });

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleCount();
    });

    resizeObserver.observe(selectElement);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
    // selectedKey tracks value changes without depending on a new array each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey, size, icon, labelInside, label, multiple]);

  const emitChange = (next: string[]) => {
    if (multiple) {
      (onChange as (value: string[]) => void)(next);
    } else {
      (onChange as (value: string) => void)(next[0] ?? '');
    }
  };

  const handleSelect = (option: string) => {
    if (multiple) {
      if (selectedValues.includes(option)) {
        emitChange(selectedValues.filter((item) => item !== option));
      } else {
        emitChange([...selectedValues, option]);
      }
    } else {
      emitChange([option]);
      setOpen(false);
      setSearch('');
    }
  };

  const handleRemove = (option: string) => {
    emitChange(selectedValues.filter((item) => item !== option));
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
          {selectedValues.slice(0, visibleCount).map((option) => (
            <RemovableTag key={option} label={option} onRemove={() => handleRemove(option)} />
          ))}
          {visibleCount < selectedValues.length && (
            <Tag label={`+${selectedValues.length - visibleCount}`} variant="neutral" />
          )}
        </div>
      );
    }

    return selectedValues[0];
  })();

  const renderOption = (option: string) => {
    const isSelected = selectedValues.includes(option);

    if (resolvedVariant === 'checkbox') {
      return (
        <li key={option} className={styles.option} style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            label={option}
            checked={isSelected}
            onChange={() => handleSelect(option)}
            inForm={false}
          />
        </li>
      );
    }

    if (resolvedVariant === 'radio') {
      return (
        <li key={option} className={styles.option} style={{ display: 'flex', alignItems: 'center' }}>
          <RadioButton
            label={option}
            checked={isSelected}
            onChange={() => handleSelect(option)}
            name={radioGroupName}
            value={option}
          />
        </li>
      );
    }

    return (
      <li
        key={option}
        className={[styles.option, isSelected ? styles.optionSelected : '']
          .filter(Boolean)
          .join(' ')}
        onClick={() => handleSelect(option)}
        role="option"
        aria-selected={isSelected}
      >
        {option}
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
            <span className="labelInside" style={{ color: 'var(--text-muted)', marginRight: '6px' }}>
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
};
