import React, { ChangeEvent } from 'react'

export enum MetadataSelectTestIds {
  wrapper = 'metadata-select-wrapper',
  select = 'metadata-select',
}

type PropsType<T> = {
  onChange: (newValue: T) => void,
  value: T,
  options: Array<{ label?: string, value: T }>
  label?: string,
  id: string,
  testIds?: { wrapper: string, select: string },
}

export const MetadataSelect = <T extends any>({
  value,
  onChange,
  id,
  label,
  options,
  testIds = MetadataSelectTestIds,
}: PropsType<T>) => {
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.currentTarget.selectedIndex
    const selectedOption = options[selectedIndex]
    onChange(selectedOption.value)
  }

  return <div
    className={`metadata-input-block ${id}`}
    data-testid={testIds.wrapper}
  >
    <select
      onChange={onSelect}
      id={id}
      value={value}
      data-testid={testIds.select}
    >
      {
        options
          .map(({ label, value }, index) =>
            <option label={label} value={value === undefined ? '' : value} key={index} />,
          )
      }
    </select>
    <label htmlFor={id}>{label}</label>
  </div>
}
