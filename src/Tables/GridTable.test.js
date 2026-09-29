import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { GridTable } from './GridTable/GridTable'
import { ActionsCell } from './GridTable/cells/ActionsCell'
import { StatusCell } from './GridTable/cells/StatusCell'
import { MoneyCell } from './GridTable/cells/MoneyCell'
import { buildCsv } from './GridTable/exportCsv'
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

  it('filters rows from a column filter', () => {
    render(<GridTable columns={columns} rows={rows} getRowId={(row) => row.id} />)
    click(container.querySelector('button[aria-label="Filter Host"]'))
    const input = container.querySelector('[data-bs-filter="popover"] input')
    expect(input).toBeTruthy()
    change(input, 'ikea')
    expect(container.textContent).toContain('IKEA')
    expect(container.textContent).not.toContain('Currys')
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
})
