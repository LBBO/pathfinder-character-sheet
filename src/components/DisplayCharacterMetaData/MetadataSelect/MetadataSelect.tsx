import React, { ChangeEvent, useEffect } from 'react'

export enum MetadataSelectTestIds {
  wrapper = 'metadata-select-wrapper',
  select = 'metadata-select',
}

type PropsType<T> = {
  onChange: (newValue: T) => void
  value: T
  options: Array<{ label?: string; value: T }>
  label?: string
  id: string
  testIds?: { wrapper: string; select: string }
}

export const MetadataSelect = <T extends any>({
  value,
  onChange,
  id,
  label,
  options,
  testIds = MetadataSelectTestIds,
}: PropsType<T>) => {
  useEffect(() => {
    const optionValues = options.map((option) => option.value) as Array<unknown>

    if (optionValues.includes(undefined) && optionValues.includes('')) {
      console.error(
        `MetadataSelect has recieved both an option with the value undefined and one with the value ''. Due ` +
          `to React / browser implementation details, undefined is converted to '', so both those options cannot exist at the ` +
          `same time. Please remove either from the options array!`,
      )
    }
  }, [options])

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.currentTarget.selectedIndex
    const selectedOption = options[selectedIndex]
    onChange(selectedOption.value)
  }

  return (
    <div className={`metadata-input-block ${id}`} data-testid={testIds.wrapper}>
      <select
        onChange={onSelect}
        id={id}
        value={value === undefined ? '' : JSON.stringify(value)}
        data-testid={testIds.select}
      >
        {options.map(({ label, value }, index) => (
          <option
            label={label}
            value={value === undefined ? '' : JSON.stringify(value)}
            key={index}
          />
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
