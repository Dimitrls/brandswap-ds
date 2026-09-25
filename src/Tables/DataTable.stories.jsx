import React, { useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from '../Buttons/Button';
import { IconButton } from '../Buttons/IconButton';
import { Tag } from '../Buttons/Tag';

export default {
  title: 'Tables & Lists/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

const statusTag = (status) => {
  const variant =
    status === 'Active' ? 'positive' : status === 'Pending' ? 'accent2' : 'negative';
  return <Tag label={status} variant={variant} subtle />;
};

const hostRows = [
  { id: 'currys', host: 'Currys', commission: 62, payments: 830, cpa: 0, status: 'Active', categories: 'Food & Beverage' },
  { id: 'screwfix', host: 'Screwfix', commission: 13, payments: 122, cpa: 1, status: 'Pending', categories: 'Furniture' },
  { id: 'bnq', host: 'B&Q', commission: 45, payments: 540, cpa: 0, status: 'Active', categories: 'Travel & Tourism' },
  { id: 'kotsovolos', host: 'Kotsovolos', commission: 85, payments: 922, cpa: 2, status: 'Active', categories: 'Household' },
  { id: 'homebase', host: 'Homebase', commission: 30, payments: 300, cpa: 2, status: 'Pending', categories: 'Travel & Tourism' },
  { id: 'ikea', host: 'IKEA', commission: 120, payments: 1500, cpa: 3, status: 'Active', categories: 'Telecommunications' },
  { id: 'wickes', host: 'Wickes', commission: 29, payments: 250, cpa: 5, status: 'Inactive', categories: 'Photography' },
  { id: 'toolstation', host: 'Toolstation', commission: 20, payments: 200, cpa: 4, status: 'Active', categories: 'Supermarket' },
];

const nestedRows = {
  kotsovolos: [
    { id: '1', advertiser: 'Lymp Adv', offer: 'Summer offer 9.99', commission: 6, ecpm: 62 },
    { id: '2', advertiser: 'Beer52', offer: '30% discount', commission: 3.2, ecpm: 40 },
    { id: '3', advertiser: 'SnackBox', offer: 'Free shipping on orders over £20', commission: 4.5, ecpm: 50 },
    { id: '4', advertiser: 'FitMeal', offer: 'Buy one get one half price', commission: 5, ecpm: 30 },
  ],
};

const money = (value) => `£${value}`;

const hostColumns = [
  { id: 'host', title: 'Host', dataIndex: 'host', sortable: true, filterable: true, minWidth: 180, fixed: 'left' },
  { id: 'commission', title: 'Commission', dataIndex: 'commission', sortable: true, align: 'right', cell: ({ value }) => money(value) },
  { id: 'payments', title: 'Payments', dataIndex: 'payments', sortable: true, align: 'right', cell: ({ value }) => money(value) },
  { id: 'cpa', title: 'CPA', dataIndex: 'cpa', sortable: true, align: 'right', cell: ({ value }) => `${value}%` },
  { id: 'status', title: 'Status', dataIndex: 'status', filterable: true, filterPlaceholder: 'Search status', cell: ({ value }) => statusTag(value) },
  { id: 'categories', title: 'Categories', dataIndex: 'categories', filterable: true, minWidth: 180 },
];

const nestedColumns = [
  { id: 'advertiser', title: 'Advertiser', dataIndex: 'advertiser', sortable: true },
  { id: 'offer', title: 'Offer', dataIndex: 'offer', sortable: true },
  { id: 'commission', title: 'Commission', dataIndex: 'commission', sortable: true, align: 'right', cell: ({ value }) => money(value) },
  { id: 'ecpm', title: 'eCPM', dataIndex: 'ecpm', sortable: true, align: 'right', cell: ({ value }) => money(value) },
];

const hoverActions = () => (
  <>
    <IconButton icon="pencil" ariaLabel="Edit" variant="subtle" sizeVariant="small" size={16} />
    <IconButton icon="download" ariaLabel="Download" variant="subtle" sizeVariant="small" size={16} />
    <IconButton icon="trash" ariaLabel="Delete" variant="warning" sizeVariant="small" size={16} />
  </>
);

const sumTotalRow = (rows) => ({
  host: 'Total',
  commission: money(rows.reduce((sum, row) => sum + row.commission, 0)),
  payments: money(rows.reduce((sum, row) => sum + row.payments, 0)),
});

const scrollColumns = [
  ...hostColumns,
  { id: 'notes', title: 'Notes', minWidth: 220, cell: () => 'Additional column to force horizontal scroll' },
  { id: 'owner', title: 'Owner', minWidth: 160, cell: () => 'Brandswap' },
];

export const Basic = () => (
  <DataTable
    title="Table title"
    columns={hostColumns}
    data={hostRows}
    pagination={{ pageSize: 5 }}
  />
);

export const Selectable = () => (
  <DataTable
    title="Table title"
    columns={hostColumns}
    data={hostRows}
    rowSelection
    pagination={{ pageSize: 5 }}
    bulkActions={({ selectedRowIds, clearSelection }) => (
      <>
        <span>{selectedRowIds.length} of {hostRows.length} selected</span>
        <Button size="small" variant="outline" label="Download" icon="download" />
        <Button size="small" variant="outline" label="Activate" icon="plus" />
        <Button size="small" variant="outline-warning" label="Deactivate" />
        <Button size="small" variant="filled-warning" label="Delete" icon="trash" onClick={clearSelection} />
      </>
    )}
  />
);

export const ExpandableNestedTable = () => (
  <DataTable
    title="Table title"
    columns={hostColumns}
    data={hostRows}
    rowSelection
    pagination={{ pageSize: 5 }}
    expandable={{
      defaultExpandedRowIds: ['kotsovolos'],
      renderExpandedRow: (row) => (
        <DataTable
          nested
          columns={nestedColumns}
          data={nestedRows[row.id] || nestedRows.kotsovolos}
          pagination={false}
        />
      ),
    }}
  />
);

export const ColumnFilters = () => {
  const [filters, setFilters] = useState({});
  return (
    <DataTable
      title="Filterable columns"
      columns={hostColumns}
      data={hostRows}
      filters={filters}
      onFiltersChange={setFilters}
      pagination={{ pageSize: 5 }}
    />
  );
};

export const ExportMenu = () => (
  <DataTable
    title="Table title"
    columns={hostColumns}
    data={hostRows}
    exportFileName="hosts"
    pagination={{ pageSize: 5 }}
  />
);

export const StickyHeaderAndScroll = () => (
  <DataTable
    title="Sticky header"
    columns={scrollColumns}
    data={[...hostRows, ...hostRows]}
    scroll={{ x: 1200, y: 360 }}
    pagination={{ pageSize: 12 }}
  />
);

export const FixedColumns = () => (
  <DataTable
    title="Fixed columns"
    columns={[
      { ...hostColumns[0], fixed: 'left', width: 180 },
      ...hostColumns.slice(1, 5),
      { ...hostColumns[5], fixed: 'right', width: 180 },
      { id: 'notes', title: 'Notes', minWidth: 240, cell: () => 'Scroll horizontally' },
    ]}
    data={hostRows}
    hoverActions={hoverActions}
    scroll={{ x: 1400, y: 320 }}
    pagination={false}
  />
);

export const HoverActions = () => (
  <DataTable
    title="Hover actions"
    columns={hostColumns}
    data={hostRows}
    hoverActions={hoverActions}
    pagination={{ pageSize: 5 }}
  />
);

export const HoverActionsLeft = () => (
  <DataTable
    title="Hover actions left"
    columns={hostColumns}
    data={hostRows}
    hoverActions={hoverActions}
    hoverActionsPosition="left"
    scroll={{ x: 1100 }}
    pagination={{ pageSize: 5 }}
  />
);

export const HoverActionsCenter = () => (
  <DataTable
    title="Hover actions center"
    columns={hostColumns}
    data={hostRows}
    hoverActions={hoverActions}
    hoverActionsPosition="center"
    scroll={{ x: 1100 }}
    pagination={{ pageSize: 5 }}
  />
);

export const HoverActionsRight = () => (
  <DataTable
    title="Hover actions right"
    columns={hostColumns}
    data={hostRows}
    hoverActions={hoverActions}
    hoverActionsPosition="right"
    scroll={{ x: 1100 }}
    pagination={{ pageSize: 5 }}
  />
);

export const TotalRow = () => (
  <DataTable
    title="Total row"
    columns={hostColumns}
    data={hostRows}
    totalRow={({ rows }) => sumTotalRow(rows)}
    pagination={{ pageSize: 5 }}
  />
);

export const StickyTotalRow = () => (
  <DataTable
    title="Sticky total row"
    columns={scrollColumns}
    data={[...hostRows, ...hostRows]}
    totalRow={({ rows }) => sumTotalRow(rows)}
    stickyTotalRow
    scroll={{ x: 1200, y: 360 }}
    pagination={false}
  />
);

export const FullFeatured = () => (
  <DataTable
    title="Table title"
    columns={hostColumns}
    data={hostRows}
    rowSelection
    hoverActions={hoverActions}
    hoverActionsPosition="right"
    totalRow={({ rows }) => sumTotalRow(rows)}
    stickyTotalRow
    exportFileName="hosts"
    scroll={{ y: 420 }}
    pagination={{ pageSize: 5 }}
    expandable={{
      renderExpandedRow: (row) => (
        <DataTable
          nested
          columns={nestedColumns}
          data={nestedRows[row.id] || nestedRows.kotsovolos}
          pagination={false}
        />
      ),
    }}
    bulkActions={({ selectedRowIds }) => (
      <>
        <span>{selectedRowIds.length} of {hostRows.length} selected</span>
        <Button size="small" variant="outline" label="Download" />
        <Button size="small" variant="filled-warning" label="Delete" />
      </>
    )}
  />
);
