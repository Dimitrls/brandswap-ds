import React, { useState } from 'react';
import { FiltersBar } from './FiltersBar';
import { Select } from '../FormElements/Select';

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
      options: ['All Status', 'Active', 'Inactive'],
      value: status,
      onChange: setStatus,
      icon: true,
      iconName: 'check',
    },
    {
      multiple: true,
      options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      value: categories,
      onChange: setCategories,
      placeholder: 'Select categories...',
      icon: true,
      iconName: 'coffee',
    },
    {
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
      onSearchChange={setSearch}
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
      <Select
        options={['All Status', 'Active', 'Inactive']}
        icon={true}
        iconName="check"
        searchable={false}
        onChange={() => {}}
      />
      <Select
        options={['All Categories', 'Category 1', 'Category 2']}
        icon={true}
        iconName="coffee"
        searchable={false}
        onChange={() => {}}
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
      label: 'Status',
      options: ['All Status', 'Active', 'Inactive'],
      value: status,
      onChange: setStatus,
      icon: true,
      iconName: 'check',
    },
    {
      multiple: true,
      searchable: true,
      label: 'Categories',
      options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      value: categories,
      onChange: setCategories,
      placeholder: 'Select categories...',
      icon: true,
      iconName: 'coffee',
    },
    {
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
      border
      dropdownMaxHeight={220}
      searchbox={true}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search..."
      filters={filters}
      onApply={() => console.log('Apply clicked', { status, categories, dateRange })}
      applyLabel="Apply"
    />
  );
};
