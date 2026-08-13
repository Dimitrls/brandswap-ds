import React, { useState } from 'react'
import { FiltersBar } from './FiltersBar'
import { Select } from '../FormElements/Select'
import { Button } from '../Buttons/Button'

export default {
  title: 'Advanced components/FiltersBar',
  component: FiltersBar,
  tags: ['autodocs']
}

export const Default = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All Status')
  const [categories, setCategories] = useState([])
  const [dateRange, setDateRange] = useState('All Dates')

  const filters = [
    {
      options: ['All Status', 'Active', 'Inactive'],
      value: status,
      onChange: setStatus,
      icon: true,
      iconName: 'check'
    },
    {
      multiple: true,
      options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      value: categories,
      onChange: setCategories,
      placeholder: 'Select categories...',
      icon: true,
      iconName: 'coffee'
    },
    {
      options: ['All Dates', 'Today', 'This Week', 'This Month'],
      value: dateRange,
      onChange: setDateRange,
      icon: true,
      iconName: 'calendar'
    }
  ]

  return (
    <FiltersBar
      labels={false}
      searchbox={true}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder='Search...'
      filters={filters}
      onApply={() =>
        console.log('Apply clicked', { status, categories, dateRange })
      }
      applyLabel='Apply'
    />
  )
}

export const WithoutSearchbox = () => {
  return (
    <FiltersBar labels={false} onApply={() => console.log('Apply clicked')}>
      <Select
        options={['All Status', 'Active', 'Inactive']}
        icon={true}
        iconName='check'
        searchable={false}
        onChange={() => {}}
      />
      <Select
        options={['All Categories', 'Category 1', 'Category 2']}
        icon={true}
        iconName='coffee'
        searchable={false}
        onChange={() => {}}
      />
    </FiltersBar>
  )
}

export const WithLabels = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All Status')
  const [categories, setCategories] = useState([])
  const [dateRange, setDateRange] = useState('All Dates')

  const filters = [
    {
      label: 'Status',
      options: ['All Status', 'Active', 'Inactive'],
      value: status,
      onChange: setStatus,
      icon: true,
      iconName: 'check'
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
      iconName: 'coffee'
    },
    {
      label: 'Date Range',
      options: ['All Dates', 'Today', 'This Week', 'This Month'],
      value: dateRange,
      onChange: setDateRange,
      icon: true,
      iconName: 'calendar'
    }
  ]

  return (
    <FiltersBar
      labels={true}
      border
      dropdownMaxHeight={220}
      searchbox={true}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder='Search...'
      filters={filters}
      onApply={() =>
        console.log('Apply clicked', { status, categories, dateRange })
      }
      applyLabel='Apply'
    />
  )
}

export const WithActionSlots = () => {
  const [status, setStatus] = useState('All Status')
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log('Refresh finished')
    setLoading(false)
  }

  return (
    <FiltersBar
      labels
      border
      filters={[
        {
          label: 'Status',
          options: ['All Status', 'Active', 'Inactive'],
          value: status,
          onChange: (value) => value && setStatus(value),
          icon: true,
          iconName: 'check'
        }
      ]}
      onApply={() => console.log('Apply', status)}
      startActions={
        <Button
          variant='subtle'
          size='large'
          label='Reset'
          onClick={() => setStatus('All Status')}
        />
      }
      beforeApply={
        <Button
          variant='outline'
          size='large'
          label='Preview'
          onClick={() => console.log('Preview', status)}
        />
      }
      afterApply={
        <>
          <Button
            variant='outline'
            size='large'
            label={loading ? 'Refreshing...' : 'Refresh'}
            onClick={handleRefresh}
            disabled={loading}
          />
          <Button
            variant='outline'
            size='large'
            label='Generate'
            onClick={() => console.log('Generate')}
          />
        </>
      }
    />
  )
}
