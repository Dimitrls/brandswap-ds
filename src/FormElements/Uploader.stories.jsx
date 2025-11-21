import React from 'react';
import Uploader from './Uploader';

export default {
  title: 'Form Elements/Uploader',
  component: Uploader,
  tags: ['autodocs'],
};

export const Default = () => (
  <Uploader label="Upload your file" />
);

export const Small = () => (
  <Uploader label="Upload avatar" size="small" />
);

