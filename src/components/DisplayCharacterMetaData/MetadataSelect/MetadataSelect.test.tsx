import { MetadataSelect, MetadataSelectTestIds } from './MetadataSelect'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { CharacterGender } from '../../../store/CharacterMetaData/Character'

export const expectClickOnNthButtonToSetValue = (
  // This type is seemingly impossible to get other than having it inferred
  selectElement = render(<></>),
  onChangeSpy: jest.Mock,
  n: number,
  expectedLabel: string,
  expectedValue?: CharacterGender,
) => {
  const select = selectElement.getByTestId(MetadataSelectTestIds.select)
  const nthOption = select?.children.item(n)
  expect(nthOption).toBeDefined()
  expect(nthOption?.getAttribute('label')).toBe(expectedLabel)

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

describe('Gender input field', () => {
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
    genderInput = render(<MetadataSelect
      onChange={onChangeHandler}
      id={'gender'}
      options={options}
      value={undefined}
    />)
  })

  it('should render successfully', () => {
    expect(genderInput.getByTestId(MetadataSelectTestIds.wrapper)).toBeInTheDocument()
  })

  it(`should render a select element with ${options.length} children`, () => {
    const select = genderInput.getByTestId(MetadataSelectTestIds.select)
    expect(select).toBeInTheDocument()
    expect(select.children.length).toBe(options.length)
  })

  describe('should call the onChange handler', () => {
    options.forEach(({ label, value }, index) => {
      it(`with ${value} when the option ${index} is clicked`, () => {
        expectClickOnNthButtonToSetValue(genderInput, onChangeHandler, index, label, value)
      })
    })
  })

  it('should focus on the select when the label is clicked', () => {
    const labelTarget = genderInput.getByLabelText(/.*/)
    expect(labelTarget.tagName).toMatch(/select/i)
    expect(labelTarget.getAttribute('data-testid')).toBe(MetadataSelectTestIds.select)
  })
})
