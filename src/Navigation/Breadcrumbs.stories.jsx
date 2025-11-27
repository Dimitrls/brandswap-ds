import React from 'react';
import Breadcrumbs from './Breadcrumbs';

export default {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
};

export const WithDropdowns = () => (
  <Breadcrumbs
    items={[
      { label: 'Home', onClick: () => {}, hasDropdown: false },
      { label: 'Library', onClick: () => {}, hasDropdown: true, dropdownItems: ['Books', 'Music', 'Videos'] },
      { label: 'Data', onClick: () => {}, hasDropdown: false },
      { label: 'Current', hasDropdown: false },
    ]}
  />
);

export const WithoutDropdowns = () => (
  <Breadcrumbs
    items={[
      { label: 'Home', onClick: () => {} },
      { label: 'Section', onClick: () => {} },
      { label: 'Page', onClick: () => {} },
      { label: 'Current' },
    ]}
  />
);

