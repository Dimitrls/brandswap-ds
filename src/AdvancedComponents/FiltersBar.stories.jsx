import React, { useState } from 'react';
import FiltersBar from './FiltersBar';
import Selectbox from '../FormElements/Selectbox';

export default {
  title: 'Advanced components/FiltersBar',
  component: FiltersBar,
  tags: ['autodocs'],
};

export const Default = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Status');
  const [categories, setCategories] = useState([]);
  const [dateRange, setDateRange] = useState('All Dates');
  
  const filters = [
    {
      type: 'selectbox',
      options: ['All Status', 'Active', 'Inactive'],
      value: status,
      onChange: setStatus,
      icon: true,
      iconName: 'check',
    },
    {
      type: 'multiselectbox',
      options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      selected: categories,
      onChange: setCategories,
      placeholder: 'Select categories...',
      icon: true,
      iconName: 'coffee',
    },
    {
      type: 'selectbox',
      options: ['All Dates', 'Today', 'This Week', 'This Month'],
      value: dateRange,
      onChange: setDateRange,
      icon: true,
      iconName: 'calendar',
    },
  ];
  
  return (
    <FiltersBar
      labels={false}
      searchbox={true}
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      searchPlaceholder="Search..."
      filters={filters}
      onApply={() => console.log('Apply clicked', { status, categories, dateRange })}
      applyLabel="Apply"
    />
  );
};

export const WithoutSearchbox = () => {
  return (
    <FiltersBar
      labels={false}
      onApply={() => console.log('Apply clicked')}
    >
      <Selectbox
        options={['All Status', 'Active', 'Inactive']}
        icon={true}
        iconName="check"
      />
      <Selectbox
        options={['All Categories', 'Category 1', 'Category 2']}
        icon={true}
        iconName="coffee"
      />
    </FiltersBar>
  );
};

export const WithLabels = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Status');
  const [categories, setCategories] = useState([]);
  const [dateRange, setDateRange] = useState('All Dates');
  
  const filters = [
    {
      type: 'selectbox',
      label: 'Status',
      options: ['All Status', 'Active', 'Inactive'],
      value: status,
      onChange: setStatus,
      icon: true,
      iconName: 'check',
    },
    {
      type: 'multiselectbox',
      label: 'Categories',
      options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      selected: categories,
      onChange: setCategories,
      placeholder: 'Select categories...',
      icon: true,
      iconName: 'coffee',
    },
    {
      type: 'selectbox',
      label: 'Date Range',
      options: ['All Dates', 'Today', 'This Week', 'This Month'],
      value: dateRange,
      onChange: setDateRange,
      icon: true,
      iconName: 'calendar',
    },
  ];
  
  return (
    <FiltersBar
      labels={true}
      searchbox={true}
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      searchPlaceholder="Search..."
      filters={filters}
      onApply={() => console.log('Apply clicked', { status, categories, dateRange })}
      applyLabel="Apply"
    />
  );
};
