import React, { useState } from 'react';
import Tabs from '../FormElements/Tabs';
import Icon from '../Icons/Icon';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export const WithIcons = () => {
  const [value, setValue] = useState('home');
  const options = [
    { label: 'Home', value: 'home', icon: <Icon name="home" /> },
    { label: 'Search', value: 'search', icon: <Icon name="search" /> },
    { label: 'Profile', value: 'profile', icon: <Icon name="user" /> },
  ];
  return <Tabs options={options} value={value} onChange={setValue} />;
};

export const WithoutIcons = () => {
  const [value, setValue] = useState('tab1');
  const options = [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3' },
  ];
  return <Tabs options={options} value={value} onChange={setValue} />;
}; 