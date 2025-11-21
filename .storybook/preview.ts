import type { Preview } from '@storybook/react';
import '../src/global.css';

const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof document === 'undefined') return;

  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);

  const rootStyles = getComputedStyle(document.documentElement);
  const backgroundColor = rootStyles.getPropertyValue('--bg-default') || '#ffffff';
  document.body.style.backgroundColor = backgroundColor.trim();
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Switch between light and dark themes',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', right: '☀️' },
        { value: 'dark', title: 'Dark', right: '🌙' },
      ],
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const theme = (context.globals.theme as 'light' | 'dark') || 'light';
    applyTheme(theme);
    return Story();
  },
];

export default preview;