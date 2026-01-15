import React, { useEffect } from 'react';
import Panel from './Panel';
import Icon from '../Icons/Icon';
import { Button } from '../Buttons/Button';

// Decorator to set background for Panel stories
const withPanelBackground = (Story) => {
  useEffect(() => {
    const styleId = 'panel-docs-story-bg';
    let styleEl = document.getElementById(styleId);
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    // Set background for docs-story elements in Panel stories
    styleEl.textContent = `
      .docs-story {
        background: var(--bg1) !important;
      }
    `;

    // Apply directly to existing docs-story elements
    const updateBackgrounds = () => {
      document.querySelectorAll('.docs-story>div').forEach((el) => {
        el.style.setProperty('background', 'var(--bg1)', 'important');
      });
    };

    updateBackgrounds();
    // Update periodically to catch dynamically added elements
    const interval = setInterval(updateBackgrounds, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Story />;
};

export default {
  title: 'Advanced components/Panel',
  component: Panel,
  tags: ['autodocs'],
  decorators: [withPanelBackground],
};

export const Default = () => (
  <Panel title="Panel Title">
    <p>This is the panel content. You can add any content here.</p>
  </Panel>
);

export const WithIcon = () => (
  <Panel 
    title="Panel with Icon"
    icon={<Icon name="chart-pie" size={24} />}
  >
    <p>This panel includes an icon before the title.</p>
  </Panel>
);

export const WithDescription = () => (
  <Panel 
    title="Panel with Description"
    description="This is a description that appears below the title."
  >
    <p>This panel includes a description below the title.</p>
  </Panel>
);

export const WithIconAndDescription = () => (
  <Panel 
    title="Complete Panel"
    icon={<Icon name="chart-pie" size={24} />}
    description="This panel includes both an icon and a description."
  >
    <p>This panel demonstrates the full header with icon, title, and description.</p>
  </Panel>
);

export const WithFooter = () => (
  <Panel
    title="Panel with Footer"
    footer={<Button label="Action" size="large" />}
  >
    <p>This panel includes a footer section with actions.</p>
  </Panel>
);

export const WithoutTitle = () => (
  <Panel>
    <p>This panel doesn't have a title header.</p>
  </Panel>
);

