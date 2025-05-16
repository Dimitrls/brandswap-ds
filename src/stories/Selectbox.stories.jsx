import React from 'react';
import Selectbox from '../FormElements/Selectbox';

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