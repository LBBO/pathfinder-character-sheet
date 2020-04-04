import React, { ChangeEvent } from 'react'
import { Alignment, Ethics, Morality } from '../../../store/CharacterMetaData/Alignment'
import PropTypes from 'prop-types'
import { Overwrite } from '../../../types/util'

const options = {
  'LG': { ethics: Ethics.LAW, morality: Morality.GOOD },
  'LN': { ethics: Ethics.LAW, morality: Morality.NEUTRAL },
  'LB': { ethics: Ethics.LAW, morality: Morality.BAD },

  'NG': { ethics: Ethics.NEUTRAL, morality: Morality.GOOD },
  'N': { ethics: Ethics.NEUTRAL, morality: Morality.NEUTRAL },
  'NB': { ethics: Ethics.NEUTRAL, morality: Morality.BAD },

  'CG': { ethics: Ethics.CHAOS, morality: Morality.GOOD },
  'CN': { ethics: Ethics.CHAOS, morality: Morality.NEUTRAL },
  'CB': { ethics: Ethics.CHAOS, morality: Morality.BAD },
}

const SelectInputPropTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
}

type PropsType = Overwrite<PropTypes.InferProps<typeof SelectInputPropTypes>, {
  onChange: (alignment: Alignment) => void,
}>

export const AlignmentInput: React.FC<PropsType> = ({ value, onChange, id, label }) => {
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const alignment = options[event.target.value as keyof typeof options]
    onChange(alignment)
  }

  const currentValue = Object.entries(options)
    .find(([, alignment]) =>
      alignment?.ethics === value?.ethics && alignment?.morality === value?.morality,
    )?.[0] ?? 'none'

  return <div
    className={`metadata-input-block ${id}`}
    data-testid={'alignment-input-wrapper'}
  >
    <select
      onChange={onSelect}
      id={id}
      value={currentValue}
      data-testid={'alignment-input-select'}
    >
      <option label={''} value={'none'} />
      {Object.keys(options).map((optionName, index) =>
        <option label={optionName} value={optionName} key={index} />,
      )}
    </select>
    <label htmlFor={id}>{label}</label>
  </div>
}
