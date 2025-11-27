import React from 'react';
import Selectbox from './Selectbox';

export default {
  title: 'Form elements/Selectbox',
  component: Selectbox,
  tags: ['autodocs'],
};

export const Default = () => (
  <Selectbox
    label="Choose an option"
    options={['Option 1', 'Option 2', 'Option 3']}
  />
);

export const Small = () => (
  <Selectbox
    label="Small selectbox"
    options={['Option 1', 'Option 2', 'Option 3']}
    size="small"
  />
);

export const Medium = () => (
  <Selectbox
    label="Medium selectbox (default)"
    options={['Option 1', 'Option 2', 'Option 3']}
    size="medium"
  />
);

export const Large = () => (
  <Selectbox
    label="Large selectbox"
    options={['Option 1', 'Option 2', 'Option 3']}
    size="large"
  />
);

export const WithIcon = () => (
  <Selectbox
    label="Selectbox with icon"
    options={['Option 1', 'Option 2', 'Option 3']}
    icon={true}
    iconName="search"
  />
);

export const WithIconSmall = () => (
  <Selectbox
    label="Small selectbox with icon"
    options={['Option 1', 'Option 2', 'Option 3']}
    size="small"
    icon={true}
    iconName="filter"
  />
);

