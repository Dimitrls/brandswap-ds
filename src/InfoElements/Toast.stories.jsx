import React from 'react';
import { Toast, toast } from './Toast';
import { Button } from '../Buttons/Button';

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

const Template = (args) => <Toast {...args} />;

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

export const ImperativeApi = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Button
      label="Success"
      onClick={() => toast.success('Partnership updated successfully', 3)}
    />
    <Button
      label="Error"
      variant="outline-warning"
      onClick={() => toast.error('Failed to load hosts', 3)}
    />
    <Button
      label="Info / message"
      variant="outline"
      onClick={() => toast.message('Sync started', 2)}
    />
    <Button
      label="Warning top-left"
      variant="outline"
      onClick={() =>
        toast.warning({
          message: 'Usage nearing limit',
          position: 'top-left',
          duration: 4,
        })
      }
    />
    <Button
      label="Bottom-right"
      variant="outline"
      onClick={() =>
        toast.open({
          title: 'Saved',
          message: 'Your changes were stored.',
          variant: 'success',
          position: 'bottom-right',
          duration: 5,
        })
      }
    />
  </div>
);
