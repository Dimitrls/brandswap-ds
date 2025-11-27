import React from 'react';
import Notifications from './Notifications';

export default {
  title: 'Advanced components/Notifications',
  component: Notifications,
  tags: ['autodocs'],
};

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
  {
    id: '4',
    message: 'Payment received successfully',
    timestamp: '2 days ago',
    read: true,
  },
  {
    id: '5',
    message: 'New user registered',
    timestamp: '3 days ago',
    read: false,
  },
  {
    id: '6',
    message: 'Campaign performance report ready',
    timestamp: '4 days ago',
    read: false,
  },
  {
    id: '7',
    message: 'System maintenance scheduled',
    timestamp: '5 days ago',
    read: true,
  },
  {
    id: '8',
    message: 'Your subscription will renew soon',
    timestamp: '6 days ago',
    read: false,
  },
  {
    id: '9',
    message: 'New feature available: Advanced Analytics',
    timestamp: '1 week ago',
    read: true,
  },
  {
    id: '10',
    message: 'Security alert: New login detected',
    timestamp: '1 week ago',
    read: false,
  },
  {
    id: '11',
    message: 'Monthly summary report generated',
    timestamp: '1 week ago',
    read: true,
  },
  {
    id: '12',
    message: 'API rate limit warning',
    timestamp: '2 weeks ago',
    read: false,
  },
  {
    id: '13',
    message: 'Backup completed successfully',
    timestamp: '2 weeks ago',
    read: true,
  },
  {
    id: '14',
    message: 'New integration available',
    timestamp: '2 weeks ago',
    read: false,
  },
  {
    id: '15',
    message: 'Your account has been upgraded',
    timestamp: '3 weeks ago',
    read: true,
  },
  {
    id: '16',
    message: 'Password reset requested',
    timestamp: '3 weeks ago',
    read: false,
  },
  {
    id: '17',
    message: 'Data export completed',
    timestamp: '1 month ago',
    read: true,
  },
  {
    id: '18',
    message: 'New team member invited',
    timestamp: '1 month ago',
    read: false,
  },
];

export const Default = () => (
  <Notifications notifications={mockNotifications} itemsPerPage={5} />
);

export const WithoutPagination = () => (
  <Notifications notifications={mockNotifications.slice(0, 3)} />
);

export const WithCustomItemsPerPage = () => (
  <Notifications notifications={mockNotifications} itemsPerPage={3} />
);

export const Empty = () => (
  <Notifications notifications={[]} />
);

