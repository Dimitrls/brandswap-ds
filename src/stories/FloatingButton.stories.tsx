import React from 'react';
import { FloatingButton } from './FloatingButton';

export default {
  title: 'Buttons & Tags/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
};

export const Filled = () => (
  <FloatingButton icon="pencil" ariaLabel="Add" variant="filled" />
);

export const Outline = () => (
  <FloatingButton icon="pencil" ariaLabel="Add" variant="outline" />
); 