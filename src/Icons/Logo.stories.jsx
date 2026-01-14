import React from 'react';
import Logo from './Logo';

export default {
  title: 'Icons/Logo',
  component: Logo,
  tags: ['autodocs'],
};

export const Default = () => (
  <Logo />
);

export const IconOnly = () => (
  <Logo variant="icon" />
);

export const TextOnly = () => (
  <Logo variant="text" />
);