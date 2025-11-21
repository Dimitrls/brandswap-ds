import React from 'react';
import Toast from './Toast';

export default {
  title: 'Info Elements/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    title: 'Payment successful',
    message: 'Your payout is on its way to your bank account.',
    variant: 'success',
    dismissible: true,
  },
  argTypes: {
    onDismiss: { action: 'dismissed' },
    onAction: { action: 'action clicked' },
  },
};

const Template = args => <Toast {...args} />;

export const Success = Template.bind({});

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
  title: 'Heads up!',
  message: 'We are syncing your latest analytics data.',
  actionLabel: 'View status',
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  title: 'Usage nearing limit',
  message: 'You have used 75% of your monthly emails.',
  actionLabel: 'Upgrade plan',
};

export const Error = Template.bind({});
Error.args = {
  variant: 'error',
  title: 'Payment failed',
  message: 'Please update your billing method to continue.',
  dismissible: false,
};

