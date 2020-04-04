import { AlignmentInput } from './AlignmentInput'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Alignment, Ethics, Morality } from '../../../store/CharacterMetaData/Alignment'

describe('Alignment input field', () => {
  // Initial definition just so that the type is set correctly
  let alignmentInput = render(<></>)
  let onChangeHandler = jest.fn().mockImplementation(console.log)

  beforeEach(() => {
    onChangeHandler.mockReset()
    alignmentInput = render(<AlignmentInput
      onChange={onChangeHandler}
      id={'alignment'}
    />)
  })

  it('should render successfully', () => {
    expect(alignmentInput.getByTestId('alignment-input-wrapper')).toBeInTheDocument()
  })

  it('should render a select element with 10 children (9 options + empty)', () => {
    const select = alignmentInput.getByTestId('alignment-input-select')
    expect(select).toBeInTheDocument()
    expect(select.children.length).toBe(10)
  })

  describe('should call the onChange handler', () => {
    it('with undefined when the first option is clicked', () => {
      const select = alignmentInput.getByTestId('alignment-input-select')
      const firstOption = select.children.item(0)
      expect(firstOption).toBeDefined()

      fireEvent.change(select, {
        target: {
          value: firstOption?.getAttribute('value'),
        }
      })

      expect(onChangeHandler).toHaveBeenCalledTimes(1)
      expect(onChangeHandler.mock.calls[0]).toMatchObject([undefined])
    })

    it('with law good when the second option is clicked', () => {
      const select = alignmentInput.getByTestId('alignment-input-select')
      const secondOption = select.children.item(1)
      const lawGood: Alignment = {
        ethics: Ethics.LAW,
        morality: Morality.GOOD,
      }

      expect(secondOption).toBeDefined()

      fireEvent.change(select, {
        target: {
          value: secondOption?.getAttribute('value'),
        }
      })

      expect(onChangeHandler).toHaveBeenCalledTimes(1)
      expect(onChangeHandler.mock.calls[0]).toMatchObject([lawGood])
    })
  })

  it('should focus on the select when the label is clicked', () => {
    const labelTarget = alignmentInput.getByLabelText(/.*/)
    expect(labelTarget.tagName).toMatch(/select/i)
    expect(labelTarget.getAttribute('data-testid')).toBe('alignment-input-select')
  })
})
