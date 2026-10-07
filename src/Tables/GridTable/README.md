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
| `columns` | `Column<T>`: `id`, `header`, `accessor`, `width` / `minWidth` / `flex`, `align`, `type`, `render`, `sortable`, `filterable`, `filterOperators`, `sortComparator`, `headerTooltip`, `hideZero`, `hidden`, `pinned` (`left` / `right`) |
| `getRowId` | `(row, index) => id`. Optional: defaults to the row's index in `rows`, which breaks selection / expansion if rows are refetched or reordered, so pass a real id for live data |
| `title` | Heading above the toolbar (string renders an `h3`) |
| `loading` | Overlay spinner over the grid body |
| `emptyText` | Any `ReactNode`. Default `"No data"` |
| `density` | `compact` (~36px), `default` (~48px), `media` (70px) |
| `nested` | For a grid inside `renderExpanded`: bordered card, compact 40px rows, title hidden |
| `sorting` / `defaultSorting` / `onSortChange` | Sort `{ field, direction }`. Click cycles unsorted → asc → desc |
| `sortMode` | `client` (default) or `server`: skip client sorting, sort in the API from `onSortChange` |
| `filtering` | Column filters + `quickFilter` across primitive cell values. Column filters apply on **Apply** / Enter; **Clear** removes them |
| `filterMode` | `client` (default) or `server`: skip client quick/column filtering, filter in the API from the filtering callbacks |
| `pagination` | `mode` (`client` default / `server`), 1-based `page` or `defaultPage`, `pageSize` or `defaultPageSize` (`-1` = All), `total`, `pageSizeOptions`, `onChange`, `placement` (`top` default). Sort / filter changes go back to page 1 |
| `selection` | `none` / `single` / `multiple`, `selectedIds`, `onChange`, `isRowSelectable` |
| `bulkActions` | `({ selectedIds, selectedRows, clearSelection }) => ReactNode`, shown in a floating bar over the bottom of the grid while rows are selected. The count reads `n of total selected` |
| `onRowClick` | Skips `button`, `a`, `input`, `label`, `[data-stop-row-click]` |
| `getRowClassName` | e.g. `bs-grid-table--rowMuted` for pending / in-test rows |
| `hoverActions` / `hoverActionsPosition` | Floating action chip on row hover / focus, aligned `left` / `center` / `right` (default) of the visible area |
| `expandable` | `renderExpanded` plus either `isExpanded` / `onToggle`, or `expandedIds` / `defaultExpandedIds` / `onExpandedChange` (`onToggle` still fires, handy for lazy loading). Nested `GridTable` supported |
| `summary` | `tfoot` from **filtered/sorted** rows, not the current page. `row` can be `Partial<T>` or `(processedRows) => Partial<T>`. `sticky` pins it to the bottom |
| `exportCsv` / `exportXls` | Sits in the pagination row, after the page buttons (top or bottom). With no pagination it sits in the table's top-right corner. One format and no `menuItems` exports immediately. Both formats, or any custom item, open a 3-dot menu (`Export as CSV`, `Export as XLS`, then `menuItems`). CSV has a UTF-8 BOM by default |
| `menuItems` | Extra actions-menu entries `{ label, onClick, icon? }`, after the export items |
| `onExportCsv` / `onExportXls` | Replace the built-in download (e.g. server-side export of every page) |
| `stickyHeader` | Sticky header + sticky summary footer |
| `maxHeight` | Caps the scroll area; header and summary stick inside it |
| `tableMinWidth` | Minimum table width; narrower containers scroll horizontally |
| `countryCode` | `GB` (default) or `US` for date / money helpers |

### Pinned columns

`pinned: 'left'` columns move to the start (after the expand / select columns, which pin with them); `pinned: 'right'` columns move to the end. Offsets are measured from the rendered header, so `width` is optional. A shadow shows on the pinned edge while content is scrolled underneath.

Column filter popovers and the export menu render into `document.body`, so `maxHeight` and pinned scroll areas never clip them.

### Column `type`

`text` | `number` | `date` | `currency` | `percent` | `status` | `actions` | `custom`

Defaults: numeric/currency/percent/actions align right; actions are not sortable, filterable, or exported.

### Pipeline

1. Quick filter (skipped when `filterMode="server"`)  
2. Column filters (`contains`, `equals`, `startsWith`, `endsWith`, `gt`, `lt`; skipped when `filterMode="server"`)  
3. Sort (skipped when `sortMode="server"`)  
4. Summary aggregation  
5. Client page slice (skipped for `pagination.mode="server"` or `pageSize === -1`)

For server lists set `sortMode` / `filterMode` to `server` together with `pagination.mode="server"`, otherwise the grid re-sorts and re-filters only the page you passed in. Debounce `onQuickFilterChange` in the app before fetching.

## Admin screens this replaces

**MUI X DataGrid:** offers, campaigns, testing, system logs, invoices, payments, booster, insight grids.

**Ant Design Table:** users, partners, modal pickers, vouchers, postcodes, email suppression, offer-changes audit, offers loader.

Keep in the app: permission gating for actions, server fetch, API export, confirm dialogs, page-level `FiltersBar`.
