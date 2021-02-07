import { render, act } from '@testing-library/react'
import { BoxInput } from './BoxInput'
import React from 'react'

describe('BoxInput', () => {
  const defaultContainerTestId = 'defaultContainerTestId'
  const defaultInputTestId = 'defaultInputTestId'
  let component = render(<BoxInput labelTestId={defaultContainerTestId} />)

  beforeEach(() => {
    component = render(<BoxInput labelTestId={defaultContainerTestId} />)
  })

  it('should render without errors with no props provided', () => {
    expect(component.baseElement).toBeInTheDocument()
  })

  it('should correctly set classes passed on via prop', () => {
    const className = 'test-class-name'

    act(() => {
      component.unmount()
      component = render(
        <BoxInput labelTestId={defaultContainerTestId} className={className} />,
      )
    })

    expect(component.getByTestId(defaultContainerTestId)).toHaveClass(className)
  })

  it('should set the hide-box class if hideBox is true', () => {
    act(() => {
      component.unmount()
      component = render(<BoxInput labelTestId={defaultContainerTestId} />)
    })

    expect(component.getByTestId(defaultContainerTestId)).not.toHaveClass(
      'hide-box',
    )

    act(() => {
      component.unmount()
      component = render(
        <BoxInput labelTestId={defaultContainerTestId} hideBox={true} />,
      )
    })

    expect(component.getByTestId(defaultContainerTestId)).toHaveClass(
      'hide-box',
    )
  })

  it('should correctly set the value', () => {
    const value = 5

    act(() => {
      component.unmount()
      component = render(<BoxInput testId={defaultInputTestId} value={value} />)
    })

    expect(component.getByTestId(defaultInputTestId)).toHaveAttribute(
      'value',
      value.toString(),
    )
  })

  it('should correctly set the type', () => {
    const type = 'number'

    act(() => {
      component.unmount()
      component = render(<BoxInput testId={defaultInputTestId} type={type} />)
    })

    expect(component.getByTestId(defaultInputTestId)).toHaveAttribute(
      'type',
      type,
    )
  })

  it('should correctly set the label', () => {
    const label = 'randomLabel'

    act(() => {
      component.unmount()
      component = render(<BoxInput testId={defaultInputTestId} label={label} />)
    })

    expect(component.getByLabelText(label)).toBeInTheDocument()
    expect(component.getByLabelText(label)).toBe(
      component.getByTestId(defaultInputTestId),
    )
  })
})
