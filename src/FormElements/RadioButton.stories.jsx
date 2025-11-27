import React, { useState } from 'react';
import RadioButton, { RadioButtonGroup } from './RadioButton';

export default {
  title: 'Form elements/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
};

export const Default = () => {
  const [selected, setSelected] = useState('option1');
  return (
    <RadioButtonGroup horizontal>
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
    </RadioButtonGroup>
  );
};

export const Vertical = () => {
  const [selected, setSelected] = useState('option1');
  return (
    <RadioButtonGroup>
      <RadioButton
        label="Option 1"
        name="vertical-example"
        value="option1"
        checked={selected === 'option1'}
        onChange={setSelected}
      />
      <RadioButton
        label="Option 2"
        name="vertical-example"
        value="option2"
        checked={selected === 'option2'}
        onChange={setSelected}
      />
    </RadioButtonGroup>
  );
};

