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
  { id: '7', name: 'Premium Ad Network', type: 'advertiser' },
  { id: '8', name: 'Cloud Hosting Pro', type: 'host' },
  { id: '9', name: 'Media Partners Worldwide', type: 'both' },
  { id: '10', name: 'AdTech Innovations', type: 'advertiser' },
  { id: '11', name: 'Server Solutions Ltd', type: 'host' },
  { id: '12', name: 'Dual Platform Media', type: 'both' },
  { id: '13', name: 'Creative Ad Agency', type: 'advertiser' },
  { id: '14', name: 'Enterprise Hosting', type: 'host' },
  { id: '15', name: 'Full Service Media Co', type: 'both' },
  { id: '16', name: 'Brand Marketing Group', type: 'advertiser' },
  { id: '17', name: 'Infrastructure Hosting', type: 'host' },
  { id: '18', name: 'Complete Media Solutions', type: 'both' },
  { id: '19', name: 'Performance Advertisers', type: 'advertiser' },
  { id: '20', name: 'Reliable Host Services', type: 'host' },
  { id: '21', name: 'Integrated Media Platform', type: 'both' },
  { id: '22', name: 'Strategic Ad Partners', type: 'advertiser' },
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

