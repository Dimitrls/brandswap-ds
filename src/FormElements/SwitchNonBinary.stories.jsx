import React, { useState } from 'react';
import SwitchNonBinary from './SwitchNonBinary';

export default {
  title: 'Form elements/SwitchNonBinary',
  component: SwitchNonBinary,
  tags: ['autodocs'],
};

export const Default = () => {
  const [value, setValue] = useState('State 1');
  return (
    <SwitchNonBinary
      options={['State 1', 'State 2']}
      value={value}
      onChange={setValue}
    />
  );
}; 

export const WithThreeStates = () => {
    const [value, setValue] = useState('State 1');
    return (
      <SwitchNonBinary
        options={['State 1', 'State 2', 'State 3']}
        value={value}
        onChange={setValue}
      />
    );
  };

