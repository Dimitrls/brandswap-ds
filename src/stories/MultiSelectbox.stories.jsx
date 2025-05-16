import React, { useState } from 'react';
import MultiSelectbox from '../FormElements/MultiSelectbox';

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