import React from 'react'
import './BlackBox.scss'

type Props = {
  [key: string]: any,
  className?: string,
}

export const BlackBox: React.FC<Props> = (props) => {
  const { children, className, ...propsWithoutChildren } = props
  return <div
    {...propsWithoutChildren}
    className={`black-box ${className}`}
  >
    {props.children}
  </div>
}
