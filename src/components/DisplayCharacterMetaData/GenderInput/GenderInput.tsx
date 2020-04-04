import React, { ChangeEvent } from 'react'
import PropTypes from 'prop-types'
import { Overwrite } from '../../../types/util'
import { CharacterGender } from '../../../store/CharacterMetaData/Character'

const genderNames = {
  [CharacterGender.MALE]: 'Male',
  [CharacterGender.FEMALE]: 'Female',
  [CharacterGender.OTHER]: 'Other',
}

export enum GenderInputTestIds {
  wrapper = 'gender-input-wrapper',
  select = 'gender-input-select',
}

const SelectInputPropTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
}

type PropsType = Overwrite<PropTypes.InferProps<typeof SelectInputPropTypes>, {
  onChange: (gender?: CharacterGender) => void,
  value?: CharacterGender,
}>

export const GenderInput: React.FC<PropsType> = ({ value, onChange, id, label }) => {
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    let genderIndex: number | undefined = parseInt(event.target.value)

    if (Number.isNaN(genderIndex)) {
      genderIndex = undefined
    }

    onChange(genderIndex)
  }

  return <div
    className={`metadata-input-block ${id}`}
    data-testid={GenderInputTestIds.wrapper}
  >
    <select
      onChange={onSelect}
      id={id}
      value={value}
      data-testid={GenderInputTestIds.select}
    >
      <option value={''} />
      {
        Object.entries(genderNames)
          .map(([genderIndex, genderName], index) =>
            <option label={genderName} value={genderIndex} key={index} />,
          )
      }
    </select>
    <label htmlFor={id}>{label}</label>
  </div>
}

GenderInput.propTypes = SelectInputPropTypes
