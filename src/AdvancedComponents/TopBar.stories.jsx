import React from 'react';
import TopBar from './TopBar';

export default {
  title: 'Advanced components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
};

const mockBreadcrumbs = [
  { label: 'Home', onClick: () => {} },
  { label: 'Dashboard', onClick: () => {} },
  { label: 'Analytics' },
];

const mockNotifications = [
  {
    id: '1',
    message: 'New campaign created successfully',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    message: 'Your report is ready for download',
    timestamp: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    message: 'Weekly summary available',
    timestamp: '1 day ago',
    read: true,
  },
];

const mockCompanies = [
  { id: '1', name: 'Acme Corporation', type: 'advertiser' },
  { id: '2', name: 'Tech Solutions Inc', type: 'host' },
  { id: '3', name: 'Global Media Group', type: 'both' },
  { id: '4', name: 'Digital Advertisers LLC', type: 'advertiser' },
  { id: '5', name: 'Hosting Services Co', type: 'host' },
  { id: '6', name: 'Unified Marketing', type: 'both' },
];

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  initials: 'JD',
};

export const Default = () => (
  <TopBar
    breadcrumbs={mockBreadcrumbs}
    notifications={mockNotifications}
    companies={mockCompanies}
    selectedCompany="1"
    onCompanyChange={(id) => console.log('Company changed:', id)}
    user={mockUser}
    onProfileClick={() => console.log('Profile clicked')}
    onLogoutClick={() => console.log('Logout clicked')}
  />
);

export const WithNoNotifications = () => (
  <TopBar
    breadcrumbs={mockBreadcrumbs}
    notifications={[]}
    companies={mockCompanies}
    selectedCompany="3"
    user={mockUser}
  />
);

export const WithManyNotifications = () => (
  <TopBar
    breadcrumbs={mockBreadcrumbs}
    notifications={[
      ...mockNotifications,
      { id: '4', message: 'Another notification', timestamp: '2 days ago', read: true },
      { id: '5', message: 'Yet another one', timestamp: '3 days ago', read: false },
    ]}
    companies={mockCompanies}
    selectedCompany="2"
    user={mockUser}
  />
);

