import React, { useState } from 'react';
import NavBar from './NavBar';
import Icon from '../Icons/Icon';

export default {
  title: 'Advanced components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
};

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Icon name="chart-pie" size={20} /> },
  { id: 'campaigns', label: 'Campaigns', icon: <Icon name="megaphone" size={20} /> },
  { id: 'users', label: 'Users', icon: <Icon name="users" size={20} /> },
  { id: 'offers', label: 'Offers', icon: <Icon name="offer" size={20} /> },
  { id: 'customizations', label: 'Customizations', icon: <Icon name="brush" size={20} /> },
  { id: 'payments', label: 'Payments', icon: <Icon name="wallet" size={20} /> },
  { id: 'partners', label: 'Partners', icon: <Icon name="heart-handshake" size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Icon name="configurations" size={20} /> },
  { id: 'superAdmin', label: 'Super Admin', icon: <Icon name="admin" size={20} /> },
];

export const Default = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div style={{ marginLeft: collapsed ? '64px' : '256px', padding: '20px', transition: 'margin-left 0.3s ease' }}>
      <NavBar
        items={navItems}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        logo={<span>BrandSwap</span>}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />
      <div>
        <h1>Main Content Area</h1>
        <p>This is where your main content would go. The sidebar is fixed on the left.</p>
      </div>
    </div>
  );
};

export const Expanded = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  
  return (
    <div style={{ marginLeft: '256px', padding: '20px' }}>
      <NavBar
        items={navItems}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        logo={<span>BrandSwap</span>}
        collapsed={false}
        onToggleCollapse={() => {}}
      />
      <div>
        <h1>Expanded Sidebar</h1>
        <p>The sidebar is always expanded in this example.</p>
      </div>
    </div>
  );
};

export const Collapsed = () => {
  const [activeItem, setActiveItem] = useState('analytics');
  
  return (
    <div style={{ marginLeft: '64px', padding: '20px' }}>
      <NavBar
        items={navItems}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        logo={<Icon name="coffee" size={24} />}
        collapsed={true}
        onToggleCollapse={() => {}}
      />
      <div>
        <h1>Collapsed Sidebar</h1>
        <p>The sidebar is always collapsed in this example, showing only icons.</p>
      </div>
    </div>
  );
};

export const WithLogoIcon = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div style={{ marginLeft: collapsed ? '64px' : '256px', padding: '20px', transition: 'margin-left 0.3s ease' }}>
      <NavBar
        items={navItems}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        logo={collapsed ? <Icon name="coffee" size={24} /> : <span>BrandSwap</span>}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />
      <div>
        <h1>With Logo Icon</h1>
        <p>This example shows how to use different logos for collapsed and expanded states.</p>
      </div>
    </div>
  );
};

export const WithBadges = () => {
  const [activeItem, setActiveItem] = useState('analytics');
  const [collapsed, setCollapsed] = useState(false);
  
  const itemsWithBadges = [
    { id: 'inbox', label: 'Inbox', icon: <Icon name="mail" size={20} />, badge: '12' },
    { id: 'notifications', label: 'Notifications', icon: <Icon name="bell" size={20} />, badge: '5' },
    { id: 'messages', label: 'Messages', icon: <Icon name="message-circle" size={20} />, badge: '99+' },
    { id: 'tasks', label: 'Tasks', icon: <Icon name="list" size={20} />, badge: '3' },
  ];
  
  return (
    <div style={{ marginLeft: collapsed ? '64px' : '256px', padding: '20px', transition: 'margin-left 0.3s ease' }}>
      <NavBar
        items={itemsWithBadges}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        logo={<span>BrandSwap</span>}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />
      <div>
        <h1>With Badges</h1>
        <p>Notice how badges are positioned in both expanded and collapsed states.</p>
      </div>
    </div>
  );
};

