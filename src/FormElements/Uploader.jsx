import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Uploader.module.css';
import { Button } from '../Buttons/Button';

/**
 * @typedef {Object} UploaderProps
 * @property {string} label
 * @property {function} [onChange]
 */

const Uploader = ({ label = 'Upload file', onChange, size = 'default' }) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef();
  const isSmall = size === 'small';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : '');
    if (onChange) onChange(file);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const wrapperClass = styles['bs-uploader-wrapper'];
  const labelClass = [
    styles['bs-uploader-label'],
    isSmall ? styles['bs-uploader-label--small'] : '',
  ]
    .filter(Boolean)
    .join(' ');
  const inputRowClass = [
    styles['bs-uploader-input-row'],
    isSmall ? styles['bs-uploader-input-row--small'] : '',
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
    <div className={styles['bs-uploader-wrapper']}>
      <label className={labelClass}>{label}</label>
      <div className={inputRowClass}>
        <Button
          variant="outline"
          label="Choose File"
          onClick={handleButtonClick}
          icon="upload"
          size={buttonSize}
        />
        <span className={filenameClass}>
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

Uploader.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['default', 'small']),
};

export default Uploader;