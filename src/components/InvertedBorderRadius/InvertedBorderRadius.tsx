import React, { useMemo } from 'react'
import './invertedBorderRadius.scss'

export const InvertedBorderRadius: React.FC<
  React.HTMLProps<HTMLDivElement> & {
    fillCorners?: {
      'top-left'?: boolean
      'bottom-left'?: boolean
      'top-right'?: boolean
      'bottom-right'?: boolean
    }
  }
> = (
  props = {
    className: '',
    style: {},
  },
) => {
  const filledCornersClasses = useMemo(() => {
    const keys = Object.keys(props.fillCorners ?? {}) as Array<
      keyof typeof props['fillCorners']
    >
    return keys
      .filter((key) => props.fillCorners?.[key] === true)
      .map((cornerName) => `fill-${cornerName}`)
      .join(' ')
  }, [props.fillCorners])

  return (
    <div
      className={`inverted-rounded-corners ${filledCornersClasses} ${
        props.className ?? ''
      }`}
      style={{
        ...(props.style ?? {}),
      }}
    >
      <div className={'corners'}>
        <div className={'corner-container left'} />
        <div className={'corner-container right'} />
      </div>
      <div className={'content'}>{props.children}</div>
    </div>
  )
}
