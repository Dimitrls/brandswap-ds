import React, { useState } from 'react';
import './TextArea.css';

import { Icon } from '../../Icons/Icon';

const styles: Record<string, string> = {
  "bs-textarea-wrapper": "bs-textarea--wrapper",
  "bs-textarea-label": "bs-textarea--label",
  "bs-textarea-toolbar": "bs-textarea--toolbar",
  "bs-textarea": "bs-textarea--root",
  "bs-textarea-toolbar-btn": "bs-textarea--toolbar-btn",
  "bs-textarea--warning": "bs-textarea--warning",
  "bs-textarea-warning-text": "bs-textarea--warning-text",
  "bs-textarea-style-select": "bs-textarea--style-select",
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

export interface TextAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  showToolbar?: boolean;
  warning?: boolean;
  warningMessage?: string;
}

export const TextArea = ({
  label,
  showToolbar = false,
  warning = false,
  warningMessage = '',
  className,
  ...props
}: TextAreaProps) => {
  const [value, setValue] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [textStyle, setTextStyle] = useState<string>('paragraph');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelection({ start: target.selectionStart, end: target.selectionEnd });
  };

  const handleToolbarClick = (type: ToolbarControlType) => {
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
