import React from 'react';
import Table from '../Tables/Table';

export default {
  title: 'Tables & Lists/Table',
  component: Table,
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
    renderExpandedRow={(row) => <div>Details for {row.name}</div>}
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