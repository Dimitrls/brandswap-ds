import React, { useRef, useState } from 'react';
import styles from './Uploader.module.css';
import { Button } from '../stories/Button';

/**
 * @typedef {Object} UploaderProps
 * @property {string} label
 * @property {function} [onChange]
 */

const Uploader = ({ label = 'Upload file', onChange }) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : '');
    if (onChange) onChange(file);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className={styles['bs-uploader-wrapper']}>
      <label className={styles['bs-uploader-label']}>{label}</label>
      <div className={styles['bs-uploader-input-row']}>
        <Button
          variant="outline"
          label="Choose File"
          onClick={handleButtonClick}
          icon="upload"
        />
        <span className={styles['bs-uploader-filename']}>
          {fileName || 'No file chosen'}
        </span>
        <input
          ref={inputRef}
          type="file"
          className={styles['bs-uploader-input']}
          onChange={handleFileChange}
          tabIndex={-1}
        />
      </div>
    </div>
  );
};

export default Uploader; 