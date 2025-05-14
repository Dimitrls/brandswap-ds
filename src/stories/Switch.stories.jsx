import React, { useState } from 'react';
import Switch from '../FormElements/Switch';

export default {
  title: 'Form elements/Switch',
  component: Switch,
};

export const Default = () => {
  const [on, setOn] = useState(false);
  return (
    <Switch
      label={on ? 'On' : 'Off'}
      checked={on}
      onChange={setOn}
    />
  );
};

export const InForm = () => {
  const [on, setOn] = useState(false);
  return (
    <Switch
      label={on ? 'Subscribed' : 'Not Subscribed'}
      checked={on}
      onChange={setOn}
      inForm
    />
  );
}; 