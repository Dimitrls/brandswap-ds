import React from 'react';
import Table from './Table';

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
  { key: 'advertiser', label: 'Advertiser', align: 'left', sortable: true },
  { key: 'offer', label: 'Offer', align: 'left', sortable: true },
  { key: 'commission', label: 'Commission', align: 'right', sortable: true },
  { key: 'eCPM', label: 'eCPM', align: 'right' },
];

const subData = [
  { advertiser: 'Lymp Adv', offer: 'Summer offer 9.99', commission: '10%', eCPM: '£1.00' },
  { advertiser: 'Beer52', offer: '30% discount', commission: '10%', eCPM: '£1.00' },
  { advertiser: 'SnackBox', offer: 'Free shipping on orders over £20', commission: '10%', eCPM: '£1.00' },
  { advertiser: 'Fitmeal', offer: 'Buy one get one half price', commission: '5%', eCPM: '£0.50' },
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

