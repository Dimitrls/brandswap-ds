import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ label, value, onChange, placeholder, type = 'text', ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {label && <label style={{ marginBottom: 4 }}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      {...props}
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default InputField; 