import React, { useMemo, useState } from 'react';
import { FiltersBar } from '../AdvancedComponents/FiltersBar';
import { ActionsCell } from './GridTable/cells/ActionsCell';
import { StatusCell } from './GridTable/cells/StatusCell';
import { GridTable } from './GridTable/GridTable';
import type { Column, GridTableRowId } from './GridTable/GridTable.types';
import { avgBy, sumBy } from './GridTable/GridTable.utils';

export default {
  title: 'Tables & Lists/GridTable',
  component: GridTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Admin-ready grid for BrandSwopAdmin entity lists, insight reports, pickers, and nested rows. Place FiltersBar above the table. See src/Tables/GridTable/README.md.',
      },
    },
    backgrounds: {
      default: 'grey1',
      values: [
        { name: 'grey1', value: '#f2f2f2' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
};

type OfferStatus = 'Active' | 'Inactive' | 'Needs approval' | 'In test';

type OfferRow = {
  id: string;
  name: string;
  advertiser: string;
  status: OfferStatus;
  createdAt: string;
};

type InsightRow = {
  id: string;
  campaign: string;
  loads: number;
  sales: number;
  seen: number;
  commission: number;
  cvr: number;
};

type PartnerRow = {
  id: string;
  partner: string;
  type: string;
  offers: number;
};

type NestedOffer = {
  id: string;
  offer: string;
  commission: number;
};

const offers: OfferRow[] = [
  {
    id: 'o1',
    name: 'Summer welcome pack with a very long offer title that should wrap',
    advertiser: 'Beer52',
    status: 'Active',
    createdAt: '2026-03-12',
  },
  {
    id: 'o2',
    name: 'Free shipping over £20',
    advertiser: 'SnackBox',
    status: 'Needs approval',
    createdAt: '2026-04-02',
  },
  {
    id: 'o3',
    name: 'BOGOHP selected lines',
    advertiser: 'Fitmeal',
    status: 'In test',
    createdAt: '2026-01-18',
  },
  {
    id: 'o4',
    name: 'Weekend flash sale',
    advertiser: 'Currys',
    status: 'Inactive',
    createdAt: '2025-11-09',
  },
  {
    id: 'o5',
    name: 'New customer 10%',
    advertiser: 'IKEA',
    status: 'Active',
    createdAt: '2026-05-21',
  },
];

const insightRows: InsightRow[] = [
  { id: 'c1', campaign: 'Spring hosts', loads: 1200, sales: 48, seen: 62, commission: 830, cvr: 4 },
  { id: 'c2', campaign: 'DIY weekend', loads: 860, sales: 0, seen: 0, commission: 0, cvr: 0 },
  { id: 'c3', campaign: 'Electronics', loads: 2400, sales: 96, seen: 71, commission: 1420, cvr: 4 },
  { id: 'c4', campaign: 'Garden', loads: 310, sales: 12, seen: 40, commission: 95, cvr: 3.87 },
  { id: 'c5', campaign: 'Home office', loads: 1500, sales: 45, seen: 55, commission: 410, cvr: 3 },
];

const partners: PartnerRow[] = [
  { id: 'p1', partner: 'Kotsovolos', type: 'Host', offers: 5 },
  { id: 'p2', partner: 'Currys', type: 'Host', offers: 2 },
  { id: 'p3', partner: 'Lymp Adv', type: 'Advertiser', offers: 3 },
];

const nestedOffers: Record<string, NestedOffer[]> = {
  p1: [
    { id: 'n1', offer: 'Summer offer 9.99', commission: 10 },
    { id: 'n2', offer: '30% discount', commission: 8 },
  ],
  p2: [{ id: 'n3', offer: 'Free shipping on orders over £20', commission: 6 }],
  p3: [{ id: 'n4', offer: 'Buy one get one half price', commission: 12 }],
};

export const EntityList = () => {
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const rows = useMemo(
    () => (status === 'All' ? offers : offers.filter((row) => row.status === status)),
    [status]
  );

  const columns: Column<OfferRow>[] = [
    { id: 'name', header: 'Offer', accessor: 'name', type: 'text', minWidth: 220, flex: 1 },
    { id: 'advertiser', header: 'Advertiser', accessor: 'advertiser', type: 'text' },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      type: 'status',
      render: ({ value }) => <StatusCell value={value} />,
    },
    { id: 'createdAt', header: 'Created', accessor: 'createdAt', type: 'date' },
    {
      id: 'actions',
      header: 'Actions',
      type: 'actions',
      render: ({ row }) => (
        <ActionsCell
          actions={[
            { icon: 'pencil', ariaLabel: `Edit ${row.name}`, onClick: () => undefined },
            { icon: 'play', ariaLabel: `Start ${row.name}`, onClick: () => undefined },
            { icon: 'trash', ariaLabel: `Delete ${row.name}`, onClick: () => undefined, variant: 'subtle-warning' },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <FiltersBar
        filters={[
          {
            label: 'Status',
            options: ['All', 'Active', 'Inactive', 'Needs approval', 'In test'],
            value: status,
            onChange: (next) => setStatus(next ?? 'All'),
          },
        ]}
      />
      <GridTable
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        density="media"
        filtering={{}}
        pagination={{
          mode: 'server',
          page,
          pageSize,
          total: rows.length,
          onChange: ({ page: nextPage, pageSize: nextSize }) => {
            setPage(nextPage);
            setPageSize(nextSize);
          },
        }}
        onRowClick={(row) => {
          if (row.status === 'Needs approval' || row.status === 'In test') return;
        }}
        getRowClassName={(row) =>
          row.status === 'Needs approval' || row.status === 'In test' ? 'bs-grid-table--rowMuted' : ''
        }
        countryCode="GB"
        stickyHeader
      />
    </div>
  );
};

export const InsightSummary = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const columns: Column<InsightRow>[] = [
    { id: 'campaign', header: 'Campaign', accessor: 'campaign', type: 'text', minWidth: 180 },
    { id: 'loads', header: 'Loads', accessor: 'loads', type: 'number', hideZero: true },
    { id: 'sales', header: 'Sales', accessor: 'sales', type: 'number', hideZero: true, headerTooltip: 'Completed sales' },
    { id: 'seen', header: 'Seen %', accessor: 'seen', type: 'percent', hideZero: true },
    {
      id: 'commission',
      header: 'Commission',
      accessor: 'commission',
      type: 'currency',
      hideZero: true,
      headerTooltip: 'Total commission',
    },
    { id: 'cvr', header: 'CVR', accessor: 'cvr', type: 'percent', hideZero: true },
  ];

  return (
    <GridTable
      rows={insightRows}
      columns={columns}
      getRowId={(row) => row.id}
      filtering={{}}
      exportCsv={{ filename: 'campaign-daily.csv', utf8Bom: true }}
      pagination={{
        mode: 'client',
        page,
        pageSize,
        onChange: ({ page: nextPage, pageSize: nextSize }) => {
          setPage(nextPage);
          setPageSize(nextSize);
        },
      }}
      summary={{
        label: 'Total',
        row: (processed) => {
          const loads = sumBy(processed, (row) => row.loads);
          const sales = sumBy(processed, (row) => row.sales);
          return {
            campaign: 'Total',
            loads,
            sales,
            seen: avgBy(processed, (row) => row.seen),
            commission: sumBy(processed, (row) => row.commission),
            cvr: loads === 0 ? 0 : (sales / loads) * 100,
          };
        },
      }}
      stickyHeader
      countryCode="GB"
    />
  );
};

export const ModalPicker = () => {
  const [selectedIds, setSelectedIds] = useState<GridTableRowId[]>([]);

  return (
    <GridTable
      rows={offers}
      columns={[
        { id: 'name', header: 'Offer', accessor: 'name', type: 'text' },
        { id: 'advertiser', header: 'Advertiser', accessor: 'advertiser', type: 'text' },
      ]}
      getRowId={(row) => row.id}
      density="compact"
      selection={{
        mode: 'multiple',
        selectedIds,
        onChange: (ids) => setSelectedIds(ids),
        isRowSelectable: (row) => row.status !== 'In test',
      }}
    />
  );
};

export const ExpandableNested = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<Record<string, NestedOffer[]>>({});

  return (
    <GridTable
      rows={partners}
      columns={[
        { id: 'partner', header: 'Partner', accessor: 'partner', type: 'text' },
        { id: 'type', header: 'Type', accessor: 'type', type: 'text' },
        { id: 'offers', header: 'Offers', accessor: 'offers', type: 'number' },
      ]}
      getRowId={(row) => row.id}
      expandable={{
        isExpanded: (row) => expandedIds.includes(row.id),
        onToggle: (row) => {
          setExpandedIds((current) =>
            current.includes(row.id) ? current.filter((id) => id !== row.id) : [...current, row.id]
          );
          if (!loaded[row.id]) {
            window.setTimeout(() => {
              setLoaded((current) => ({ ...current, [row.id]: nestedOffers[row.id] ?? [] }));
            }, 250);
          }
        },
        renderExpanded: (row) =>
          loaded[row.id] ? (
            <GridTable
              rows={loaded[row.id]}
              columns={[
                { id: 'offer', header: 'Offer', accessor: 'offer', type: 'text' },
                { id: 'commission', header: 'Commission', accessor: 'commission', type: 'percent' },
              ]}
              getRowId={(child) => child.id}
              density="compact"
            />
          ) : (
            'Loading offers…'
          ),
      }}
    />
  );
};

export const EmptyAndLoading = () => {
  const [loading, setLoading] = useState(true);
  const columns: Column<OfferRow>[] = [
    { id: 'name', header: 'Offer', accessor: 'name', type: 'text' },
    { id: 'status', header: 'Status', accessor: 'status', type: 'status' },
  ];

  return (
    <div>
      <button type="button" onClick={() => setLoading((value) => !value)}>
        Toggle loading
      </button>
      <GridTable
        rows={[]}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        emptyText="No offers found"
      />
    </div>
  );
};
