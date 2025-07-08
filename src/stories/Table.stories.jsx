import React from 'react';
import Table from '../Tables/Table';

export default {
  title: 'Tables & Lists/Table',
  component: Table,
  parameters: {
    backgrounds: {
      default: 'grey1',
      values: [
        {
          name: 'grey1',
          value: '#f2f2f2',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
  },
};

const columns = [
  { key: 'name', label: 'Name', align: 'left', sortable: true },
  { key: 'email', label: 'Email', align: 'left', sortable: false },
  { key: 'role', label: 'Role', align: 'center', sortable: true },
  { key: 'actions', label: 'Actions', align: 'right', sortable: false },
];

const data = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'Editor' },
];

const totalsRow = { name: 'Total', email: '', role: '3 users' };

const subColumns = [
  { key: 'item', label: 'Item', align: 'left' },
  { key: 'value', label: 'Value', align: 'right' },
];

const subData = [
  { item: 'Subitem 1', value: 'Value 1' },
  { item: 'Subitem 2', value: 'Value 2' },
  { item: 'Subitem 3', value: 'Value 3' },
  { item: 'Subitem 4', value: 'Value 4' },
];

export const AllFeatures = (args) => (
  <Table
    title="User List"
    pagination
    tableActions
    totals
    actionsOnHover
    expandableRows
    columns={columns}
    data={data}
    totalsRow={totalsRow}
    totalPages={3}
    page={1}
    onPageChange={() => {}}
    onSort={() => {}}
    onRowExpand={() => {}}
    renderRowActions={() => <button>Edit</button>}
    renderExpandedRow={(row) => (
      <div>
        <Table columns={subColumns} data={subData} />
      </div>
    )}
    {...args}
  />
);

AllFeatures.storyName = 'All Features';

export const SimpleTable = (args) => (
  <Table
    columns={columns.filter(col => col.key !== 'actions')}
    data={data}
    {...args}
  />
);

SimpleTable.storyName = 'Simple Table (No Actions, No Expand, No Title, No Pagination, No Totals)'; 