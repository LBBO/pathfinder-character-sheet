import React, { ChangeEvent } from 'react'
import PropTypes from 'prop-types'
import { Overwrite } from '../../../types/util'
import { SizeCategory } from '../../../store/CharacterMetaData/Character'

const sizeNames = {
  [SizeCategory.SMALL]: 'Small',
  [SizeCategory.MEDIUM]: 'Medium',
  [SizeCategory.LARGE]: 'Large',
}

export enum SizeCategoryInputTestIds {
  wrapper = 'size-category-input-wrapper',
  select = 'size-category-input-select',
}

const SelectInputPropTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
}

type PropsType = Overwrite<PropTypes.InferProps<typeof SelectInputPropTypes>, {
  onChange: (sizeCategory: SizeCategory) => void,
  value: SizeCategory,
}>

export const SizeCategoryInput: React.FC<PropsType> = ({ value, onChange, id, label }) => {
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    let sizeCategoryNumber = parseInt(event.target.value)

    if (Number.isNaN(sizeCategoryNumber)) {
      sizeCategoryNumber = SizeCategory.MEDIUM
    }

    const sizeCategory = sizeCategoryNumber as SizeCategory
    onChange(sizeCategory)
  }

  return <div
    className={`metadata-input-block ${id}`}
    data-testid={SizeCategoryInputTestIds.wrapper}
  >
    <select
      onChange={onSelect}
      id={id}
      value={value}
      data-testid={SizeCategoryInputTestIds.select}
    >
      {
        Object.entries(sizeNames)
          .sort(([sizeValueA], [sizeValueB]) => parseInt(sizeValueA) - parseInt(sizeValueB))
          .map(([sizeValue, sizeName], index) =>
            <option label={sizeName} value={sizeValue} key={index} />,
          )
      }
    </select>
    <label htmlFor={id}>{label}</label>
  </div>
}

SizeCategoryInput.propTypes = SelectInputPropTypes
