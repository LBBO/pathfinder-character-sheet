import React from 'react'
import PropTypes from 'prop-types'

import './StyledCheckbox.scss'

const propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
}

export const StyledCheckbox = (
  props: PropTypes.InferProps<typeof propTypes>,
) => {
  return (
    <input
      className={`styled-checkbox ${props.className}`}
      type={'checkbox'}
      checked={props.checked ?? false}
      onChange={props.onChange!}
      disabled={props.disabled}
    />
  )
}

StyledCheckbox.propTypes = propTypes
StyledCheckbox.defaultProps = {
  checked: false,
  className: '',
  onChange: () => {},
  disabled: false,
}
