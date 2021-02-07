import { MetadataSelect, MetadataSelectTestIds } from './MetadataSelect'
import React from 'react'
import '../../../i18n/i18nSetup'
import { fireEvent, render } from '@testing-library/react'

export const expectClickOnNthButtonToSetValue = (
  // This type is seemingly impossible to get other than having it inferred
  wrapper = render(<></>),
  onChangeSpy: jest.Mock | jest.SpyInstance,
  n: number,
  expectedValue?: any,
  testId: string = MetadataSelectTestIds.select,
  expectedLabel?: string,
) => {
  const select = wrapper.getByTestId(testId)
  const nthOption = select?.children.item(n)
  expect(nthOption).toBeDefined()
  if (expectedLabel) {
    expect(nthOption?.getAttribute('label')).toBe(expectedLabel)
  }

  if (select) {
    fireEvent.change(select, {
      target: {
        value: nthOption?.getAttribute('value'),
      },
    })
  }

  expect(onChangeSpy).toHaveBeenCalledTimes(1)
  expect(onChangeSpy.mock.calls[0]).toMatchObject([expectedValue])
}

describe('Metadata select', () => {
  // Initial definition just so that the type is set correctly
  let genderInput = render(<></>)
  let onChangeHandler = jest.fn()
  const options = [
    { label: 'None', value: undefined },
    { label: 'One', value: 0 },
    { label: 'Two', value: 1 },
    { label: 'Three', value: 2 },
    { label: 'Four', value: 3 },
    { label: 'Five', value: 4 },
  ]

  beforeEach(() => {
    onChangeHandler.mockReset()
    genderInput = render(
      <MetadataSelect
        onChange={onChangeHandler}
        id={'gender'}
        options={options}
        value={undefined}
      />,
    )
  })

  it('should render successfully', () => {
    expect(
      genderInput.getByTestId(MetadataSelectTestIds.wrapper),
    ).toBeInTheDocument()
  })

  it(`should render a select element with ${options.length} children`, () => {
    const select = genderInput.getByTestId(MetadataSelectTestIds.select)
    expect(select).toBeInTheDocument()
    expect(select.children.length).toBe(options.length)
  })

  describe('should call the onChange handler', () => {
    options.forEach(({ label, value }, index) => {
      it(`with ${value} when the option ${index} is clicked`, () => {
        expectClickOnNthButtonToSetValue(
          genderInput,
          onChangeHandler,
          index,
          value,
          MetadataSelectTestIds.select,
          label,
        )
      })
    })
  })

  it('should focus on the select when the label is clicked', () => {
    const labelTarget = genderInput.getByLabelText(/.*/)
    expect(labelTarget.tagName).toMatch(/select/i)
    expect(labelTarget.getAttribute('data-testid')).toBe(
      MetadataSelectTestIds.select,
    )
  })

  it('should render the correct label when the value is different data types', () => {
    const options = [
      { label: 'string', value: 'string' },
      { label: 'number', value: 1 },
      { label: 'boolean', value: true },
      { label: 'array', value: [1, 2, 3] },
      { label: 'object', value: { foo: 'bar' } },
      { label: 'undefined', value: undefined },
    ]

    options.forEach((option, index) => {
      genderInput.unmount()
      genderInput = render(
        <MetadataSelect
          onChange={onChangeHandler}
          id={'gender'}
          options={options}
          value={option.value}
        />,
      )

      const selectElement = genderInput.getByTestId(
        MetadataSelectTestIds.select,
      ) as HTMLSelectElement
      const selectedIndex = selectElement.selectedIndex
      expect(selectedIndex).toBe(index)
    })
  })

  it('should log an error when there is both an undefined and an empty string option', () => {
    const options = [
      { label: 'empty string', value: '' },
      { label: 'undefined', value: undefined },
    ]
    const consoleErrorMock = jest.spyOn(console, 'error')
    consoleErrorMock.mockImplementation(() => {})

    expect(consoleErrorMock).not.toHaveBeenCalled()

    render(
      <MetadataSelect
        onChange={onChangeHandler}
        id={'gender'}
        options={options}
        value={undefined}
      />,
    )

    expect(consoleErrorMock).toHaveBeenCalledTimes(1)

    consoleErrorMock.mockRestore()
  })
})
