import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { DataTable } from './DataTable/DataTable'
import { buildCsv, buildExcelXml } from './DataTable/DataTable.export'

let container
let lastBlob
let lastDownload

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  lastBlob = null
  lastDownload = null
  URL.createObjectURL = jest.fn((blob) => {
    lastBlob = blob
    return 'blob:mock'
  })
  URL.revokeObjectURL = jest.fn()
  jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function mockClick() {
    lastDownload = this.download
  })
})

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
  container = null
  jest.restoreAllMocks()
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

function keyDown(element, key) {
  act(() => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
  })
}

const rows = [
  { id: 'currys', host: 'Currys', commission: 8.5, status: 'Active' },
  { id: 'ikea', host: 'IKEA', commission: 4, status: 'Inactive' },
  { id: 'wickes', host: 'Wickes', commission: 6.75, status: 'Active' }
]

const columns = [
  { id: 'host', title: 'Host', dataIndex: 'host', sortable: true, filterable: true },
  { id: 'commission', title: 'Commission', dataIndex: 'commission', sortable: true, align: 'right' },
  { id: 'status', title: 'Status', dataIndex: 'status' }
]

describe('DataTable', () => {
  it('renders columns and data', () => {
    render(<DataTable columns={columns} data={rows} pagination={false} />)
    expect(container.textContent).toContain('Host')
    expect(container.textContent).toContain('Currys')
    expect(container.textContent).toContain('IKEA')
  })

  it('sorts a sortable column through unsorted → asc → desc', () => {
    render(<DataTable columns={columns} data={rows} pagination={false} />)
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

  it('applies a column filter with Enter and clears it', () => {
    render(<DataTable columns={columns} data={rows} pagination={false} />)
    click(container.querySelector('button[aria-label="Filter Host"]'))
    const input = document.body.querySelector('.bs-data-table--filterPopover input')
    expect(input).toBeTruthy()

    change(input, 'ikea')
    keyDown(input, 'Enter')

    expect(container.textContent).toContain('IKEA')
    expect(container.textContent).not.toContain('Currys')

    click(container.querySelector('button[aria-label="Filter Host"]'))
    const clear = Array.from(document.body.querySelectorAll('.bs-data-table--filterPopover button'))
      .find((button) => button.textContent === 'Clear')
    click(clear)
    expect(container.textContent).toContain('Currys')
  })

  it('applies a column filter with the Apply button', () => {
    render(<DataTable columns={columns} data={rows} pagination={false} />)
    click(container.querySelector('button[aria-label="Filter Host"]'))
    const input = document.body.querySelector('.bs-data-table--filterPopover input')
    change(input, 'wickes')
    const apply = Array.from(document.body.querySelectorAll('.bs-data-table--filterPopover button'))
      .find((button) => button.textContent === 'Apply')
    click(apply)
    expect(container.textContent).toContain('Wickes')
    expect(container.textContent).not.toContain('Currys')
  })

  it('selects rows and select-all', () => {
    render(<DataTable columns={columns} data={rows} rowSelection pagination={false} />)
    const checkboxes = container.querySelectorAll('.bs-checkbox--input')
    expect(checkboxes.length).toBe(4)
    click(checkboxes[1])
    expect(checkboxes[1].checked).toBe(true)
    click(checkboxes[0])
    Array.from(checkboxes).slice(1).forEach((box) => {
      expect(box.checked).toBe(true)
    })
  })

  it('expands a row and renders nested content', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        expandable={{
          renderExpandedRow: (row) => <div>Nested {row.host}</div>
        }}
      />
    )
    click(container.querySelector('button[aria-label="Expand row"]'))
    expect(container.textContent).toContain('Nested Currys')
    expect(container.querySelector('.bs-data-table--nestedWrap')).toBeTruthy()
  })

  it('places the export menu in the header overlay, not a body column', () => {
    render(<DataTable title="Table title" columns={columns} data={rows} pagination={false} />)
    expect(container.querySelector('.bs-data-table--heading .bs-data-table--menu')).toBeFalsy()
    expect(container.querySelector('.bs-data-table--headerMenu .bs-data-table--menu')).toBeTruthy()
    expect(container.querySelector('tbody .bs-data-table--menuCol')).toBeFalsy()
    expect(container.querySelector('thead .bs-data-table--menuCol')).toBeFalsy()
  })

  it('shows CSV and XLS actions without Edit columns', () => {
    render(<DataTable columns={columns} data={rows} pagination={false} />)
    click(container.querySelector('button[aria-label="Table actions"]'))
    const items = Array.from(document.body.querySelectorAll('.bs-selectbox--option')).map(
      (item) => item.textContent
    )
    expect(items).toEqual(['Export as CSV', 'Export as XLS'])
    expect(items.join(' ')).not.toContain('Edit columns')
  })

  it('downloads a CSV of the current table data', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        exportFileName="hosts"
      />
    )
    click(container.querySelector('button[aria-label="Table actions"]'))
    click(
      Array.from(document.body.querySelectorAll('.bs-selectbox--option')).find(
        (item) => item.textContent === 'Export as CSV'
      )
    )
    expect(URL.createObjectURL).toHaveBeenCalled()
    expect(lastBlob.type).toContain('csv')
    expect(lastDownload).toBe('hosts.csv')
  })

  it('downloads an Excel spreadsheet for XLS export', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        exportFileName="hosts"
      />
    )
    click(container.querySelector('button[aria-label="Table actions"]'))
    click(
      Array.from(document.body.querySelectorAll('.bs-selectbox--option')).find(
        (item) => item.textContent === 'Export as XLS'
      )
    )
    expect(lastBlob.type).toContain('application/vnd.ms-excel')
    expect(lastDownload).toBe('hosts.xls')
  })

  it('calls custom export callbacks when provided', () => {
    const onExportCsv = jest.fn()
    const onExportXls = jest.fn()
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        onExportCsv={onExportCsv}
        onExportXls={onExportXls}
      />
    )
    click(container.querySelector('button[aria-label="Table actions"]'))
    click(
      Array.from(document.body.querySelectorAll('.bs-selectbox--option')).find(
        (item) => item.textContent === 'Export as CSV'
      )
    )
    expect(onExportCsv).toHaveBeenCalled()
    expect(lastBlob).toBeNull()
  })

  it('renders hover actions in the configured position relative to the table', () => {
    ;['left', 'center', 'right'].forEach((position) => {
      ReactDOM.unmountComponentAtNode(container)
      render(
        <DataTable
          columns={columns}
          data={rows}
          pagination={false}
          hoverActions={() => <button type="button">Edit row</button>}
          hoverActionsPosition={position}
        />
      )
      const actions = container.querySelector('.bs-data-table--hoverActions')
      expect(actions.textContent).toContain('Edit row')
      expect(actions.className).toContain(`is-${position}`)
      expect(actions.style.left).toBe('')
      expect(actions.style.top).toBe('')
      expect(actions.closest('tr')).toBeTruthy()
    })
  })

  it('does not assign inline coordinates to hover actions while scrolling', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        hoverActions={() => <button type="button">Edit row</button>}
        scroll={{ x: 900 }}
      />
    )
    const actions = container.querySelector('.bs-data-table--hoverActions')
    const scroller = container.querySelector('.bs-data-table--scroll')
    expect(actions.style.left).toBe('')
    expect(actions.style.top).toBe('')
    act(() => {
      scroller.scrollLeft = 120
      scroller.dispatchEvent(new Event('scroll'))
    })
    expect(actions.style.left).toBe('')
    expect(actions.style.top).toBe('')
    expect(actions.className).toContain('is-right')
  })

  it('keeps floating actions inside the hovered row', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        hoverActions={() => <button type="button">Edit row</button>}
      />
    )
    const row = container.querySelector('tbody tr')
    expect(row.querySelector('.bs-data-table--hoverActions').textContent).toContain('Edit row')
  })

  it('applies hover to the full row including fixed cells', () => {
    render(
      <DataTable
        columns={[
          { id: 'host', title: 'Host', dataIndex: 'host', fixed: 'left', width: 160 },
          { id: 'status', title: 'Status', dataIndex: 'status' }
        ]}
        data={rows}
        pagination={false}
        hoverActions={() => <button type="button">Edit row</button>}
      />
    )
    const row = container.querySelector('tbody tr')
    const fixedCell = row.querySelector('.bs-data-table--fixedLeftLast')
    expect(fixedCell.style.background).toBe('')
    expect(fixedCell.style.position).toBe('sticky')
  })

  it('does not show record hover actions on the total row', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        totalRow={{ host: 'Total', commission: 19.25 }}
        hoverActions={() => <button type="button">Edit row</button>}
      />
    )
    expect(container.querySelector('.bs-data-table--totalRow .bs-data-table--hoverActions')).toBeFalsy()
  })

  it('renders a sticky total row', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        totalRow={{ host: 'Total', commission: 19.25 }}
        stickyTotalRow
      />
    )
    const total = container.querySelector('.bs-data-table--totalRow')
    expect(total).toBeTruthy()
    expect(total.className).toContain('is-sticky')
    expect(total.textContent).toContain('Total')
    expect(total.querySelector('td').style.bottom).toBe('0px')
  })

  it('renders a non-sticky total row as a normal final row', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        totalRow={{ host: 'Total', commission: 19.25 }}
      />
    )
    const total = container.querySelector('.bs-data-table--totalRow')
    expect(total.className).not.toContain('is-sticky')
    expect(total.querySelector('td').style.bottom).toBe('')
  })

  it('applies sticky header and fixed column styles', () => {
    render(
      <DataTable
        columns={[
          { id: 'host', title: 'Host', dataIndex: 'host', fixed: 'left', width: 160 },
          { id: 'status', title: 'Status', dataIndex: 'status', fixed: 'right', width: 120 }
        ]}
        data={rows}
        pagination={false}
        scroll={{ x: 900, y: 240 }}
      />
    )
    const hostHeader = Array.from(container.querySelectorAll('th')).find((th) =>
      th.textContent.includes('Host')
    )
    expect(hostHeader.style.position).toBe('sticky')
    expect(hostHeader.style.left).toBe('0px')
    expect(hostHeader.className).toContain('bs-data-table--fixedLeftLast')
    expect(container.querySelector('.bs-data-table--scroll')).toBeTruthy()
  })

  it('does not reserve a permanent actions column for hover actions', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={false}
        hoverActions={() => <span>Go</span>}
      />
    )
    expect(container.querySelector('.bs-data-table--hoverAnchor')).toBeTruthy()
    expect(container.querySelector('.bs-data-table--actionsCol')).toBeFalsy()
    expect(container.querySelector('tbody .bs-data-table--menuCol')).toBeFalsy()
    expect(container.querySelector('.bs-data-table--hoverActions')).toBeTruthy()
  })
})

describe('DataTable export helpers', () => {
  it('escapes commas, quotes, and line breaks in CSV', () => {
    const csv = buildCsv(['Host', 'Note'], [['Currys', 'hello, "world"\nnext']])
    expect(csv).toContain('Host,Note')
    expect(csv).toContain('"hello, ""world""\nnext"')
  })

  it('builds spreadsheet XML rather than a renamed CSV', () => {
    const xml = buildExcelXml(['Host'], [['Currys']])
    expect(xml).toContain('Workbook')
    expect(xml).toContain('Excel.Sheet')
    expect(xml).toContain('Currys')
    expect(xml).not.toMatch(/^Host,/)
  })
})
