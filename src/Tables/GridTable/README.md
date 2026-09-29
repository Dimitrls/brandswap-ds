# GridTable

Admin-ready data grid for BrandSwap. It is a new export alongside the existing presentational `Table` and generic `DataTable`. Import this when replacing MUI X DataGrid or Ant Design `Table` in BrandSwopAdmin.

`FiltersBar` stays **above** the grid. Permission checks, server fetch, API CSV/PDF downloads, and confirmation modals stay in the app.

## Import

```tsx
import {
  GridTable,
  StatusCell,
  ActionsCell,
  MoneyCell,
  PercentCell,
  DateCell,
  sumBy,
  avgBy,
} from 'brandswap-ds';
```

## Props

| Prop | Notes |
| --- | --- |
| `rows` | Row data |
| `columns` | `Column<T>`: `id`, `header`, `accessor`, `width` / `minWidth` / `flex`, `align`, `type`, `render`, `sortable`, `filterable`, `sortComparator`, `headerTooltip`, `hideZero` |
| `getRowId` | Required stable id |
| `loading` | Overlay spinner over the grid body |
| `emptyText` | Default `"No data"` |
| `density` | `compact` (~36px), `default` (~48px), `media` (70px) |
| `sorting` / `onSortChange` | Controlled sort `{ field, direction }`. Click cycles unsorted → asc → desc |
| `filtering` | Column filters + `quickFilter` across primitive cell values |
| `pagination` | `mode: "client" \| "server"`, 1-based `page`, `pageSize` (`-1` = All), `total`, `pageSizeOptions`, `onChange`, `placement` (`top` default) |
| `selection` | `none` / `single` / `multiple`, `selectedIds`, `onChange`, `isRowSelectable` |
| `onRowClick` | Skips `button`, `a`, `input`, `label`, `[data-stop-row-click]` |
| `getRowClassName` | e.g. `bs-grid-table--rowMuted` for pending / in-test rows |
| `expandable` | Controlled `isExpanded` / `onToggle` / `renderExpanded` (nested `GridTable` supported) |
| `summary` | Pinned `tfoot` from **filtered/sorted** rows, not the current page. `row` can be `Partial<T>` or `(processedRows) => Partial<T>` |
| `exportCsv` | Toolbar Export of processed rows. UTF-8 BOM on by default |
| `stickyHeader` | Sticky header + sticky summary footer |
| `countryCode` | `GB` (default) or `US` for date / money helpers |

### Column `type`

`text` | `number` | `date` | `currency` | `percent` | `status` | `actions` | `custom`

Defaults: numeric/currency/percent/actions align right; actions are not sortable, filterable, or exported.

### Pipeline

1. Quick filter  
2. Column filters (`contains`, `equals`, `startsWith`, `endsWith`, `gt`, `lt`)  
3. Sort  
4. Summary aggregation  
5. Client page slice (skipped for `server` or `pageSize === -1`)

Server lists still run client filter/sort on the **provided page**. Keep system-log search in the app (`FiltersBar` + fetch).

## Admin screens this replaces

**MUI X DataGrid:** offers, campaigns, testing, system logs, invoices, payments, booster, insight grids.

**Ant Design Table:** users, partners, modal pickers, vouchers, postcodes, email suppression, offer-changes audit, offers loader.

Keep in the app: permission gating for actions, server fetch, API export, confirm dialogs, page-level `FiltersBar`.
