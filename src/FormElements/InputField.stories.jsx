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

export const Small = () => {
  const [value, setValue] = React.useState('');
  return (
    <InputField
      label="Small Input"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Small input"
      size="small"
    />
  );
};

export const Warning = () => {
  const [value, setValue] = React.useState('');
  return (
    <InputField
      label="Email"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Enter your email"
      warning={true}
      warningMessage="This email is already taken."
    />
  );
}; 