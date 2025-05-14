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