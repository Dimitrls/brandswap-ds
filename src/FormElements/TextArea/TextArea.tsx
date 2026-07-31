import React, { useState } from 'react';
import './TextArea.css';

import { Icon } from '../../Icons/Icon';

const styles: Record<string, string> = {
  'bs-textarea-wrapper': 'bs-textarea--wrapper',
  'bs-textarea-label': 'bs-textarea--label',
  'bs-textarea-toolbar': 'bs-textarea--toolbar',
  'bs-textarea': 'bs-textarea--root',
  'bs-textarea-toolbar-btn': 'bs-textarea--toolbar-btn',
  'bs-textarea--warning': 'bs-textarea--warning',
  'bs-textarea-warning-text': 'bs-textarea--warning-text',
  'bs-textarea-style-select': 'bs-textarea--style-select',
};

const STYLE_OPTIONS = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' },
  { value: 'pre', label: 'Preformatted' },
] as const;

type ToolbarControlType = 'bold' | 'italic' | 'ul' | 'ol';

const TOOLBAR_CONTROLS: Array<{
  type: ToolbarControlType;
  icon: React.ReactNode;
  ariaLabel: string;
}> = [
  { type: 'bold', icon: <Icon name="bold" size={16} />, ariaLabel: 'Bold' },
  { type: 'italic', icon: <Icon name="italic" size={16} />, ariaLabel: 'Italic' },
  { type: 'ul', icon: <Icon name="list" size={16} />, ariaLabel: 'Bulleted list' },
  { type: 'ol', icon: <Icon name="list-numbers" size={16} />, ariaLabel: 'Numbered list' },
];

export interface TextAreaProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'onBlur' | 'defaultValue'
  > {
  label: string;
  value?: string;
  defaultValue?: string;
  /** Called with the textarea's current string value. */
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  showToolbar?: boolean;
  warning?: boolean;
  warningMessage?: string;
}

export const TextArea = ({
  label,
  value,
  defaultValue = '',
  onChange,
  placeholder,
  rows = 5,
  showToolbar = false,
  warning = false,
  warningMessage = '',
  className,
  ...props
}: TextAreaProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [textStyle, setTextStyle] = useState<string>('paragraph');

  const currentValue = isControlled ? value : internalValue;

  const updateValue = (next: string) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateValue(e.target.value);
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelection({ start: target.selectionStart, end: target.selectionEnd });
  };

  const handleToolbarClick = (type: ToolbarControlType) => {
    let newValue = currentValue;
    const { start, end } = selection;
    if (type === 'bold') {
      newValue =
        currentValue.slice(0, start) +
        '**' +
        currentValue.slice(start, end) +
        '**' +
        currentValue.slice(end);
    } else if (type === 'italic') {
      newValue =
        currentValue.slice(0, start) +
        '*' +
        currentValue.slice(start, end) +
        '*' +
        currentValue.slice(end);
    } else if (type === 'ul') {
      newValue =
        currentValue.slice(0, start) + '\n- ' + currentValue.slice(start, end) + currentValue.slice(end);
    } else if (type === 'ol') {
      newValue =
        currentValue.slice(0, start) +
        '\n1. ' +
        currentValue.slice(start, end) +
        currentValue.slice(end);
    }
    updateValue(newValue);
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextStyle(e.target.value);
  };

  return (
    <div
      className={[styles['bs-textarea-wrapper'], className].filter(Boolean).join(' ')}
      {...props}
    >
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
              {control.icon}
            </button>
          ))}
        </div>
      )}
      <textarea
        className={`${styles['bs-textarea']}${warning ? ` ${styles['bs-textarea--warning']}` : ''}`}
        value={currentValue}
        onChange={handleChange}
        onSelect={handleSelect}
        placeholder={placeholder}
        rows={rows}
      />
      {warning && warningMessage && (
        <span className={styles['bs-textarea-warning-text']}>{warningMessage}</span>
      )}
    </div>
  );
};
