import React, { useState } from 'react';
import RadioButton from '../FormElements/RadioButton';

export default {
  title: 'Form elements/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
};

export const Default = () => {
  const [selected, setSelected] = useState('option1');
  return (
    <div>
      <RadioButton
        label="Option 1"
        name="example"
        value="option1"
        checked={selected === 'option1'}
        onChange={setSelected}
      />
      <RadioButton
        label="Option 2"
        name="example"
        value="option2"
        checked={selected === 'option2'}
        onChange={setSelected}
      />
    </div>
  );
}; 