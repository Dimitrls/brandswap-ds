import React, { useState } from 'react';
import { DataTable } from './DataTable';
import { DataTableModal } from './DataTable/DataTableModal';
import { Tag } from '../Buttons/Tag';
import { Button } from '../Buttons/Button';
import { IconButton } from '../Buttons/IconButton';
import { Uploader } from '../FormElements/Uploader';
import { Icon } from '../Icons/Icon';
import { BodyText } from '../Typography/BodyText';
import { Switch } from '../FormElements/Switch';

export default {
  title: 'Tables & Lists/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A generic data table. Pass \`columns\` + \`data\`; every other feature is opt-in.

**Columns** — independently set \`sortable\`, \`filterable\`, \`align\`, widths, \`cell\`, \`sortFn\`, and \`filter\`.

**Variants** — \`default\` for grid rows; \`separated\` for rounded, spaced surfaces (simple table / offer list).

**Expansion** — \`renderExpandedRow\` can return another DataTable, custom content, or open a \`DataTableModal\` for large subtables (sticky header/footer via \`stickyHeader\` / \`stickyFooter\`).
        `,
      },
    },
    backgrounds: {
      default: 'grey1',
      values: [
        { name: 'grey1', value: '#f2f2f2' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#343434' },
      ],
    },
  },
};

const gbp = (value) =>
  `£${Number(value).toLocaleString('en-GB', { maximumFractionDigits: 2 })}`;

const hostRows = [
  { id: 'currys', host: 'Currys', commission: 0, payments: 62, cpa: 830, status: 'Active', categories: 'Electronics' },
  { id: 'screwfix', host: 'Screwfix', commission: 0, payments: 45, cpa: 210, status: 'Active', categories: 'DIY' },
  { id: 'bnq', host: 'B&Q', commission: 0, payments: 38, cpa: 190, status: 'Pending', categories: 'Household' },
  { id: 'kotsovolos', host: 'Kotsovolos', commission: 0, payments: 71, cpa: 340, status: 'Active', categories: 'Electronics' },
  { id: 'homebase', host: 'Homebase', commission: 0, payments: 22, cpa: 95, status: 'Inactive', categories: 'Garden' },
  { id: 'ikea', host: 'IKEA', commission: 0, payments: 88, cpa: 410, status: 'Active', categories: 'Home' },
  { id: 'wickes', host: 'Wickes', commission: 0, payments: 31, cpa: 150, status: 'Pending', categories: 'DIY' },
  { id: 'toolstation', host: 'Toolstation', commission: 0, payments: 19, cpa: 80, status: 'Inactive', categories: 'Tools' },
];

const nestedOffers = {
  kotsovolos: [
    { id: 'k1', advertiser: 'TechGadgets', offer: 'Buy one get one half price', commission: 6, ecpm: 62 },
    { id: 'k2', advertiser: 'Lymp Adv', offer: 'Summer offer 9.99', commission: 21, ecpm: 40 },
    { id: 'k3', advertiser: 'Beer52', offer: '30% discount', commission: 9, ecpm: 50 },
    { id: 'k4', advertiser: 'SnackBox', offer: 'Free shipping on orders over £20', commission: 12, ecpm: 18 },
    { id: 'k5', advertiser: 'Fitmeal', offer: 'Buy one, get one free on selected lines', commission: 15, ecpm: 27 },
  ],
  currys: [
    { id: 'c1', advertiser: 'Lymp Adv', offer: 'Summer offer 9.99', commission: 10, ecpm: 1 },
  ],
};

const statusCell = ({ value }) => {
  const variant = value === 'Active' ? 'positive' : value === 'Pending' ? 'accent2' : 'negative';
  return <Tag label={value} variant={variant} />;
};

