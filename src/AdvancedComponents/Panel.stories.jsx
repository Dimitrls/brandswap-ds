import React from 'react';
import Panel from './Panel';

export default {
  title: 'Advanced components/Panel',
  component: Panel,
  tags: ['autodocs'],
};

export const Default = () => (
  <Panel title="Panel Title">
    <p>This is the panel content. You can add any content here.</p>
  </Panel>
);

export const WithFooter = () => (
  <Panel
    title="Panel with Footer"
    footer={<button style={{ padding: '8px 16px', background: 'var(--primary)', color: 'var(--text-on-primary)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Action</button>}
  >
    <p>This panel includes a footer section with actions.</p>
  </Panel>
);

export const WithoutTitle = () => (
  <Panel>
    <p>This panel doesn't have a title header.</p>
  </Panel>
);

