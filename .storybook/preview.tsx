import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import { addons } from '@storybook/preview-api';
import { create } from '@storybook/theming/create';
import '../src/global.css';

const docsTheme = create({
  base: 'light',
  brandTitle: 'BrandSwap Design System',
  brandUrl: '/',
  colorPrimary: '#3AB78F',
  colorSecondary: '#844AFF',
  appBg: 'var(--bg-default)',
  appContentBg: 'var(--bg-default)',
  appBorderColor: 'var(--border-subtle)',
  appBorderRadius: 12,
  fontBase: "'Poppins', sans-serif",
  textColor: 'var(--text-default)',
  textInverseColor: 'var(--text-negative)',
  barTextColor: 'var(--text-muted)',
  barSelectedColor: '#3AB78F',
  barHoverColor: '#3AB78F',
  inputBg: 'var(--bg-default)',
  inputBorder: 'var(--border-subtle)',
  inputTextColor: 'var(--text-default)',
  inputBorderRadius: 8,
});

const ensureDocsBackgroundRule = () => {
  if (typeof document === 'undefined') return;

  const docsStyleId = 'bs-docs-bg-style';
  const rule = `
    [id^="anchor--"] .docs-story,
    .docs-story {
      background: var(--bg-default) !important;
      transition: background-color 0.3s ease;
    }
  `;

  const existingStyle = document.getElementById(docsStyleId);
  if (existingStyle) {
    existingStyle.textContent = rule;
    return;
  }

  const styleEl = document.createElement('style');
  styleEl.id = docsStyleId;
  styleEl.textContent = rule;
  document.head.appendChild(styleEl);
};

const updateDocsStoryBackgrounds = () => {
  if (typeof document === 'undefined') return;

  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLElement>('.docs-story').forEach(element => {
      element.style.setProperty('background', 'var(--bg-default)', 'important');
      element.style.setProperty('transition', 'background-color 0.3s ease');
    });
  });
};

const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof document === 'undefined') return;

  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  ensureDocsBackgroundRule();
  updateDocsStoryBackgrounds();

  const rootStyles = getComputedStyle(document.documentElement);
  const backgroundColor = rootStyles.getPropertyValue('--bg-default') || '#ffffff';
  document.body.style.backgroundColor = backgroundColor.trim();
};

const startDocsBackgroundObserver = () => {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

  const win = window as typeof window & { __bsDocsBgObserver?: MutationObserver };
  if (win.__bsDocsBgObserver) return;

  const observer = new MutationObserver(() => {
    updateDocsStoryBackgrounds();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  win.__bsDocsBgObserver = observer;
};

if (typeof window !== 'undefined') {
  ensureDocsBackgroundRule();
  updateDocsStoryBackgrounds();
  startDocsBackgroundObserver();
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: docsTheme,
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

const ThemeWrapper: React.FC<{ theme: 'light' | 'dark'; children: React.ReactNode }> = ({ theme, children }) => {
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return <>{children}</>;
};

const withTheme = (StoryComponent, context) => {
  const theme = (context.globals.theme as 'light' | 'dark') || 'light';

  return (
    <ThemeWrapper theme={theme}>
      <StoryComponent />
    </ThemeWrapper>
  );
};

export const decorators = [withTheme];

if (typeof window !== 'undefined') {
  const channel = addons.getChannel();
  const refreshDocsBackground = () => {
    ensureDocsBackgroundRule();
    updateDocsStoryBackgrounds();
  };

  channel.on('docsRendered', refreshDocsBackground);
  channel.on('storyRendered', refreshDocsBackground);
}

export default preview;