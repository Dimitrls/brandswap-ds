import React from 'react';
import { FloatingButton } from './FloatingButton';

export default {
  title: 'Buttons & Tags/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
};

export const Filled = () => (
  <FloatingButton icon="dots-vertical" ariaLabel="Add" variant="filled" style={{ position: 'relative', bottom: 0, right: 0 }} />
);

export const Outline = () => (
  <FloatingButton icon="dots-vertical" ariaLabel="Add" variant="outline" style={{ position: 'relative', bottom: 0, right: 0 }} />
); 
