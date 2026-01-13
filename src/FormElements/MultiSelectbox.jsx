import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Selectbox.module.css';
import Checkbox from './Checkbox';
import { RemovableTag, Tag } from '../Buttons/Tag';
import Icon from '../Icons/Icon';
/**
 * @typedef {Object} MultiSelectboxProps
 * @property {string[]} options - Array of option strings
 * @property {string[]} selected - Array of selected values
 * @property {function} onChange - Callback when selection changes
 * @property {string} [label] - Optional label
 * @property {string} [placeholder] - Optional placeholder
 * @property {boolean} [inForm] - If true, use in-form wrapper styles
 * @property {boolean} [labelOnTop] - If true, render the label above the select
 * @property {boolean} [labelInside=false] - If true, render label inside the select element
 * @property {boolean} [icon=false] - Whether to show an icon at the beginning
 * @property {string} [iconName='search'] - Name of the icon to display
 * @property {'small' | 'medium' | 'large'} [size='medium'] - Size of the multiselectbox
 */

const MultiSelectbox = ({ options = [], selected = [], onChange, label, placeholder = 'Select...', inForm = false, labelOnTop = false, labelInside = false, icon = false, iconName = 'search', size = 'medium' }) => {
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(selected.length);
  const ref = useRef();
  const tagsContainerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate how many tags can fit
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

      // Reserve space for arrow (32px) and padding
      const arrowWidth = 32;
      const padding = icon 
        ? (size === 'small' ? 36 : size === 'large' ? 44 : 40)
        : (size === 'small' ? 8 : size === 'large' ? 16 : 12);
      const gap = 6;
      const labelWidth = labelInside && label ? 50 : 0;
      const usableWidth = selectRect.width - arrowWidth - padding - labelWidth;

      if (usableWidth <= 0) {
        setVisibleCount(0);
        return;
      }

      // Create a temporary container to measure tag widths
      const measureContainer = document.createElement('div');
      measureContainer.style.position = 'absolute';
      measureContainer.style.visibility = 'hidden';
      measureContainer.style.display = 'flex';
      measureContainer.style.gap = `${gap}px`;
      measureContainer.style.flexWrap = 'nowrap';
      measureContainer.style.width = 'auto';
      document.body.appendChild(measureContainer);

      try {
        // Measure overflow tag width (use a reasonable estimate based on max possible overflow)
        const maxOverflow = selected.length;
        const overflowTagSpan = document.createElement('span');
        overflowTagSpan.className = 'bs-tag bs-tag--neutral';
        overflowTagSpan.textContent = `+${maxOverflow}`;
        overflowTagSpan.style.display = 'inline-block';
        measureContainer.appendChild(overflowTagSpan);
        const overflowTagWidth = overflowTagSpan.offsetWidth;
        overflowTagSpan.remove();

        // Measure each tag
        const tagWidths = [];
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
          
          // Create remove button
          const removeBtn = document.createElement('button');
          removeBtn.className = 'bs-tag__remove-btn';
          removeBtn.style.cssText = 'background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center; width: 16px; height: 16px;';
          
          // Create close icon SVG
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

        // Calculate how many tags fit
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

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      calculateVisibleCount();
    });

    // Also recalculate on resize
    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleCount();
    });
    
    resizeObserver.observe(selectElement);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [selected, size, icon, labelInside, label]);

  const handleToggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleRemove = (option) => {
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
        <span className={`${styles.label} ${getLabelSizeClass()}`} style={{ marginBottom: 4 }}>{label}</span>
      ) : !labelInside && label ? (
        <span className={`${styles.label} ${getLabelSizeClass()}`}>{label}</span>
      ) : null}
      <div className={styles.selectWrapper} style={{ position: 'relative' }}>
        {icon && (
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 1, opacity: 0.6, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
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
            <div ref={tagsContainerRef} style={{ display: 'flex', flexWrap: 'nowrap', gap: 6, overflow: 'hidden', minWidth: 0, flex: 1, alignItems: 'center' }}>
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

MultiSelectbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inForm: PropTypes.bool,
  labelOnTop: PropTypes.bool,
  labelInside: PropTypes.bool,
  icon: PropTypes.bool,
  iconName: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default MultiSelectbox; 