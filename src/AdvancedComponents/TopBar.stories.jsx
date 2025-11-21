import React from 'react';
import TopBar from './TopBar';
import { IconButton } from '../stories/IconButton';

export default {
  title: 'Advanced components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
};

export const Default = () => (
  <TopBar
    leftContent={<h2 style={{ margin: 0, fontSize: 'var(--font-h3)' }}>Dashboard</h2>}
    rightContent={
      <>
        <IconButton icon="bell" ariaLabel="Notifications" variant="subtle" />
        <IconButton icon="user" ariaLabel="Profile" variant="subtle" />
      </>
    }
  />
);

export const WithCenterContent = () => (
  <TopBar
    leftContent={<IconButton icon="menu" ariaLabel="Menu" variant="subtle" />}
    centerContent={<input type="text" placeholder="Search..." style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-default)', width: '300px' }} />}
    rightContent={<IconButton icon="settings" ariaLabel="Settings" variant="subtle" />}
  />
);

export const Minimal = () => (
  <TopBar
    leftContent={<span style={{ fontWeight: 'var(--font-weight-bold)' }}>BrandSwap</span>}
    rightContent={<button style={{ padding: '8px 16px', background: 'var(--primary)', color: 'var(--text-on-primary)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Sign In</button>}
  />
);

