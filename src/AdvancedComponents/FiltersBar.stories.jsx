import React, { useState } from 'react';
import FiltersBar from './FiltersBar';
import InputField from '../FormElements/InputField';
import Selectbox from '../FormElements/Selectbox';

export default {
  title: 'Advanced components/FiltersBar',
  component: FiltersBar,
  tags: ['autodocs'],
};

export const Default = () => {
  const [search, setSearch] = useState('');
  
  return (
    <FiltersBar>
      <InputField
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        style={{ width: '200px' }}
      />
      <Selectbox
        options={['All Status', 'Active', 'Inactive']}
      />
      <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '8px', cursor: 'pointer', fontSize: 'var(--font-body-small)' }}>Clear Filters</button>
    </FiltersBar>
  );
};

export const WithMultipleFilters = () => {
  const [search, setSearch] = useState('');
  
  return (
    <FiltersBar>
      <InputField
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        style={{ width: '200px' }}
      />
      <Selectbox
        options={['All Categories', 'Category 1', 'Category 2']}
      />
      <Selectbox
        options={['All Dates', 'Today', 'This Week', 'This Month']}
      />
      <button style={{ padding: '8px 16px', background: 'var(--primary)', color: 'var(--text-on-primary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: 'var(--font-body-small)' }}>Apply</button>
    </FiltersBar>
  );
};

