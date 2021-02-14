import React, { useCallback } from 'react'

export const NumberInput = ({
  value,
  type = 'integer',
  onChange: onChangeFromProps,
  ...otherProps
}: Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'type' | 'value'> & {
  onChange?: (value: number | undefined) => void
  type?: 'integer' | 'float'
  value: number | undefined
}) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedValue =
        type === 'integer'
          ? parseInt(e.target.value)
          : parseFloat(e.target.value)
      onChangeFromProps?.(isNaN(parsedValue) ? undefined : parsedValue)
    },
    [onChangeFromProps, type],
  )
  return (
    <input
      type={'number'}
      value={value === undefined || isNaN(value) ? '' : value}
      onChange={onChange}
      {...otherProps}
    />
  )
}
