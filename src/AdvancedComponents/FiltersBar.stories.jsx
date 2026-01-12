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
  
  return (
    <FiltersBar
      searchbox={true}
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      onApply={() => console.log('Apply clicked')}
    >
      <Selectbox
        options={['All Status', 'Active', 'Inactive']}
        size="large"
        icon={true}
        iconName="filter"
      />
    </FiltersBar>
  );
};

export const WithMultipleFilters = () => {
  const [search, setSearch] = useState('');
  
  return (
    <FiltersBar
      searchbox={true}
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      searchPlaceholder="Search companies..."
      onApply={() => console.log('Apply clicked')}
      applyLabel="Apply"
    >
      <Selectbox
        options={['All Categories', 'Category 1', 'Category 2']}
        size="large"
        icon={true}
        iconName="filter"
      />
      <Selectbox
        options={['All Dates', 'Today', 'This Week', 'This Month']}
        size="large"
        icon={true}
        iconName="calendar"
      />
      <Selectbox
        options={['All Types', 'Type A', 'Type B']}
        size="large"
        icon={true}
        iconName="list"
      />
    </FiltersBar>
  );
};

export const WithoutSearchbox = () => {
  return (
    <FiltersBar
      onApply={() => console.log('Apply clicked')}
    >
      <Selectbox
        options={['All Status', 'Active', 'Inactive']}
        size="large"
        icon={true}
        iconName="filter"
      />
      <Selectbox
        options={['All Categories', 'Category 1', 'Category 2']}
        size="large"
        icon={true}
        iconName="list"
      />
    </FiltersBar>
  );
};

export const WithoutApplyButton = () => {
  const [search, setSearch] = useState('');
  
  return (
    <FiltersBar
      searchbox={true}
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    >
      <Selectbox
        options={['All Status', 'Active', 'Inactive']}
        size="large"
        icon={true}
        iconName="filter"
      />
    </FiltersBar>
  );
};

export const WithConfigurableFilters = () => {
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
    },
    {
      type: 'multiselectbox',
      options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      selected: categories,
      onChange: setCategories,
      placeholder: 'Select categories...',
    },
    {
      type: 'selectbox',
      options: ['All Dates', 'Today', 'This Week', 'This Month'],
      value: dateRange,
      onChange: setDateRange,
    },
  ];
  
  return (
    <FiltersBar
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

export const MixedFilters = () => {
  const [status, setStatus] = useState('All Status');
  const [tags, setTags] = useState([]);
  
  const filters = [
    {
      type: 'selectbox',
      options: ['All Status', 'Active', 'Inactive'],
      value: status,
      onChange: setStatus,
    },
    {
      type: 'multiselectbox',
      options: ['Tag 1', 'Tag 2', 'Tag 3'],
      selected: tags,
      onChange: setTags,
      placeholder: 'Select tags...',
    },
  ];
  
  return (
    <FiltersBar
      filters={filters}
      onApply={() => console.log('Apply clicked', { status, tags })}
    />
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
    },
    {
      type: 'multiselectbox',
      label: 'Categories',
      options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      selected: categories,
      onChange: setCategories,
      placeholder: 'Select categories...',
    },
    {
      type: 'selectbox',
      label: 'Date Range',
      options: ['All Dates', 'Today', 'This Week', 'This Month'],
      value: dateRange,
      onChange: setDateRange,
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
