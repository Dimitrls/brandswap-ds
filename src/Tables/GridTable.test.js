import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { GridTable } from './GridTable/GridTable'
import { ActionsCell } from './GridTable/cells/ActionsCell'
import { StatusCell } from './GridTable/cells/StatusCell'
import { MoneyCell } from './GridTable/cells/MoneyCell'
import { buildCsv, buildXls } from './GridTable/exportCsv'
import { avgBy, sumBy } from './GridTable/GridTable.utils'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
  container = null
})

function render(ui) {
  act(() => {
    ReactDOM.render(ui, container)
  })
  return container
}

function click(element) {
  act(() => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}

function change(element, value) {
  act(() => {
    const proto = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
    proto.set.call(element, value)
    element.dispatchEvent(new Event('input', { bubbles: true }))
    element.dispatchEvent(new Event('change', { bubbles: true }))
  })
}

function buttonByText(text) {
  return Array.from(document.querySelectorAll('button')).find((button) => button.textContent === text)
}

function bodyText(columnIndex = 0) {
  return Array.from(container.querySelectorAll('tbody tr:not(.bs-grid-table--emptyRow)')).map(
    (row) => row.querySelectorAll('td:not(.bs-grid-table--hoverAnchor)')[columnIndex].textContent
  )
}

const rows = [
  { id: 'currys', host: 'Currys', commission: 8.5, sales: 10, status: 'Active' },
  { id: 'ikea', host: 'IKEA', commission: 4, sales: 0, status: 'Inactive' },
  { id: 'wickes', host: 'Wickes', commission: 6.75, sales: 5, status: 'Active' }
]

const columns = [
  { id: 'host', header: 'Host', accessor: 'host', type: 'text', sortable: true, filterable: true },
  { id: 'commission', header: 'Commission', accessor: 'commission', type: 'number', sortable: true },
  { id: 'sales', header: 'Sales', accessor: 'sales', type: 'number', hideZero: true },
  { id: 'status', header: 'Status', accessor: 'status', type: 'status' }
]

describe('GridTable', () => {
  it('renders columns and data', () => {
    render(<GridTable columns={columns} rows={rows} getRowId={(row) => row.id} />)
    expect(container.textContent).toContain('Host')
    expect(container.textContent).toContain('Currys')
    expect(container.textContent).toContain('IKEA')
  })

  it('sorts a sortable column through unsorted → asc → desc', () => {
    render(<GridTable columns={columns} rows={rows} getRowId={(row) => row.id} />)
    const sortButton = container.querySelector('button[aria-label="Sort by Host"]')
    const hostCells = () =>
      Array.from(container.querySelectorAll('tbody tr td:first-child')).map((cell) => cell.textContent)

    expect(hostCells()).toEqual(['Currys', 'IKEA', 'Wickes'])
    click(sortButton)
    expect(hostCells()).toEqual(['Currys', 'IKEA', 'Wickes'])
    expect(container.querySelector('th[aria-sort="ascending"]')).toBeTruthy()
    click(sortButton)
    expect(hostCells()).toEqual(['Wickes', 'IKEA', 'Currys'])
    expect(container.querySelector('th[aria-sort="descending"]')).toBeTruthy()
    click(sortButton)
    expect(container.querySelector('th[aria-sort="ascending"]')).toBeFalsy()
  })

  it('applies a column filter only on Apply and removes it on Clear', () => {
    render(<GridTable columns={columns} rows={rows} getRowId={(row) => row.id} />)
    click(container.querySelector('button[aria-label="Filter Host"]'))
    const input = document.querySelector('[data-bs-filter="popover"] input')
    expect(input).toBeTruthy()
    change(input, 'ikea')
    expect(container.textContent).toContain('Currys')
    click(buttonByText('Apply'))
    expect(document.querySelector('[data-bs-filter="popover"]')).toBeFalsy()
    expect(container.textContent).toContain('IKEA')
    expect(container.textContent).not.toContain('Currys')

    click(container.querySelector('button[aria-label="Filter Host"]'))
    expect(document.querySelector('[data-bs-filter="popover"] input').value).toBe('ikea')
    click(buttonByText('Clear'))
    expect(container.textContent).toContain('Currys')
  })

  it('applies a column filter on Enter', () => {
    render(<GridTable columns={columns} rows={rows} getRowId={(row) => row.id} />)
    click(container.querySelector('button[aria-label="Filter Host"]'))
    const input = document.querySelector('[data-bs-filter="popover"] input')
    change(input, 'wick')
    act(() => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    })
    expect(bodyText()).toEqual(['Wickes'])
  })

  it('skips client sort and filter in server modes and reports changes', () => {
    const onSortChange = jest.fn()
    const onQuickFilterChange = jest.fn()
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        sortMode="server"
        filterMode="server"
        onSortChange={onSortChange}
        filtering={{ onQuickFilterChange }}
      />
    )
    click(container.querySelector('button[aria-label="Sort by Host"]'))
    click(container.querySelector('button[aria-label="Sort by Host"]'))
    expect(onSortChange).toHaveBeenLastCalledWith({ field: 'host', direction: 'desc' })
    change(container.querySelector('input[aria-label="Quick filter"]'), 'wickes')
    expect(onQuickFilterChange).toHaveBeenLastCalledWith('wickes')
    expect(bodyText()).toEqual(['Currys', 'IKEA', 'Wickes'])
  })

  it('applies a quick filter across primitive values', () => {
    render(<GridTable columns={columns} rows={rows} getRowId={(row) => row.id} filtering={{}} />)
    const search = container.querySelector('input[aria-label="Quick filter"]')
    change(search, 'wickes')
    expect(container.textContent).toContain('Wickes')
    expect(container.textContent).not.toContain('Currys')
  })

  it('recomputes summary from filtered rows, not raw data', () => {
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        filtering={{}}
        summary={{
          label: 'Total',
          row: (processed) => ({
            host: 'Total',
            commission: sumBy(processed, (row) => row.commission),
            sales: sumBy(processed, (row) => row.sales),
            status: ''
          })
        }}
      />
    )
    expect(container.querySelector('tfoot').textContent).toContain('19.25')
    const search = container.querySelector('input[aria-label="Quick filter"]')
    change(search, 'ikea')
    expect(container.querySelector('tfoot').textContent).toContain('4')
    expect(container.querySelector('tfoot').textContent).not.toContain('19.25')
  })

  it('renders several summary rows in order with their own class', () => {
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        summary={[
          { label: 'Total', row: (processed) => ({ commission: sumBy(processed, (row) => row.commission) }) },
          { label: 'Average', className: 'average-row', row: (processed) => ({ commission: avgBy(processed, (row) => row.commission) }) }
        ]}
      />
    )
    const summaryRows = container.querySelectorAll('tfoot tr')
    expect(summaryRows.length).toBe(2)
    expect(summaryRows[0].textContent).toContain('Total')
    expect(summaryRows[1].textContent).toContain('Average')
    expect(summaryRows[1].classList.contains('average-row')).toBe(true)
  })

  it('paginates client rows and skips slice in server mode', () => {
    function ClientPager() {
      const [page, setPage] = useState(1)
      return (
        <GridTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          pagination={{
            mode: 'client',
            page,
            pageSize: 1,
            onChange: ({ page: next }) => setPage(next)
          }}
        />
      )
    }

    render(<ClientPager />)
    expect(container.textContent).toContain('Currys')
    expect(container.textContent).not.toContain('IKEA')
    click(container.querySelector('button[aria-label="Next"]'))
    expect(container.textContent).toContain('IKEA')
    expect(container.textContent).not.toContain('Currys')

    ReactDOM.unmountComponentAtNode(container)
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pagination={{
          mode: 'server',
          page: 1,
          pageSize: 1,
          total: 30,
          onChange: () => {}
        }}
      />
    )
    expect(container.textContent).toContain('Currys')
    expect(container.textContent).toContain('IKEA')
    expect(container.textContent).toContain('Wickes')
  })

  it('shows all rows when page size is All', () => {
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pagination={{
          mode: 'client',
          page: 1,
          pageSize: -1,
          onChange: () => {}
        }}
      />
    )
    expect(container.textContent).toContain('Currys')
    expect(container.textContent).toContain('IKEA')
    expect(container.textContent).toContain('Wickes')
  })

  it('supports single and multiple selection with header indeterminate', () => {
    const onChange = jest.fn()
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        selection={{ mode: 'multiple', defaultSelectedIds: ['currys'], onChange }}
      />
    )
    const selectAll = container.querySelector('thead input[type="checkbox"]')
    expect(selectAll.indeterminate).toBe(true)
    expect(selectAll.checked).toBe(false)

    click(container.querySelectorAll('tbody input[type="checkbox"]')[1])
    const [ids] = onChange.mock.calls[0]
    expect(ids).toEqual(['currys', 'ikea'])

    ReactDOM.unmountComponentAtNode(container)
    const singleChange = jest.fn()
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        selection={{ mode: 'single', onChange: singleChange }}
      />
    )
    expect(container.querySelector('thead input[type="checkbox"]')).toBeFalsy()
    const boxes = container.querySelectorAll('tbody input[type="checkbox"]')
    click(boxes[0])
    click(boxes[1])
    expect(singleChange.mock.calls[1][0]).toEqual(['ikea'])
  })

  it('does not fire onRowClick when an action button is clicked', () => {
    const onRowClick = jest.fn()
    render(
      <GridTable
        columns={[
          ...columns,
          {
            id: 'actions',
            header: 'Actions',
            type: 'actions',
            render: ({ row }) => (
              <ActionsCell actions={[{ icon: 'pencil', ariaLabel: `Edit ${row.host}`, onClick: () => {} }]} />
            )
          }
        ]}
        rows={rows}
        getRowId={(row) => row.id}
        onRowClick={onRowClick}
      />
    )
    click(container.querySelector('button[aria-label="Edit Currys"]'))
    expect(onRowClick).not.toHaveBeenCalled()
    click(container.querySelector('tbody tr'))
    expect(onRowClick).toHaveBeenCalled()
  })

  it('exports CSV with a UTF-8 BOM from processed rows', () => {
    const csv = buildCsv(rows, columns, { utf8Bom: true })
    expect(csv.charCodeAt(0)).toBe(0xfeff)
    expect(csv).toContain('Host,Commission,Sales,Status')
    expect(csv).toContain('Currys')

    const created = []
    const original = URL.createObjectURL
    URL.createObjectURL = (blob) => {
      created.push(blob)
      return 'blob:grid-table'
    }
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        filtering={{ defaultQuickFilter: 'ikea' }}
        exportCsv={{ filename: 'hosts.csv' }}
      />
    )
    click(container.querySelector('button[aria-label="Export CSV"]'))
    expect(created.length).toBe(1)
    URL.createObjectURL = original
    clickSpy.mockRestore()
  })

  it('hides zero metric cells', () => {
    render(<GridTable columns={columns} rows={rows} getRowId={(row) => row.id} />)
    const salesHeaderIndex = 2
    const salesCells = Array.from(container.querySelectorAll('tbody tr')).map(
      (row) => row.querySelectorAll('td')[salesHeaderIndex].textContent
    )
    expect(salesCells[0]).toContain('10')
    expect(salesCells[1]).toBe('')
    expect(salesCells[2]).toContain('5')
  })

  it('keeps nested expanded content in the DOM', () => {
    const Example = () => {
      const [open, setOpen] = useState(['currys'])
      return (
        <GridTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          expandable={{
            isExpanded: (row) => open.includes(row.id),
            onToggle: (row) =>
              setOpen((current) =>
                current.includes(row.id) ? current.filter((id) => id !== row.id) : [...current, row.id]
              ),
            renderExpanded: (row) => (
              <GridTable
                columns={[{ id: 'host', header: 'Child', accessor: 'host' }]}
                rows={[{ id: `${row.id}-child`, host: `Nested ${row.host}` }]}
                getRowId={(child) => child.id}
              />
            )
          }}
        />
      )
    }
    render(<Example />)
    expect(container.textContent).toContain('Nested Currys')
    expect(container.querySelector('.bs-grid-table--expandedCell .bs-grid-table')).toBeTruthy()
    click(container.querySelector('button[aria-label="Collapse row currys"]'))
    expect(container.textContent).not.toContain('Nested Currys')
  })

  it('shows an empty state and a loading overlay', () => {
    render(
      <GridTable columns={columns} rows={[]} getRowId={(row) => row.id} emptyText="No offers found" />
    )
    expect(container.textContent).toContain('No offers found')
    ReactDOM.unmountComponentAtNode(container)
    render(<GridTable columns={columns} rows={rows} getRowId={(row) => row.id} loading />)
    expect(container.querySelector('[role="status"]')).toBeTruthy()
    expect(container.querySelector('.bs-grid-table--spinner')).toBeTruthy()
  })

  it('renders status and money helpers', () => {
    render(
      <div>
        <StatusCell value="Active" />
        <MoneyCell value={10} countryCode="GB" />
      </div>
    )
    expect(container.textContent).toContain('Active')
    expect(container.textContent).toMatch(/£10/)
    expect(avgBy(rows, (row) => row.sales)).toBeCloseTo(5)
  })

  it('shows a bulk-actions bar for selected rows and clears selection', () => {
    const bulkActions = jest.fn(({ selectedRows }) => (
      <button type="button">{`Archive ${selectedRows.map((row) => row.host).join('+')}`}</button>
    ))
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        selection={{ mode: 'multiple' }}
        bulkActions={bulkActions}
      />
    )
    expect(container.querySelector('[aria-label="Bulk actions"]')).toBeFalsy()
    const boxes = container.querySelectorAll('tbody input[type="checkbox"]')
    click(boxes[0])
    click(boxes[2])
    const bar = container.querySelector('[aria-label="Bulk actions"]')
    expect(bar.textContent).toContain('2 of 3 selected')
    expect(bar.textContent).toContain('Archive Currys+Wickes')
    click(buttonByText('Clear selection'))
    expect(container.querySelector('[aria-label="Bulk actions"]')).toBeFalsy()
    expect(container.querySelectorAll('tbody input:checked').length).toBe(0)
  })

  it('offers CSV and XLS from an export menu and honours export overrides', () => {
    const xls = buildXls(rows, columns)
    expect(xls).toContain('<Data ss:Type="Number">8.5</Data>')
    expect(xls).toContain('<Data ss:Type="String">Currys</Data>')

    const created = []
    const original = URL.createObjectURL
    URL.createObjectURL = (blob) => {
      created.push(blob)
      return 'blob:grid-table'
    }
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    const onExportCsv = jest.fn()
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        onExportCsv={onExportCsv}
        exportXls={{ filename: 'hosts.xls' }}
      />
    )
    click(container.querySelector('button[aria-label="Export"]'))
    click(buttonByText('Export as CSV'))
    expect(onExportCsv).toHaveBeenCalledTimes(1)
    expect(created.length).toBe(0)
    click(container.querySelector('button[aria-label="Export"]'))
    click(buttonByText('Export as XLS'))
    expect(created.length).toBe(1)
    expect(created[0].type).toBe('application/vnd.ms-excel')
    URL.createObjectURL = original
    clickSpy.mockRestore()
  })

  it('drops hidden columns and moves pinned columns to their edge', () => {
    render(
      <GridTable
        columns={[
          { id: 'status', header: 'Status', accessor: 'status', pinned: 'right' },
          { id: 'commission', header: 'Commission', accessor: 'commission', hidden: true },
          { id: 'sales', header: 'Sales', accessor: 'sales' },
          { id: 'host', header: 'Host', accessor: 'host', pinned: 'left' }
        ]}
        rows={rows}
        getRowId={(row) => row.id}
        selection={{ mode: 'multiple' }}
      />
    )
    const headers = Array.from(container.querySelectorAll('thead th')).map((th) => th.textContent)
    expect(headers).toEqual(['Select all rows', 'Host', 'Sales', 'Status'])
    const [selectTh, hostTh, salesTh, statusTh] = container.querySelectorAll('thead th')
    expect(selectTh.className).toContain('bs-grid-table--pinned')
    expect(hostTh.className).toContain('bs-grid-table--pinnedLeftEdge')
    expect(hostTh.style.left).toBe('0px')
    expect(salesTh.className).not.toContain('bs-grid-table--pinned')
    expect(statusTh.className).toContain('bs-grid-table--pinnedRightEdge')
    expect(statusTh.style.right).toBe('0px')
  })

  it('renders hover actions without triggering row click', () => {
    const onRowClick = jest.fn()
    const onArchive = jest.fn()
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        onRowClick={onRowClick}
        hoverActions={(row) => (
          <button type="button" aria-label={`Archive ${row.host}`} onClick={() => onArchive(row.id)} />
        )}
        hoverActionsPosition="center"
      />
    )
    expect(container.querySelector('.bs-grid-table--hoverCenter')).toBeTruthy()
    click(container.querySelector('button[aria-label="Archive IKEA"]'))
    expect(onArchive).toHaveBeenCalledWith('ikea')
    expect(onRowClick).not.toHaveBeenCalled()
    expect(bodyText()).toEqual(['Currys', 'IKEA', 'Wickes'])
  })

  it('owns pagination when uncontrolled and resets to page 1 on filter', () => {
    const onChange = jest.fn()
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        filtering={{}}
        pagination={{ defaultPageSize: 1, onChange }}
      />
    )
    expect(bodyText()).toEqual(['Currys'])
    click(container.querySelector('button[aria-label="Next"]'))
    expect(bodyText()).toEqual(['IKEA'])
    expect(onChange).toHaveBeenLastCalledWith({ page: 2, pageSize: 1 })
    change(container.querySelector('input[aria-label="Quick filter"]'), 'kes')
    expect(onChange).toHaveBeenLastCalledWith({ page: 1, pageSize: 1 })
    expect(bodyText()).toEqual(['Wickes'])
  })

  it('owns expansion from defaultExpandedIds and reports changes', () => {
    const onExpandedChange = jest.fn()
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        expandable={{
          defaultExpandedIds: ['ikea'],
          onExpandedChange,
          renderExpanded: (row) => `Details ${row.host}`
        }}
      />
    )
    expect(container.textContent).toContain('Details IKEA')
    click(container.querySelector('button[aria-label="Expand row currys"]'))
    expect(container.textContent).toContain('Details Currys')
    expect(onExpandedChange).toHaveBeenLastCalledWith(['ikea', 'currys'])
  })

  it('renders a title and caps the scroll height with a sticky header', () => {
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        title="Hosts"
        maxHeight={240}
        summary={{ row: { host: 'Total' } }}
      />
    )
    expect(container.querySelector('.bs-grid-table--title h3').textContent).toBe('Hosts')
    const scroll = container.querySelector('.bs-grid-table--scroll')
    expect(scroll.style.maxHeight).toBe('240px')
    expect(scroll.className).toContain('bs-grid-table--sticky')
    expect(scroll.className).toContain('bs-grid-table--stickySummary')
  })

  it('renders the filter popover and export menu outside the scroll area', () => {
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        maxHeight={120}
        exportCsv={{}}
        exportXls={{}}
      />
    )
    const scroll = container.querySelector('.bs-grid-table--scroll')
    click(container.querySelector('button[aria-label="Filter Host"]'))
    const popover = document.querySelector('[data-bs-filter="popover"]')
    expect(popover).toBeTruthy()
    expect(scroll.contains(popover)).toBe(false)
    expect(popover.style.position).toBe('fixed')

    const exportButton = container.querySelector('button[aria-label="Export"]')
    act(() => {
      exportButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })
    click(exportButton)
    expect(document.querySelector('[data-bs-filter="popover"]')).toBeFalsy()
    const menu = document.querySelector('.bs-grid-table--menu')
    expect(menu).toBeTruthy()
    expect(container.contains(menu)).toBe(false)
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(document.querySelector('.bs-grid-table--menu')).toBeFalsy()
  })

  it('falls back to row indexes when getRowId is omitted', () => {
    const onChange = jest.fn()
    render(<GridTable columns={columns} rows={rows} selection={{ mode: 'multiple', onChange }} />)
    click(container.querySelectorAll('tbody input[type="checkbox"]')[2])
    expect(onChange).toHaveBeenLastCalledWith([2], [rows[2]])
    click(container.querySelector('button[aria-label="Sort by Host"]'))
    click(container.querySelector('button[aria-label="Sort by Host"]'))
    expect(bodyText(1)).toEqual(['Wickes', 'IKEA', 'Currys'])
    expect(container.querySelectorAll('tbody input[type="checkbox"]')[0].checked).toBe(true)
  })

  it('accepts rich empty content, a nested style and a table minimum width', () => {
    render(
      <GridTable
        columns={columns}
        rows={[]}
        nested
        tableMinWidth={1200}
        title="Hidden in nested"
        emptyText={
          <span>
            Nothing here. <a href="#create">Create one</a>
          </span>
        }
      />
    )
    const root = container.querySelector('.bs-grid-table')
    expect(root.className).toContain('bs-grid-table--nested')
    expect(root.className).toContain('bs-grid-table--density-compact')
    expect(container.querySelector('.bs-grid-table--emptyRow a').textContent).toBe('Create one')
    expect(container.querySelector('.bs-grid-table--table').style.minWidth).toBe('1200px')
  })

  it('renders the export action in the toolbar before pagination', () => {
    render(
      <GridTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        filtering={{}}
        pagination={{ pageSize: 2 }}
        exportCsv={{}}
      />
    )
    const toolbar = container.querySelector('.bs-grid-table--toolbar')
    const corner = toolbar.querySelector('.bs-grid-table--cornerActions')
    const pagination = toolbar.querySelector('.bs-grid-table--pagination')
    expect(corner.querySelector('button[aria-label="Export CSV"]')).toBeTruthy()
    expect(corner.compareDocumentPosition(pagination) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(container.querySelector('.bs-grid-table--body .bs-grid-table--cornerActions')).toBeFalsy()
  })

  it('keeps the export action in the toolbar when there is no pagination', () => {
    render(<GridTable columns={columns} rows={rows} getRowId={(row) => row.id} exportCsv={{}} />)
    const toolbar = container.querySelector('.bs-grid-table--toolbar')
    const corner = toolbar.querySelector('.bs-grid-table--cornerActions')
    expect(corner.querySelector('button[aria-label="Export CSV"]')).toBeTruthy()
    expect(toolbar.querySelector('.bs-grid-table--pagination')).toBeFalsy()
  })
})
