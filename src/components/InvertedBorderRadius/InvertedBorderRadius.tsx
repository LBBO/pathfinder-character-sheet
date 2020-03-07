import React from 'react'
import './invertedBorderRadius.scss'
import PropTypes, { InferProps } from 'prop-types'

const InvertedBorderRadiusPropTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export const InvertedBorderRadius: React.FC<InferProps<typeof InvertedBorderRadiusPropTypes>> = (props = {
  className: '',
  style: {},
}) => {
  return <div
    className={`inverted-rounded-corners ${props.className ?? ''}`}
    style={{
      ...(
        props.style ?? {}
      ),
    }}
  >
    {props.children}
  </div>
}

InvertedBorderRadius.propTypes = InvertedBorderRadiusPropTypes
