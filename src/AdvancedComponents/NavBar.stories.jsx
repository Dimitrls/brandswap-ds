import React, { useState } from 'react';
import NavBar from './NavBar';
import Icon from '../Icons/Icon';

export default {
  title: 'Advanced components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
};

const navItems = [
  { id: 'home', label: 'Home', icon: <Icon name="home" size={16} /> },
  { id: 'dashboard', label: 'Dashboard', icon: <Icon name="grid" size={16} /> },
  { id: 'analytics', label: 'Analytics', icon: <Icon name="bar-chart" size={16} />, badge: '3' },
  { id: 'settings', label: 'Settings', icon: <Icon name="settings" size={16} /> },
];

export const Default = () => {
  const [activeItem, setActiveItem] = useState('home');
  
  return (
    <NavBar
      items={navItems}
      activeItem={activeItem}
      onItemClick={setActiveItem}
    />
  );
};

export const WithoutIcons = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  
  const itemsWithoutIcons = navItems.map(({ icon, ...item }) => item);
  
  return (
    <NavBar
      items={itemsWithoutIcons}
      activeItem={activeItem}
      onItemClick={setActiveItem}
    />
  );
};

export const WithBadges = () => {
  const [activeItem, setActiveItem] = useState('analytics');
  
  const itemsWithBadges = [
    { id: 'inbox', label: 'Inbox', icon: <Icon name="mail" size={16} />, badge: '12' },
    { id: 'notifications', label: 'Notifications', icon: <Icon name="bell" size={16} />, badge: '5' },
    { id: 'messages', label: 'Messages', icon: <Icon name="message-circle" size={16} />, badge: '99+' },
  ];
  
  return (
    <NavBar
      items={itemsWithBadges}
      activeItem={activeItem}
      onItemClick={setActiveItem}
    />
  );
};