const hostCell = ({ row }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <span
      style={{
        width: 24,
        height: 24,
        borderRadius: 4,
        background: 'var(--bg1)',
        color: 'var(--text-muted)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name="store" size={14} />
    </span>
    {row.host}
  </span>
);

const nestedColumns = [
  { id: 'advertiser', header: 'Advertiser', accessorKey: 'advertiser', sortable: true },
  {
    id: 'offer',
    header: 'Offer',
    accessorKey: 'offer',
    sortable: true,
    cell: ({ value }) => (
      <span style={{ color: 'var(--primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
        {value}
      </span>
    ),
  },
  { id: 'commission', header: 'Commission', accessorKey: 'commission', sortable: true, align: 'right', cell: ({ value }) => gbp(value) },
  { id: 'ecpm', header: 'eCPM', accessorKey: 'ecpm', sortable: true, align: 'right', cell: ({ value }) => gbp(value) },
];

const hostColumns = [
  { id: 'host', header: 'Host', accessorKey: 'host', sortable: true, cell: hostCell },
  { id: 'commission', header: 'Commission', accessorKey: 'commission', sortable: true, align: 'right', cell: ({ value }) => `${value}%` },
  { id: 'payments', header: 'Payments', accessorKey: 'payments', sortable: true, align: 'right', cell: ({ value }) => gbp(value) },
  { id: 'cpa', header: 'CPA', accessorKey: 'cpa', sortable: true, align: 'right', cell: ({ value }) => gbp(value) },
  { id: 'status', header: 'Status', accessorKey: 'status', filterable: true, filter: { type: 'select', options: ['Active', 'Pending', 'Inactive'] }, cell: statusCell },
  { id: 'categories', header: 'Categories', accessorKey: 'categories', filterable: true },
];

const TableActionsMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        icon="dots-vertical"
        ariaLabel="Table actions"
        variant="subtle"
        sizeVariant="small"
        onClick={() => setOpen((value) => !value)}
      />
      {open && (
        <ul
          role="menu"
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            width: 168,
            background: 'var(--bg-default)',
            borderRadius: 6,
            boxShadow: 'var(--shadow-diffuse)',
            zIndex: 10,
          }}
        >
          {['Export as CSV', 'Export as XLS', 'Edit columns'].map((label) => (
            <li key={label} role="menuitem" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', height: 36, boxSizing: 'border-box' }}>
              <Icon name={label.startsWith('Edit') ? 'pencil' : 'file-export'} size={16} />
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const hoverActions = (row) => (
  <>
    <IconButton icon="pencil" ariaLabel={`Edit ${row.host}`} variant="outline" sizeVariant="small" />
    <IconButton icon="download" ariaLabel={`Download ${row.host}`} variant="outline" sizeVariant="small" />
    <IconButton icon="chevron-down" ariaLabel={`More actions for ${row.host}`} variant="outline" sizeVariant="small" />
    <IconButton icon="trash" ariaLabel={`Delete ${row.host}`} variant="filled-warning" sizeVariant="small" />
  </>
);

const expandedRow = (row) => {
  const nested = nestedOffers[row.id] || [];
  return (
    <DataTable
      columns={nestedColumns}
      data={nested}
      emptyMessage="No nested offers"
      footer={{
        cells: (ctx) => ({
          advertiser: 'Total',
          commission: gbp(ctx.rows.reduce((sum, item) => sum + item.commission, 0)),
          ecpm: gbp(ctx.rows.reduce((sum, item) => sum + item.ecpm, 0)),
        }),
      }}
    />
  );
};

export const Basic = () => (
  <DataTable
    columns={[
      { id: 'host', header: 'Host', accessorKey: 'host' },
      { id: 'status', header: 'Status', accessorKey: 'status', cell: statusCell },
    ]}
    data={hostRows}
  />
);

export const FullFeatured = () => (
  <DataTable
    title="Table title"
    headerActions={<TableActionsMenu />}
    columns={hostColumns}
    data={hostRows}
    selection={{ defaultSelectedRowIds: ['currys', 'screwfix'] }}
    expandable={{
      defaultExpandedRowIds: ['kotsovolos'],
      renderExpandedRow: expandedRow,
    }}
    actions={{ render: hoverActions, showOnHover: true }}
    sorting={{ defaultSort: { id: 'host', direction: 'desc' } }}
    bulkActions={() => (
      <>
        <Button size="small" variant="outline" icon="download" label="Download" />
        <Button size="small" variant="outline" icon="plus" label="Activate" />
        <Button size="small" variant="outline-warning" icon="close" label="Deactivate" />
        <Button size="small" variant="filled-warning" icon="trash" label="Delete" />
      </>
    )}
    addItem={{ label: 'Add item' }}
    pagination={{ pageSize: 8, totalItems: 57, totalPages: 16, defaultPage: 1 }}
    footer={{
      cells: (ctx) => ({
        host: 'Total',
        payments: gbp(ctx.rows.reduce((sum, row) => sum + row.payments, 0)),
        cpa: gbp(ctx.rows.reduce((sum, row) => sum + row.cpa, 0)),
      }),
    }}
  />
);

export const ColumnAlignment = () => (
  <DataTable
    variant="separated"
    columns={[
      { id: 'host', header: 'Host', accessorKey: 'host', sortable: true },
      { id: 'date', header: 'Date', accessorKey: 'date', sortable: true },
      { id: 'declined', header: 'Value of declined transactions (€)', accessorKey: 'declined', sortable: true, align: 'right' },
      { id: 'pendingCount', header: '# Pending transactions', accessorKey: 'pendingCount', sortable: true, align: 'right' },
      { id: 'pendingValue', header: 'Value of pending transactions (€)', accessorKey: 'pendingValue', sortable: true, align: 'right' },
      { id: 'acceptedCount', header: '# Accepted transactions', accessorKey: 'acceptedCount', sortable: true, align: 'right' },
      { id: 'acceptedValue', header: 'Value of accepted transactions (€)', accessorKey: 'acceptedValue', sortable: true, align: 'right' },
    ]}
    data={[
      { id: 1, host: 'Screwfix', date: '05-08-2024', declined: 214, pendingCount: 62, pendingValue: 890, acceptedCount: 2101, acceptedValue: 18400 },
      { id: 2, host: 'Currys', date: '05-08-2024', declined: 88, pendingCount: 14, pendingValue: 240, acceptedCount: 980, acceptedValue: 9200 },
      { id: 3, host: 'B&Q', date: '04-08-2024', declined: 41, pendingCount: 9, pendingValue: 110, acceptedCount: 640, acceptedValue: 5100 },
    ]}
    sorting={{ defaultSort: { id: 'date', direction: 'desc' } }}
  />
);

export const ExpandedSubtable = () => (
  <DataTable
    columns={hostColumns.slice(0, 4)}
    data={hostRows.slice(0, 4)}
    expandable={{
      defaultExpandedRowIds: ['kotsovolos'],
      renderExpandedRow: expandedRow,
    }}
  />
);

export const SubtableModal = () => {
  const [openRow, setOpenRow] = useState(null);
  const nested = openRow
    ? (nestedOffers[openRow.id] || []).concat(
        Array.from({ length: 12 }, (_, index) => ({
          id: `${openRow.id}-extra-${index}`,
          advertiser: `Advertiser ${index + 1}`,
          offer: 'Buy one, get one free on selected lines this season',
          commission: 12 + index,
          ecpm: 18 + index * 2,
        }))
      )
    : [];

  return (
    <>
      <DataTable
        columns={hostColumns.slice(0, 4)}
        data={hostRows.slice(0, 5)}
        onRowClick={(row) => setOpenRow(row)}
      />
      <DataTableModal
        open={Boolean(openRow)}
        title={openRow ? `${openRow.host} subtable title` : ''}
        onClose={() => setOpenRow(null)}
      >
        <DataTable
          columns={nestedColumns}
          data={nested}
          stickyHeader
          stickyFooter
          sorting={{ defaultSort: { id: 'offer', direction: 'desc' } }}
          actions={{
            header: <IconButton icon="dots-vertical" ariaLabel="Column actions" variant="subtle" sizeVariant="small" />,
            render: (row) => (
              <IconButton icon="dots-vertical" ariaLabel={`Actions for ${row.advertiser}`} variant="subtle" sizeVariant="small" />
            ),
          }}
          footer={{
            cells: (ctx) => ({
              advertiser: 'Total',
              commission: gbp(ctx.rows.reduce((sum, item) => sum + item.commission, 0)),
              ecpm: gbp(ctx.rows.reduce((sum, item) => sum + item.ecpm, 0)),
            }),
          }}
        />
      </DataTableModal>
    </>
  );
};

export const SimpleTable = () => (
  <div style={{ background: '#343434', padding: 24, borderRadius: 12 }}>
    <DataTable
      title={<span style={{ color: '#d0d4dc' }}>Table</span>}
      variant="separated"
      columns={[
        { id: 'slot', header: '#', accessorKey: 'slot' },
        { id: 'partner', header: 'Partner', accessorKey: 'partner' },
        {
          id: 'description',
          header: 'Description',
          accessorKey: 'title',
          cell: ({ row }) => (
            <div>
              <div style={{ fontWeight: 600 }}>{row.title}</div>
              <BodyText variant="smallLight" style={{ margin: 0 }}>{row.subtitle}</BodyText>
            </div>
          ),
        },
        { id: 'cpa', header: 'CPA', accessorKey: 'cpa', align: 'right', cell: ({ value }) => `${value}%` },
        { id: 'status', header: 'Status', accessorKey: 'status', align: 'center', cell: statusCell },
      ]}
      data={[
        { id: 1, slot: 1, partner: 'Depo Invest', title: 'Free Banking', subtitle: 'Free banking for 90 days', cpa: 0, status: 'Active' },
        { id: 2, slot: 2, partner: 'Sports cafe', title: 'Welcome bonus', subtitle: '£20 off your first order', cpa: 0, status: 'Active' },
        { id: 3, slot: 3, partner: 'Homebase', title: 'Trade discount', subtitle: '10% off selected ranges', cpa: 0, status: 'Active' },
        { id: 4, slot: 4, partner: 'Currys', title: 'Free delivery', subtitle: 'On orders over £50', cpa: 0, status: 'Active' },
        { id: 5, slot: 5, partner: 'Screwfix', title: 'Trade card', subtitle: 'Extra 5% off for members', cpa: 0, status: 'Active' },
      ]}
      actions={{
        header: 'Actions',
        render: (row) => (
          <>
            <IconButton icon="pencil" ariaLabel={`Edit ${row.partner}`} variant="outline" sizeVariant="small" />
            <IconButton icon="trash" ariaLabel={`Delete ${row.partner}`} variant="filled-warning" sizeVariant="small" />
          </>
        ),
      }}
      addItem={{ label: 'Add item', placement: 'end' }}
    />
  </div>
);

SimpleTable.parameters = { backgrounds: { default: 'dark' } };

export const OfferList = () => (
  <div style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
    <DataTable
      title="Offers list"
      variant="separated"
      hideHeader
      columns={[
        {
          id: 'partner',
          header: 'Partner',
          accessorKey: 'partner',
          cell: ({ row }) => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: 8, background: '#111', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="package" size={18} />
              </span>
              {row.partner}
            </span>
          ),
        },
        {
          id: 'offer',
          header: 'Offer',
          accessorKey: 'title',
          cell: ({ row }) => (
            <div>
              <div style={{ fontWeight: 600 }}>{row.title}</div>
              <BodyText variant="smallLight" style={{ margin: 0 }}>{row.subtitle}</BodyText>
            </div>
          ),
        },
        {
          id: 'cpa',
          header: 'CPA',
          accessorKey: 'cpa',
          align: 'right',
          cell: ({ row }) => (
            <span>
              CPA: <strong>{row.cpa}%</strong>
            </span>
          ),
        },
        {
          id: 'status',
          header: 'Status',
          accessorKey: 'status',
          align: 'right',
          cell: ({ row }) => (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <Tag label={row.status} variant="positive" />
              <BodyText variant="smallLight" style={{ margin: 0 }}>Expires: {row.expires}</BodyText>
            </div>
          ),
        },
      ]}
      data={[
        { id: 'beer52', partner: 'Beer52', title: '65% off your first box', subtitle: '85% off your first box and 20% off for two months', cpa: 0, status: 'Active', expires: '31-12-2025' },
        { id: 'gousto', partner: 'Gousto', title: 'Free cruise', subtitle: 'Free recipe box when you subscribe', cpa: 0, status: 'Active', expires: '31-12-2025' },
        { id: 'graze', partner: 'Graze', title: '50% off snacks', subtitle: 'Half price on your first four boxes', cpa: 0, status: 'Active', expires: '15-03-2026' },
      ]}
      selection={{ defaultSelectedRowIds: ['gousto'], showCheckboxes: false }}
    />
  </div>
);

export const AddItem = () => (
  <DataTable
    columns={[
      { id: 'host', header: 'Host', accessorKey: 'host' },
      { id: 'status', header: 'Status', accessorKey: 'status', cell: statusCell },
    ]}
    data={hostRows.slice(0, 3)}
    addItem={{ label: 'Create item' }}
  />
);

export const SelectionAndBulkActions = () => (
  <DataTable
    columns={[
      { id: 'host', header: 'Host', accessorKey: 'host' },
      { id: 'status', header: 'Status', accessorKey: 'status', cell: statusCell },
    ]}
    data={hostRows}
    selection={{ defaultSelectedRowIds: ['currys', 'ikea'] }}
    bulkActions={() => (
      <>
        <Button size="small" variant="outline" icon="download" label="Download" />
        <Button size="small" variant="filled-warning" icon="trash" label="Delete" />
      </>
    )}
  />
);

export const PaginationExample = () => (
  <DataTable
    columns={[
      { id: 'host', header: 'Host', accessorKey: 'host', sortable: true },
      { id: 'status', header: 'Status', accessorKey: 'status', cell: statusCell },
    ]}
    data={hostRows}
    pagination={{ pageSize: 3, totalPages: 16, totalItems: 48 }}
  />
);

export const UploadList = () => {
  const [enabled, setEnabled] = useState(true);
  const [rows, setRows] = useState([
    { id: 'u1', uploadedOn: '09:38 17-07-2025', count: 1000, status: 'Inactive' },
    { id: 'u2', uploadedOn: '14:22 12-03-2026', count: 250, status: 'Active' },
    { id: 'u3', uploadedOn: '08:11 04-03-2026', count: 4400, status: 'Inactive' },
  ]);

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
      <DataTable
        title="Multiple vouchers"
        headerActions={
          <Switch label="Enable multiple vouchers" checked={enabled} onChange={setEnabled} />
        }
        topContent={<Uploader label="Click to upload or drag & drop" />}
        columns={[
          { id: 'uploadedOn', header: 'Uploaded on', accessorKey: 'uploadedOn', sortable: true },
          { id: 'count', header: 'Count', accessorKey: 'count', sortable: true, align: 'right' },
          {
            id: 'status',
            header: 'Status',
            accessorKey: 'status',
            sortable: true,
            cell: ({ value }) => <Tag label={value} variant={value === 'Active' ? 'positive' : 'neutral'} />,
          },
        ]}
        data={rows}
        pagination={{ pageSize: 5, totalPages: 18, totalItems: 18 }}
        actions={(row) => (
          <>
            <IconButton
              icon={row.status === 'Active' ? 'pause' : 'play'}
              ariaLabel={row.status === 'Active' ? 'Pause' : 'Activate'}
              variant={row.status === 'Active' ? 'outline' : 'filled'}
              sizeVariant="small"
              onClick={() =>
                setRows((current) =>
                  current.map((item) =>
                    item.id === row.id
                      ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' }
                      : item
                  )
                )
              }
            />
            <IconButton
              icon="trash"
              ariaLabel="Delete"
              variant="filled-warning"
              sizeVariant="small"
              onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}
            />
          </>
        )}
      />
    </div>
  );
};

export const SortableColumns = () => (
  <DataTable
    columns={[
      { id: 'host', header: 'Host', accessorKey: 'host', sortable: true },
      { id: 'commission', header: 'Commission', accessorKey: 'commission', sortable: true, align: 'right' },
      { id: 'status', header: 'Status', accessorKey: 'status' },
    ]}
    data={hostRows}
  />
);

export const FilterableColumns = () => (
  <DataTable columns={hostColumns} data={hostRows} />
);

export const Loading = () => <DataTable columns={hostColumns} data={[]} loading />;

export const Empty = () => (
  <DataTable columns={hostColumns} data={[]} emptyMessage="No hosts found" />
);
