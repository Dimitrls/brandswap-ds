import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { DataTable } from './DataTable/DataTable'
import { DataTableModal } from './DataTable/DataTableModal'

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
  { id: 'currys', host: 'Currys', commission: 8.5, status: 'Active' },
  { id: 'ikea', host: 'IKEA', commission: 4, status: 'Inactive' },
  { id: 'wickes', host: 'Wickes', commission: 6.75, status: 'Active' }
]

const columns = [
  { id: 'host', header: 'Host', accessorKey: 'host', sortable: true, filterable: true },
  { id: 'commission', header: 'Commission', accessorKey: 'commission', sortable: true, align: 'right' },
  { id: 'status', header: 'Status', accessorKey: 'status' }
]

describe('DataTable', () => {
  it('renders columns and data', () => {
    render(<DataTable columns={columns} data={rows} />)
    expect(container.textContent).toContain('Host')
    expect(container.textContent).toContain('Currys')
    expect(container.textContent).toContain('IKEA')
  })

  it('sorts a sortable column through unsorted → asc → desc', () => {
    render(<DataTable columns={columns} data={rows} />)
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
    render(<DataTable columns={columns} data={rows} />)
    click(container.querySelector('button[aria-label="Filter Host"]'))
    const input = container.querySelector('input')
    expect(input).toBeTruthy()
    change(input, 'ikea')
    expect(container.textContent).toContain('IKEA')
    expect(container.textContent).not.toContain('Currys')
  })

  it('selects individual rows and exposes selected ids', () => {
    const onChange = jest.fn()
    render(
      <DataTable
        columns={columns}
        data={rows}
        selection={{ onChange }}
      />
    )
    const rowCheckbox = container.querySelector('input[type="checkbox"][aria-label], label input[type="checkbox"]')
    const checkboxes = container.querySelectorAll('tbody input[type="checkbox"]')
    click(checkboxes[0])
    expect(onChange).toHaveBeenCalled()
    const [ids, selectedRows] = onChange.mock.calls[0]
    expect(ids).toEqual(['currys'])
    expect(selectedRows[0].host).toBe('Currys')
    expect(rowCheckbox).toBeTruthy()
  })

  it('selects all visible rows from the header checkbox', () => {
    const onChange = jest.fn()
    render(
      <DataTable
        columns={columns}
        data={rows}
        selection={{ onChange }}
      />
    )
    const selectAll = container.querySelector('thead input[type="checkbox"]')
    click(selectAll)
    const [ids] = onChange.mock.calls[0]
    expect(ids).toEqual(['currys', 'ikea', 'wickes'])
  })

  it('marks the header checkbox indeterminate when some rows are selected', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        selection={{ defaultSelectedRowIds: ['currys'] }}
      />
    )
    const selectAll = container.querySelector('thead input[type="checkbox"]')
    expect(selectAll.indeterminate).toBe(true)
    expect(selectAll.checked).toBe(false)
  })

  it('expands and collapses a row', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        expandable={{
          renderExpandedRow: (row) => <div>Nested {row.host}</div>
        }}
      />
    )
    const expand = container.querySelector('button[aria-label="Expand row currys"]')
    expect(container.textContent).not.toContain('Nested Currys')
    click(expand)
    expect(container.textContent).toContain('Nested Currys')
    expect(container.querySelector('button[aria-expanded="true"]')).toBeTruthy()
    click(container.querySelector('button[aria-label="Collapse row currys"]'))
    expect(container.textContent).not.toContain('Nested Currys')
  })

  it('renders row actions only when supplied', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        actions={(row) => <button type="button">Edit {row.host}</button>}
      />
    )
    expect(container.textContent).toContain('Edit Currys')
    ReactDOM.unmountComponentAtNode(container)
    render(<DataTable columns={columns} data={rows} />)
    expect(container.textContent).not.toContain('Edit Currys')
  })

  it('shows bulk actions only when rows are selected', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        selection
        bulkActions={({ selectedRows }) => <button type="button">Delete {selectedRows.length}</button>}
      />
    )
    expect(container.textContent).not.toContain('Delete')
    click(container.querySelectorAll('tbody input[type="checkbox"]')[0])
    expect(container.textContent).toContain('Delete 1')
  })

  it('renders Add item only when configured', () => {
    render(<DataTable columns={columns} data={rows} />)
    expect(container.querySelector('.bs-data-table--addItem')).toBeFalsy()
    ReactDOM.unmountComponentAtNode(container)
    const onClick = jest.fn()
    render(
      <DataTable
        columns={columns}
        data={rows}
        addItem={{ label: 'Add item', onClick }}
      />
    )
    const add = container.querySelector('.bs-data-table--addItem')
    expect(add.textContent).toContain('Add item')
    click(add)
    expect(onClick).toHaveBeenCalled()
  })

  it('paginates rows', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={{ pageSize: 1, defaultPage: 1 }}
      />
    )
    expect(container.textContent).toContain('Currys')
    expect(container.textContent).not.toContain('IKEA')
    click(container.querySelector('button[aria-label="Next"]'))
    expect(container.textContent).toContain('IKEA')
    expect(container.textContent).not.toContain('Currys')
  })

  it('uses a custom cell renderer', () => {
    render(
      <DataTable
        columns={[
          {
            id: 'host',
            header: 'Host',
            accessorKey: 'host',
            cell: ({ row }) => <strong>Host:{row.host}</strong>
          }
        ]}
        data={rows}
      />
    )
    expect(container.querySelector('strong').textContent).toBe('Host:Currys')
  })

  it('renders an empty state', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Nothing here" />)
    expect(container.textContent).toContain('Nothing here')
  })

  it('renders a loading state', () => {
    render(<DataTable columns={columns} data={rows} loading loadingContent="Please wait" />)
    expect(container.textContent).toContain('Please wait')
    expect(container.textContent).not.toContain('Currys')
  })

  it('does not render selection or expand controls when those features are off', () => {
    render(<DataTable columns={columns} data={rows} />)
    expect(container.querySelector('input[type="checkbox"]')).toBeFalsy()
    expect(container.querySelector('button[aria-label^="Expand row"]')).toBeFalsy()
  })

  it('keeps a transparent root background', () => {
    render(<DataTable columns={columns} data={rows} />)
    const root = container.querySelector('.bs-data-table')
    expect(root).toBeTruthy()
    expect(root.className).toContain('bs-data-table')
  })

  it('sort headers are keyboard buttons with aria-sort', () => {
    render(<DataTable columns={columns} data={rows} />)
    const sortButton = container.querySelector('button[aria-label="Sort by Host"]')
    expect(sortButton.tagName).toBe('BUTTON')
    click(sortButton)
    expect(container.querySelector('th[aria-sort="ascending"]')).toBeTruthy()
  })

  it('places the expand control before the selection checkbox', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        selection
        expandable={{ renderExpandedRow: () => <div>Nested</div> }}
      />
    )
    const firstHeader = container.querySelector('thead th')
    const firstBody = container.querySelector('tbody td')
    expect(firstHeader.className).toContain('bs-data-table--expandCol')
    expect(firstBody.className).toContain('bs-data-table--expandCol')
  })

  it('renders Add item below the header by default', () => {
    render(<DataTable columns={columns} data={rows} addItem={{ label: 'Add item' }} />)
    const firstRow = container.querySelector('tbody tr')
    expect(firstRow.textContent).toContain('Add item')
  })

  it('supports the separated row variant', () => {
    render(<DataTable columns={columns} data={rows} variant="separated" />)
    expect(container.querySelector('.bs-data-table--separated')).toBeTruthy()
  })

  it('can highlight selected rows without rendering checkboxes', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        selection={{ defaultSelectedRowIds: ['currys'], showCheckboxes: false }}
      />
    )
    expect(container.querySelector('input[type="checkbox"]')).toBeFalsy()
    expect(container.querySelector('.bs-data-table--selectedRow')).toBeTruthy()
  })

  it('places Add item after the rows when placement is end', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        addItem={{ label: 'Add item', placement: 'end' }}
      />
    )
    const firstRow = container.querySelector('tbody tr')
    expect(firstRow.textContent).not.toContain('Add item')
    expect(container.querySelector('.bs-data-table--addItem')).toBeTruthy()
  })

  it('applies sticky header and footer classes', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        stickyHeader
        stickyFooter
        footer={{ cells: { host: 'Total' } }}
      />
    )
    expect(container.querySelector('.bs-data-table--stickyHeader')).toBeTruthy()
    expect(container.querySelector('.bs-data-table--stickyFooter')).toBeTruthy()
  })

  it('closes a composed subtable modal', () => {
    const Example = () => {
      const [open, setOpen] = React.useState(true)
      return (
        <DataTableModal open={open} title="Nested table" onClose={() => setOpen(false)}>
          <div>Modal body</div>
        </DataTableModal>
      )
    }
    render(<Example />)
    expect(document.body.textContent).toContain('Nested table')
    expect(document.body.textContent).toContain('Modal body')
    click(document.querySelector('[aria-label="Close"]'))
    expect(document.body.textContent).not.toContain('Modal body')
  })
})
