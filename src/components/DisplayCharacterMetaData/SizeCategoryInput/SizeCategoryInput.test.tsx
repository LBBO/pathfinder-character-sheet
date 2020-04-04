import { SizeCategoryInput, SizeCategoryInputTestIds } from './SizeCategoryInput'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { SizeCategory } from '../../../store/CharacterMetaData/Character'

describe('Size category input field', () => {
  // Initial definition just so that the type is set correctly
  let alignmentInput = render(<></>)
  let onChangeHandler = jest.fn().mockImplementation(console.log)

  beforeEach(() => {
    onChangeHandler.mockReset()
    alignmentInput = render(<SizeCategoryInput
      onChange={onChangeHandler}
      id={'sizeCategory'}
      value={SizeCategory.MEDIUM}
    />)
  })

  it('should render successfully', () => {
    expect(alignmentInput.getByTestId(SizeCategoryInputTestIds.wrapper)).toBeInTheDocument()
  })

  it('should render a select element with 3 children', () => {
    const select = alignmentInput.getByTestId(SizeCategoryInputTestIds.select)
    expect(select).toBeInTheDocument()
    expect(select.children.length).toBe(3)
  })

  describe('should call the onChange handler', () => {
    const expectClickOnNthButtonToSetValue = (n: number, val: SizeCategory) => {
      const select = alignmentInput.getByTestId(SizeCategoryInputTestIds.select)
      const nthOption = select.children.item(n)
      expect(nthOption).toBeDefined()

      fireEvent.change(select, {
        target: {
          value: nthOption?.getAttribute('value'),
        },
      })

      expect(onChangeHandler).toHaveBeenCalledTimes(1)
      expect(onChangeHandler.mock.calls[0]).toMatchObject([val])
    }

    it('with small when the first option is clicked', () => {
      expectClickOnNthButtonToSetValue(0, SizeCategory.SMALL)
    })

    it('with medium when the second option is clicked', () => {
      expectClickOnNthButtonToSetValue(1, SizeCategory.MEDIUM)
    })

    it('with large when the third option is clicked', () => {
      expectClickOnNthButtonToSetValue(2, SizeCategory.LARGE)
    })
  })

  it('should focus on the select when the label is clicked', () => {
    const labelTarget = alignmentInput.getByLabelText(/.*/)
    expect(labelTarget.tagName).toMatch(/select/i)
    expect(labelTarget.getAttribute('data-testid')).toBe(SizeCategoryInputTestIds.select)
  })
})
