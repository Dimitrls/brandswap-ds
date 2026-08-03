import React, { useRef, useState } from 'react';
import './Uploader.css';

import { Button } from '../../Buttons/Button';

const styles: Record<string, string> = {
  "bs-uploader-wrapper": "bs-uploader--wrapper",
  "bs-uploader-label": "bs-uploader--label",
  "bs-uploader-label--small": "bs-uploader--label--small",
  "bs-uploader-input-row": "bs-uploader--input-row",
  "bs-uploader-input-row--small": "bs-uploader--input-row--small",
  "bs-uploader-button": "bs-uploader--button",
  "bs-uploader-filename": "bs-uploader--filename",
  "bs-uploader-filename--small": "bs-uploader--filename--small",
  "bs-uploader-input": "bs-uploader--input",
};

export interface UploaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: React.ReactNode;
  onChange?: (file: File | undefined) => void;
  size?: 'default' | 'small';
  disabled?: boolean;
}

export const Uploader = ({
  label = 'Upload file',
  onChange,
  size = 'default',
  disabled = false,
  className,
  ...props
}: UploaderProps) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isSmall = size === 'small';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = e.target.files?.[0];
    setFileName(next ? next.name : '');
    onChange?.(next);
  };

  const handleButtonClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const labelClass = [
    styles['bs-uploader-label'],
    isSmall ? styles['bs-uploader-label--small'] : '',
  ]
    .filter(Boolean)
    .join(' ');
  const inputRowClass = [
    styles['bs-uploader-input-row'],
    isSmall ? styles['bs-uploader-input-row--small'] : '',
    disabled ? 'bs-uploader--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const filenameClass = [
    styles['bs-uploader-filename'],
    isSmall ? styles['bs-uploader-filename--small'] : '',
  ]
    .filter(Boolean)
    .join(' ');
  const buttonSize = isSmall ? 'small' : 'medium';

  return (
    <div
      className={[styles['bs-uploader-wrapper'], className].filter(Boolean).join(' ')}
      {...props}
    >
      <label className={labelClass}>{label}</label>
      <div className={inputRowClass}>
        <Button
          variant="outline"
          label="Choose File"
          onClick={handleButtonClick}
          icon="upload"
          size={buttonSize}
          disabled={disabled}
        />
        <span className={filenameClass}>{fileName || 'No file chosen'}</span>
        <input
          ref={inputRef}
          type="file"
          className={styles['bs-uploader-input']}
          onChange={handleFileChange}
          tabIndex={-1}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
