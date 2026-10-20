import React from 'react';
import { Selectbox } from './Selectbox';

export default {
  title: 'Form elements/Selectbox',
  component: Selectbox,
  tags: ['autodocs'],
};

const OPTIONS = Array.from({ length: 32 }, (_, index) => `Option ${index + 1}`);

export const Default = () => (
  <Selectbox
    label="Choose an option"
    options={OPTIONS}
  />
);

export const Small = () => (
  <Selectbox
    label="Small selectbox"
    options={OPTIONS}
    size="small"
  />
);

export const Medium = () => (
  <Selectbox
    label="Medium selectbox (default)"
    options={OPTIONS}
    size="medium"
  />
);

export const Large = () => (
  <Selectbox
    label="Large selectbox"
    options={OPTIONS}
    size="large"
  />
);

export const WithIcon = () => (
  <Selectbox
    label="Selectbox with icon"
    options={OPTIONS}
    icon={true}
    iconName="search"
  />
);

export const WithIconSmall = () => (
  <Selectbox
    label="Small selectbox with icon"
    options={OPTIONS}
    size="small"
    icon={true}
    iconName="filter"
  />
);

export const SmallDropdownTop = () => (
  <div style={{ paddingTop: 180 }}>
    <Selectbox
      label="Top + small dropdown"
      options={OPTIONS}
      size="small"
      dropdownSize="small"
      dropdownPosition="top"
    />
  </div>
);

