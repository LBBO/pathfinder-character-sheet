import React from 'react'
import PropTypes from 'prop-types'

import './StyledCheckbox.scss'

const propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

export const StyledCheckbox: React.FC<PropTypes.InferProps<typeof propTypes>> = (props) => {
  return <input
    className={`styled-checkbox ${props.className}`}
    type={'checkbox'}
    checked={props.checked ?? false}
    onChange={props.onChange!}
  />
}

StyledCheckbox.propTypes = propTypes
StyledCheckbox.defaultProps = {
  checked: false,
  className: '',
  onChange: () => {},
}
