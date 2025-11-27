import React, { useState } from 'react';
import MultiSelectbox from './MultiSelectbox';

export default {
  title: 'Form elements/MultiSelectbox',
  component: MultiSelectbox,
  tags: ['autodocs'],
};

export const Default = () => {
  const [selected, setSelected] = useState([]);
  return (
    <MultiSelectbox
      label="Categories"
      options={['Food & Drink', 'Sports', 'Books', 'Car Electronics']}
      selected={selected}
      onChange={setSelected}
      placeholder="Choose categories..."
    />
  );
};

export const Small = () => {
  const [selected, setSelected] = useState([]);
  return (
    <MultiSelectbox
      label="Small multiselectbox"
      options={['Food & Drink', 'Sports', 'Books', 'Car Electronics']}
      selected={selected}
      onChange={setSelected}
      placeholder="Choose categories..."
      size="small"
    />
  );
};

export const Medium = () => {
  const [selected, setSelected] = useState([]);
  return (
    <MultiSelectbox
      label="Medium multiselectbox (default)"
      options={['Food & Drink', 'Sports', 'Books', 'Car Electronics']}
      selected={selected}
      onChange={setSelected}
      placeholder="Choose categories..."
      size="medium"
    />
  );
};

export const Large = () => {
  const [selected, setSelected] = useState([]);
  return (
    <MultiSelectbox
      label="Large multiselectbox"
      options={['Food & Drink', 'Sports', 'Books', 'Car Electronics']}
      selected={selected}
      onChange={setSelected}
      placeholder="Choose categories..."
      size="large"
    />
  );
};

