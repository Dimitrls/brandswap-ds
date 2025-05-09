import React, { useState } from 'react';
import styles from './TextArea.module.css';
import PropTypes from 'prop-types';
import Icon from '../Icons/Icon';

/**
 * @typedef {Object} TextAreaProps
 * @property {string} label
 * @property {boolean} [showToolbar]
 * @property {boolean} [warning]
 * @property {string} [warningMessage]
 */

const STYLE_OPTIONS = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' },
  { value: 'pre', label: 'Preformatted' },
];

const TOOLBAR_CONTROLS = [
  { type: 'bold', icon: <Icon name="bold" size={16} />, ariaLabel: 'Bold' },
  { type: 'italic', icon: <Icon name="italic" size={16} />, ariaLabel: 'Italic' },
  { type: 'ul', icon: <Icon name="list" size={16} />, ariaLabel: 'Bulleted list' },
  { type: 'ol', icon: <Icon name="list-numbers" size={16} />, ariaLabel: 'Numbered list' },
];

const TextArea = ({ label, showToolbar = false, warning = false, warningMessage = '' }) => {
  const [value, setValue] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [textStyle, setTextStyle] = useState('paragraph');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (e) => {
    setSelection({ start: e.target.selectionStart, end: e.target.selectionEnd });
  };

  // Simple formatting handlers (for demo purposes)
  const handleToolbarClick = (type) => {
    let newValue = value;
    const { start, end } = selection;
    if (type === 'bold') {
      newValue = value.slice(0, start) + '**' + value.slice(start, end) + '**' + value.slice(end);
    } else if (type === 'italic') {
      newValue = value.slice(0, start) + '*' + value.slice(start, end) + '*' + value.slice(end);
    } else if (type === 'ul') {
      newValue = value.slice(0, start) + '\n- ' + value.slice(start, end) + value.slice(end);
    } else if (type === 'ol') {
      newValue = value.slice(0, start) + '\n1. ' + value.slice(start, end) + value.slice(end);
    }
    setValue(newValue);
  };

  const handleStyleChange = (e) => {
    setTextStyle(e.target.value);
    // Optionally, you can add logic here to apply formatting to the selected text
  };

  return (
    <div className={styles['bs-textarea-wrapper']}>
      <label className={styles['bs-textarea-label']}>{label}</label>
      {showToolbar && (
        <div className={styles['bs-textarea-toolbar']}>
          <select
            className={styles['bs-textarea-style-select']}
            value={textStyle}
            onChange={handleStyleChange}
            aria-label="Text style selector"
          >
            {STYLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {TOOLBAR_CONTROLS.map((control) => (
            <button
              key={control.type}
              type="button"
              className={`${styles['bs-textarea-toolbar-btn']} ${styles[`bs-textarea-toolbar-btn--${control.type}`]}`}
              onClick={() => handleToolbarClick(control.type)}
              aria-label={control.ariaLabel}
            >
              {control.icon || control.label}
            </button>
          ))}
        </div>
      )}
      <textarea
        className={`${styles['bs-textarea']}${warning ? ` ${styles['bs-textarea--warning']}` : ''}`}
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        rows={5}
      />
      {warning && warningMessage && (
        <div className={styles['bs-textarea-warning']}>
          <span className={styles['bs-textarea-warning-text']}>{warningMessage}</span>
        </div>
      )}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  showToolbar: PropTypes.bool,
  warning: PropTypes.bool,
  warningMessage: PropTypes.string,
};

export default TextArea; 