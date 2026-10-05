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

const OBJECT_OPTIONS = [
  { id: 1, name: 'Food & Drink' },
  { id: 2, name: 'Sports' },
  { id: 3, name: 'Books' },
  { id: 4, name: 'Fashion' },
];

export const SingleDefault = () => {
  const [value, setValue] = useState(null);
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
  const [value, setValue] = useState(null);
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
  const [value, setValue] = useState(null);
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
  const [value, setValue] = useState(null);
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
  const [value, setValue] = useState(null);
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

export const ObjectOptions = () => {
  const [value, setValue] = useState(null);
  const [multi, setMulti] = useState([]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Select
        label="Single object option"
        options={OBJECT_OPTIONS}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        value={value}
        onChange={(option) => {
          setValue(option);
        }}
        placeholder="Choose..."
      />
      <Select
        label="Multi object options"
        options={OBJECT_OPTIONS}
        multiple
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        value={multi}
        onChange={setMulti}
        optionVariant="checkbox"
        placeholder="Choose..."
      />
      <pre style={{ fontSize: 12 }}>
        {JSON.stringify({ value, multi }, null, 2)}
      </pre>
    </div>
  );
};

export const SmallSelectSmallDropdown = () => {
  const [value, setValue] = useState(null);
  return (
    <Select
      label="Small + small dropdown"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      size="small"
      dropdownSize="small"
      placeholder="Choose..."
    />
  );
};

export const MediumSelectMediumDropdown = () => {
  const [value, setValue] = useState(null);
  return (
    <Select
      label="Medium + medium dropdown (default)"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      size="medium"
      dropdownSize="medium"
      placeholder="Choose..."
    />
  );
};

export const LargeSelectLargeDropdown = () => {
  const [value, setValue] = useState(null);
  return (
    <Select
      label="Large + large dropdown"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      size="large"
      dropdownSize="large"
      placeholder="Choose..."
    />
  );
};

export const SmallSelectLargeDropdown = () => {
  const [value, setValue] = useState(null);
  return (
    <Select
      label="Small trigger + large dropdown"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      size="small"
      dropdownSize="large"
      placeholder="Choose..."
    />
  );
};

export const SmallSelectTopPosition = () => {
  const [value, setValue] = useState(null);
  return (
    <div style={{ paddingTop: 220 }}>
      <Select
        label="Small + small dropdown + top"
        options={OPTIONS}
        value={value}
        onChange={setValue}
        size="small"
        dropdownSize="small"
        dropdownPosition="top"
        placeholder="Choose..."
      />
    </div>
  );
};

export const MultiSelectSmallDropdown = () => {
  const [value, setValue] = useState([]);
  return (
    <Select
      label="MultiSelect small dropdown"
      options={OPTIONS}
      multiple
      value={value}
      onChange={setValue}
      size="small"
      dropdownSize="small"
      optionVariant="checkbox"
      placeholder="Choose categories..."
    />
  );
};

export const SearchableMultiSelectSmallDropdown = () => {
  const [value, setValue] = useState([]);
  return (
    <Select
      label="Searchable MultiSelect + small dropdown"
      options={OPTIONS}
      multiple
      value={value}
      onChange={setValue}
      size="small"
      dropdownSize="small"
      searchable
      optionVariant="checkbox"
      placeholder="Choose categories..."
    />
  );
};

export const MultiSelectTopPosition = () => {
  const [value, setValue] = useState([]);
  return (
    <div style={{ paddingTop: 260 }}>
      <Select
        label="MultiSelect top position"
        options={OPTIONS}
        multiple
        value={value}
        onChange={setValue}
        dropdownPosition="top"
        dropdownSize="small"
        optionVariant="checkbox"
        placeholder="Choose categories..."
      />
    </div>
  );
};

export const LabelHeightDoesNotAffectTopPosition = () => {
  const [short, setShort] = useState(null);
  const [tall, setTall] = useState(null);
  return (
    <div style={{ display: 'flex', gap: 32, paddingTop: 240 }}>
      <Select
        label="Short label"
        options={OPTIONS}
        value={short}
        onChange={setShort}
        size="small"
        dropdownSize="small"
        dropdownPosition="top"
        placeholder="Choose..."
      />
      <Select
        label={
          <>
            Tall label line 1
            <br />
            Tall label line 2
            <br />
            Tall label line 3
          </>
        }
        options={OPTIONS}
        value={tall}
        onChange={setTall}
        size="small"
        dropdownSize="small"
        dropdownPosition="top"
        placeholder="Choose..."
      />
    </div>
  );
};
