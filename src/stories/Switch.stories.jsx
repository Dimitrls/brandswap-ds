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

export const InFormWithWarning = () => {
  const [on, setOn] = useState(false);
  return (
    <Switch
      label="Enable notifications"
      checked={on}
      onChange={setOn}
      inForm
      warningMessage={!on ? 'You must enable notifications to proceed.' : ''}
    />
  );
};

export const LabelOnTop = () => {
  const [on, setOn] = useState(false);
  return (
    <Switch
      label="Label on top"
      checked={on}
      onChange={setOn}
      labelOnTop
    />
  );
}; 