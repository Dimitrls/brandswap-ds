import React, { useState, useRef, useEffect } from 'react';
import styles from '../Selectbox/Selectbox.module.css';
import { Checkbox } from '../Checkbox';
import { RemovableTag, Tag } from '../../Buttons/Tag';
import { Icon, IconName } from '../../Icons/Icon';

export interface MultiSelectboxProps {
  options: string[];
  selected?: string[];
  onChange: (selected: string[]) => void;
  label?: string;
  placeholder?: string;
  inForm?: boolean;
  labelOnTop?: boolean;
  labelInside?: boolean;
  icon?: boolean;
  iconName?: IconName;
  size?: 'small' | 'medium' | 'large';
}

export const MultiSelectbox = ({
  options = [],
  selected = [],
  onChange,
  label,
  placeholder = 'Select...',
  inForm = false,
  labelOnTop = false,
  labelInside = false,
  icon = false,
  iconName = 'search',
  size = 'medium',
}: MultiSelectboxProps) => {
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(selected.length);
  const ref = useRef<HTMLDivElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selected.length === 0) {
      setVisibleCount(0);
      return;
    }

    const selectElement = tagsContainerRef.current?.parentElement;
    if (!selectElement) {
      setVisibleCount(selected.length);
      return;
    }

    const calculateVisibleCount = () => {
      const selectRect = selectElement.getBoundingClientRect();
      if (selectRect.width === 0) {
        setVisibleCount(selected.length);
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
        const maxOverflow = selected.length;
        const overflowTagSpan = document.createElement('span');
        overflowTagSpan.className = 'bs-tag bs-tag--neutral';
        overflowTagSpan.textContent = `+${maxOverflow}`;
        overflowTagSpan.style.display = 'inline-block';
        measureContainer.appendChild(overflowTagSpan);
        const overflowTagWidth = overflowTagSpan.offsetWidth;
        overflowTagSpan.remove();

        const tagWidths: number[] = [];
        selected.forEach((option) => {
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
          const widthWithOverflow = totalWidth + tagWidth + (count > 0 ? gap : 0) + overflowTagWidth + gap;

          if (widthWithOverflow <= usableWidth || count === 0) {
            totalWidth += tagWidth + (count > 0 ? gap : 0);
            count++;
          } else {
            break;
          }
        }

        setVisibleCount(Math.min(count, selected.length));
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
  }, [selected, size, icon, labelInside, label]);

  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleRemove = (option: string) => {
    onChange(selected.filter((item) => item !== option));
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
    <div className={wrapperClass} ref={ref}>
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
          style={{
            ...(icon && { paddingLeft: size === 'small' ? 36 : size === 'large' ? 44 : 40 }),
          }}
        >
          {labelInside && label && (
            <span className="labelInside" style={{ color: 'var(--text-muted)', marginRight: '6px' }}>
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
              {selected.slice(0, visibleCount).map((option) => (
                <RemovableTag key={option} label={option} onRemove={() => handleRemove(option)} />
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
      {open && (
        <ul className={styles.dropdown} style={{ maxHeight: 220, overflowY: 'auto' }}>
          {options.map((option, idx) => (
            <li key={idx} className={styles.option} style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                label={option}
                checked={selected.includes(option)}
                onChange={() => handleToggle(option)}
                inForm={false}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
