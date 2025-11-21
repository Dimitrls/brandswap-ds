import React from 'react';
import SecondBar from './SecondBar';

export default {
  title: 'Advanced components/SecondBar',
  component: SecondBar,
  tags: ['autodocs'],
};

export const Default = () => (
  <SecondBar>
    <span style={{ fontSize: 'var(--font-body-small)', color: 'var(--text-muted)' }}>Last updated: 2 hours ago</span>
    <span style={{ marginLeft: 'auto', fontSize: 'var(--font-body-small)', color: 'var(--text-muted)' }}>Status: Active</span>
  </SecondBar>
);

export const WithActions = () => (
  <SecondBar>
    <span style={{ fontSize: 'var(--font-body-small)', color: 'var(--text-muted)' }}>Showing 1-10 of 50 results</span>
    <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
      <button style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer', fontSize: 'var(--font-body-small)' }}>Export</button>
      <button style={{ padding: '6px 12px', background: 'var(--primary)', color: 'var(--text-on-primary)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: 'var(--font-body-small)' }}>New Item</button>
    </div>
  </SecondBar>
);

