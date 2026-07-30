import React, { useState } from 'react';
import { Select } from './Select';

export default {
  title: 'Form elements/Select',
  component: Select,
  tags: ['autodocs'],
};

const OPTIONS = [
  'Food & Drink',
  'Sports',
  'Books',
  'Car Electronics',
  'Fashion',
  'Home & Garden',
  'Toys',
  'Health',
];

export const SingleDefault = () => {
  const [value, setValue] = useState('');
  return (
    <Select
      label="Category"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      placeholder="Choose a category..."
      optionVariant="default"
    />
  );
};

export const SingleWithRadio = () => {
  const [value, setValue] = useState('');
  return (
    <Select
      label="Category"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      placeholder="Choose a category..."
      optionVariant="radio"
    />
  );
};

export const MultiWithCheckboxes = () => {
  const [value, setValue] = useState([]);
  return (
    <Select
      label="Categories"
      options={OPTIONS}
      multiple
      value={value}
      onChange={setValue}
      placeholder="Choose categories..."
      optionVariant="checkbox"
    />
  );
};

export const MultiDefault = () => {
  const [value, setValue] = useState([]);
  return (
    <Select
      label="Categories"
      options={OPTIONS}
      multiple
      value={value}
      onChange={setValue}
      placeholder="Choose categories..."
      optionVariant="default"
    />
  );
};

export const WithoutSearch = () => {
  const [value, setValue] = useState('');
  return (
    <Select
      label="Category"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      searchable={false}
      placeholder="Choose a category..."
    />
  );
};

export const Small = () => {
  const [value, setValue] = useState('');
  return (
    <Select
      label="Small select"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      size="small"
      placeholder="Choose..."
    />
  );
};

export const Large = () => {
  const [value, setValue] = useState([]);
  return (
    <Select
      label="Large multiselect"
      options={OPTIONS}
      multiple
      value={value}
      onChange={setValue}
      size="large"
      optionVariant="checkbox"
      placeholder="Choose categories..."
    />
  );
};

export const WithIcon = () => {
  const [value, setValue] = useState('');
  return (
    <Select
      label="Search categories"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      icon
      iconName="filter"
      placeholder="Filter..."
    />
  );
};
