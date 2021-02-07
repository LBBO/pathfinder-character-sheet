import React from 'react'
import PropTypes from 'prop-types'
import { Overwrite } from '../../types/util'
import './BoxInput.scss'

export const BoxInputPropTypes = {
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]).isRequired,
  testId: PropTypes.string,
  labelTestId: PropTypes.string,
  hideBox: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export const BoxInputDefaultProps = {
  onChange: () => {},
  className: '',
  value: '',
  hideBox: false,
  type: '',
  disabled: false,
}

type PropType = Overwrite<
  PropTypes.InferProps<typeof BoxInputPropTypes>,
  {
    onChange?: React.EventHandler<React.ChangeEvent>
  }
>

export const BoxInput = (props: PropType) => {
  return (
    <label
      className={`box-input ${props.hideBox ? 'hide-box' : ''} ${
        props.className
      }`}
      data-testid={props.labelTestId}
    >
      <input
        onChange={props.onChange}
        value={props.value}
        data-testid={props.testId}
        type={props.type}
        disabled={props.disabled}
      />
      {props.label ? <span className={'label'}>{props.label}</span> : null}
    </label>
  )
}

BoxInput.propTypes = BoxInputPropTypes
BoxInput.defaultProps = BoxInputDefaultProps
