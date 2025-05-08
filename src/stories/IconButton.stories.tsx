import React from 'react';
import { IconButton } from './IconButton';

export default {
  title: 'Buttons & Tags/IconButton',
  component: IconButton,
  tags: ['autodocs'],
};

export const Filled = () => (
  <IconButton icon="pencil" ariaLabel="Add" variant="filled" />
);

export const Outline = () => (
  <IconButton icon="pencil" ariaLabel="Add" variant="outline" />
);

export const FilledWarning = () => (
  <IconButton icon="trash" ariaLabel="Add" variant="filled-warning" />
);

export const OutlineWarning = () => (
  <IconButton icon="trash" ariaLabel="Add" variant="outline-warning" />
);

export const Subtle = () => (
  <IconButton icon="pencil" ariaLabel="Add" variant="subtle" />
);

export const SubtleWarning = () => (
  <IconButton icon="trash" ariaLabel="Add" variant="subtle-warning" />
);

export const Small = () => (
  <IconButton icon="pencil" ariaLabel="Add" variant="filled" sizeVariant="small" />
); 