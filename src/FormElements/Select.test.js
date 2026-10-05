import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Select } from './Select/Select'
import { MultiSelectbox } from './MultiSelectbox/MultiSelectbox'

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

function openSelect() {
  const trigger = container.querySelector('[role="combobox"], .bs-selectbox--select')
  act(() => {
    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}

describe('Select dropdownPosition / dropdownSize', () => {
  it('defaults to bottom + medium', () => {
    render(
      <Select
        options={['A', 'B']}
        value={null}
        onChange={() => {}}
        searchable={false}
      />
    )
    openSelect()
    const dropdown = container.querySelector('[role="listbox"]')
    expect(dropdown).toBeTruthy()
    expect(dropdown.getAttribute('data-dropdown-position')).toBe('bottom')
    expect(dropdown.getAttribute('data-dropdown-size')).toBe('medium')
    expect(dropdown.className).toContain('bs-selectbox--dropdown--bottom')
    expect(dropdown.className).toContain('bs-selectbox--dropdown--medium')
  })

  it('supports dropdownPosition="top"', () => {
    render(
      <Select
        options={['A', 'B']}
        value={null}
        onChange={() => {}}
        searchable={false}
        dropdownPosition="top"
      />
    )
    openSelect()
    const dropdown = container.querySelector('[role="listbox"]')
    expect(dropdown.getAttribute('data-dropdown-position')).toBe('top')
    expect(dropdown.className).toContain('bs-selectbox--dropdown--top')
  })

  it('supports dropdownPosition="bottom"', () => {
    render(
      <Select
        options={['A', 'B']}
        value={null}
        onChange={() => {}}
        searchable={false}
        dropdownPosition="bottom"
      />
    )
    openSelect()
    const dropdown = container.querySelector('[role="listbox"]')
    expect(dropdown.getAttribute('data-dropdown-position')).toBe('bottom')
    expect(dropdown.className).toContain('bs-selectbox--dropdown--bottom')
  })

  it('supports dropdownSize="small"', () => {
    render(
      <Select
        options={['A', 'B']}
        value={null}
        onChange={() => {}}
        searchable={false}
        dropdownSize="small"
      />
    )
    openSelect()
    const dropdown = container.querySelector('[role="listbox"]')
    expect(dropdown.getAttribute('data-dropdown-size')).toBe('small')
    expect(dropdown.className).toContain('bs-selectbox--dropdown--small')
  })

  it('supports dropdownSize="medium"', () => {
    render(
      <Select
        options={['A', 'B']}
        value={null}
        onChange={() => {}}
        searchable={false}
        dropdownSize="medium"
      />
    )
    openSelect()
    const dropdown = container.querySelector('[role="listbox"]')
    expect(dropdown.getAttribute('data-dropdown-size')).toBe('medium')
    expect(dropdown.className).toContain('bs-selectbox--dropdown--medium')
  })

  it('supports dropdownSize="large"', () => {
    render(
      <Select
        options={['A', 'B']}
        value={null}
        onChange={() => {}}
        searchable={false}
        dropdownSize="large"
      />
    )
    openSelect()
    const dropdown = container.querySelector('[role="listbox"]')
    expect(dropdown.getAttribute('data-dropdown-size')).toBe('large')
    expect(dropdown.className).toContain('bs-selectbox--dropdown--large')
  })

  it('anchors dropdown inside the select trigger wrapper (not the label wrapper)', () => {
    render(
      <Select
        label={
          <>
            Line 1
            <br />
            Line 2
            <br />
            Line 3
          </>
        }
        options={['A', 'B']}
        value={null}
        onChange={() => {}}
        searchable={false}
        dropdownPosition="top"
      />
    )
    openSelect()
    const selectWrapper = container.querySelector('.bs-selectbox--selectWrapper')
    const dropdown = selectWrapper.querySelector('[role="listbox"]')
    expect(dropdown).toBeTruthy()
    expect(selectWrapper.contains(dropdown)).toBe(true)
  })
})

describe('MultiSelectbox dropdownPosition / dropdownSize', () => {
  it('defaults to bottom + medium and stays consistent with Select', () => {
    render(
      <MultiSelectbox
        options={['A', 'B']}
        selected={[]}
        onChange={() => {}}
      />
    )
    openSelect()
    const dropdown = container.querySelector('[data-dropdown-position]')
    expect(dropdown).toBeTruthy()
    expect(dropdown.getAttribute('data-dropdown-position')).toBe('bottom')
    expect(dropdown.getAttribute('data-dropdown-size')).toBe('medium')
  })

  it('supports top + small', () => {
    render(
      <MultiSelectbox
        options={['A', 'B']}
        selected={[]}
        onChange={() => {}}
        dropdownPosition="top"
        dropdownSize="small"
      />
    )
    openSelect()
    const dropdown = container.querySelector('[data-dropdown-position]')
    expect(dropdown.getAttribute('data-dropdown-position')).toBe('top')
    expect(dropdown.getAttribute('data-dropdown-size')).toBe('small')
    expect(dropdown.className).toContain('bs-selectbox--dropdown--top')
    expect(dropdown.className).toContain('bs-selectbox--dropdown--small')
  })
})
