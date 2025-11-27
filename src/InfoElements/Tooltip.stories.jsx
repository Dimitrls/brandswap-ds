import React from 'react';
import Tooltip from './Tooltip';
import { Button } from '../Buttons/Button';

export default {
  title: 'Info Elements/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    content: 'Use this action to archive the record.',
    placement: 'top',
  },
};

const Template = args => (
  <div style={{ padding: 48 }}>
    <Tooltip {...args}>
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </div>
);

export const Top = Template.bind({});

export const Bottom = Template.bind({});
Bottom.args = {
  placement: 'bottom',
  content: 'Appears below the trigger',
};

export const Left = Template.bind({});
Left.args = {
  placement: 'left',
  content: 'Appears to the left',
};

export const Right = Template.bind({});
Right.args = {
  placement: 'right',
  content: 'Appears to the right',
};

