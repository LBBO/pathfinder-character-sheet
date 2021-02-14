import React from 'react'
import PropTypes from 'prop-types'
import './BoxInput.scss'

export const BoxInputPropTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]).isRequired,
  testId: PropTypes.string,
  labelTestId: PropTypes.string,
  hideBox: PropTypes.bool.isRequired,
}

export const BoxInputDefaultProps = {
  value: '',
  hideBox: false,
}

type PropType = PropTypes.InferProps<typeof BoxInputPropTypes> &
  React.HTMLProps<HTMLInputElement>

export const BoxInput = (props: PropType) => {
  const { hideBox, className, labelTestId, testId, ...otherProps } = props
  return (
    <label
      className={`box-input ${hideBox ? 'hide-box' : ''} ${className}`}
      data-testid={labelTestId}
    >
      <input {...otherProps} data-testid={testId} />
      {props.label ? <span className={'label'}>{props.label}</span> : null}
    </label>
  )
}

BoxInput.propTypes = BoxInputPropTypes
BoxInput.defaultProps = BoxInputDefaultProps
