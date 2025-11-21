import React, { useState } from 'react';
import InputField from './InputField';
import TextArea from './TextArea';

export default {
  title: 'Form Elements/InputField',
  component: InputField,
  tags: ['autodocs'],
};

export const Default = () => {
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

export const Large = () => {
  const [value, setValue] = React.useState('');
  return (
    <InputField
      label="Large Input"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Large input"
      size="large"
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

export const PrefixText = () => {
  const [value, setValue] = React.useState('');
  return (
    <InputField
      label="Amount"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Enter amount"
      prefix="€"
    />
  );
};

export const SuffixText = () => {
  const [value, setValue] = React.useState('');
  return (
    <InputField
      label="Weight"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Enter weight"
      suffix="kg"
    />
  );
};

export const PrefixSelect = () => {
  const [value, setValue] = React.useState('');
  return (
    <InputField
      label="Phone"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Enter phone number"
      prefix={
        <select defaultValue="+30">
          <option value="+30">+30</option>
          <option value="+44">+44</option>
        </select>
      }
    />
  );
};

export const SuffixSelect = () => {
  const [value, setValue] = React.useState('');
  return (
    <InputField
      label="Weight"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Enter weight"
      suffix={
        <select defaultValue="kg">
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
      }
    />
  );
};

export const NumberWithArrows = () => {
  const [value, setValue] = React.useState(0);
  return (
    <InputField
      label="Quantity"
      type="number"
      value={value}
      onChange={e => setValue(e.target.value)}
      showArrows={true}
      placeholder="Enter a number"
    />
  );
};

export const NumberWithoutArrows = () => {
  const [value, setValue] = React.useState(0);
  return (
    <InputField
      label="Quantity"
      type="number"
      value={value}
      onChange={e => setValue(e.target.value)}
      showArrows={false}
      placeholder="Enter a number"
    />
  );
};

export const TextAreaBasic = () => (
  <TextArea label="Description" />
);

export const TextAreaWithToolbar = () => (
  <TextArea label="Rich Description" showToolbar />
);

export const TextAreaWarning = () => (
  <TextArea label="Description" warning warningMessage="This field is required." />
); 