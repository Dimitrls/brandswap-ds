import React, { useState } from 'react';
import Checkbox from '../FormElements/Checkbox';

export default {
  title: 'Form elements/Checkbox',
  component: Checkbox,
};

export const Default = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={setChecked}
    />
  );
};

export const InForm = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="I agree to the privacy policy"
      checked={checked}
      onChange={setChecked}
      inForm
    />
  );
}; 