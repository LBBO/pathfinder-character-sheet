import { GenderInput, GenderInputTestIds } from './GenderInput'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { CharacterGender, SizeCategory } from '../../../store/CharacterMetaData/Character'

describe('Gender input field', () => {
  // Initial definition just so that the type is set correctly
  let genderInput = render(<></>)
  let onChangeHandler = jest.fn().mockImplementation(console.log)

  beforeEach(() => {
    onChangeHandler.mockReset()
    genderInput = render(<GenderInput
      onChange={onChangeHandler}
      id={'gender'}
    />)
  })

  it('should render successfully', () => {
    expect(genderInput.getByTestId(GenderInputTestIds.wrapper)).toBeInTheDocument()
  })

  it('should render a select element with 4 children', () => {
    const select = genderInput.getByTestId(GenderInputTestIds.select)
    expect(select).toBeInTheDocument()
    expect(select.children.length).toBe(4)
  })

  describe('should call the onChange handler', () => {
    const expectClickOnNthButtonToSetValue = (n: number, val?: CharacterGender) => {
      const select = genderInput.getByTestId(GenderInputTestIds.select)
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

    it('with undefined when the first option is clicked', () => {
      expectClickOnNthButtonToSetValue(0, undefined)
    })

    it('with male when the first option is clicked', () => {
      expectClickOnNthButtonToSetValue(1, CharacterGender.MALE)
    })

    it('with female when the second option is clicked', () => {
      expectClickOnNthButtonToSetValue(2, CharacterGender.FEMALE)
    })

    it('with other when the third option is clicked', () => {
      expectClickOnNthButtonToSetValue(3, CharacterGender.OTHER)
    })
  })

  it('should focus on the select when the label is clicked', () => {
    const labelTarget = genderInput.getByLabelText(/.*/)
    expect(labelTarget.tagName).toMatch(/select/i)
    expect(labelTarget.getAttribute('data-testid')).toBe(GenderInputTestIds.select)
  })
})
