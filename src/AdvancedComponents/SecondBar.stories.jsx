import React, { useState } from 'react';
import SecondBar from './SecondBar';

export default {
  title: 'Advanced components/SecondBar',
  component: SecondBar,
  tags: ['autodocs'],
};

export const WithTabsAndButton = () => {
  const [activeTab, setActiveTab] = useState('all');
  const tabsOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  return (
    <SecondBar
      tabsOptions={tabsOptions}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      buttonLabel="Save"
      buttonVariant="filled"
      buttonSize="large"
      onButtonClick={() => alert('Button clicked!')}
    />
  );
};