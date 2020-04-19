import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { BoxInput, BoxInputDefaultProps, BoxInputPropTypes } from './BoxInput'
import { Overwrite } from '../../types/util'

const propTypes = {
  ...BoxInputPropTypes,
  value: PropTypes.number,
  type: PropTypes.any,
  onChange: PropTypes.func,
}

const defaultProps = {
  ...BoxInputDefaultProps,
  type: undefined,
  onChange: undefined,
}

type PropTypes = Overwrite<PropTypes.InferProps<typeof propTypes>, {
  onChange?: (value: number | undefined, evt: React.ChangeEvent<HTMLInputElement>) => void,
}>

export const BoxNumberInput = (props: PropTypes) => {
  const changeHandlerFromProps = props.onChange
  const changeHandler = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    let valueAsNumber = parseInt(evt.target.value)
    changeHandlerFromProps?.(Number.isNaN(valueAsNumber) ? undefined : valueAsNumber, evt)
  }, [changeHandlerFromProps])

  return <BoxInput
    {...props}
    value={props.value === null ? undefined : props.value}
    onChange={changeHandler}
    type={'number'}
    disabled={!Boolean(props.onChange)}
  />
}
BoxNumberInput.propTypes = propTypes
BoxNumberInput.defaultProps = defaultProps
