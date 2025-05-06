import React, { useState } from 'react';
import InputField from './InputField';

export default {
  title: 'Form Elements/InputField',
  component: InputField,
  tags: ['autodocs'],
};

export const Basic = () => {
  const [value, setValue] = useState('');
  return (
    <InputField
      label="Name"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Enter your name"
    />
  );
};

export const Password = () => {
  const [value, setValue] = useState('');
  return (
    <InputField
      label="Password"
      type="password"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Enter your password"
    />
  );
}; 