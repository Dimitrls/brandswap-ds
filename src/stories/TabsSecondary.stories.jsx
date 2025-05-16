import React, { useState } from 'react';
import TabsSecondary from '../FormElements/TabsSecondary';
import Icon from '../Icons/Icon';

export default {
  title: 'Navigation/TabsSecondary',
  component: TabsSecondary,
  tags: ['autodocs'],
};

export const WithIcons = () => {
  const [value, setValue] = useState('settings');
  const options = [
    { label: 'Settings', value: 'settings', icon: <Icon name="cog" /> },
    { label: 'Profile', value: 'profile', icon: <Icon name="user" /> },
    { label: 'Admin', value: 'admin', icon: <Icon name="admin" /> },
  ];
  return <TabsSecondary options={options} value={value} onChange={setValue} />;
};

export const WithoutIcons = () => {
  const [value, setValue] = useState('tab1');
  const options = [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3' },
  ];
  return <TabsSecondary options={options} value={value} onChange={setValue} />;
};

export const OnlyIcons = () => {
  const [value, setValue] = useState('desktop');
  const options = [
    { label: '', value: 'desktop', icon: <Icon name="monitor" /> },
    { label: '', value: 'mobile', icon: <Icon name="phone" /> },
  ];
  return <TabsSecondary options={options} value={value} onChange={setValue} />;
}; 