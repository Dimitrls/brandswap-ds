import React, { useState } from 'react';
import AlertBanner from './AlertBanner';

export default {
  title: 'Info Elements/AlertBanner',
  component: AlertBanner,
  tags: ['autodocs'],
  args: {
    title: 'Announcement',
    message: 'This is an important announcement that requires your attention.',
    variant: 'info',
    dismissible: true,
  },
  argTypes: {
    onDismiss: { action: 'dismissed' },
    onAction: { action: 'action clicked' },
  },
};

const Template = args => {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) {
    return <div>Alert dismissed. <button onClick={() => setDismissed(false)}>Reset</button></div>;
  }
  
  return (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <AlertBanner 
        {...args} 
        onDismiss={args.dismissible ? () => setDismissed(true) : args.onDismiss}
      />
    </div>
  );
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  title: 'Success!',
  message: 'Your changes have been saved successfully.',
  dismissible: false,
};

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
  title: 'New feature available',
  message: 'We just launched a new feature that might interest you. Check it out!',
  actionLabel: 'Learn more',
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  title: 'Scheduled maintenance',
  message: 'System maintenance is scheduled for tonight at 2 AM. Some features may be unavailable.',
  actionLabel: 'View details',
};

export const Error = Template.bind({});
Error.args = {
  variant: 'error',
  title: 'Connection error',
  message: 'Unable to connect to the server. Please check your internet connection and try again.',
  dismissible: false,
  actionLabel: 'Retry',
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  title: undefined,
  message: 'This alert banner only has a message without a title.',
  variant: 'info',
};

export const WithAction = Template.bind({});
WithAction.args = {
  variant: 'info',
  title: 'Update available',
  message: 'A new version of the app is available with important security updates.',
  actionLabel: 'Update now',
  dismissible: true,
};
