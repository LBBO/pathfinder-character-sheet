import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React, { ChangeEvent, useCallback } from 'react'
import * as CharacterMetadataActions from '../../store/CharacterMetaData/actions'
import PropTypes from 'prop-types'

import './DisplayCharacterMetaData.scss'
import { CharacterGender, SizeCategory } from '../../store/CharacterMetaData/Character'
import { MetadataSelect } from './MetadataSelect/MetadataSelect'
import { Ethics, Morality } from '../../store/CharacterMetaData/Alignment'

const GenderInputOptions = [
  { label: undefined, value: undefined },
  { label: 'Male', value: CharacterGender.MALE },
  { label: 'Female', value: CharacterGender.FEMALE },
  { label: 'Other', value: CharacterGender.OTHER },
]

export enum GenderInputTestIds {
  wrapper = 'gender-input-wrapper',
  select = 'gender-input-select',
}

const SizeCategoryInputOptions = [
  { label: 'Small', value: SizeCategory.SMALL },
  { label: 'Medium', value: SizeCategory.MEDIUM },
  { label: 'large', value: SizeCategory.LARGE },
]

export enum SizeCategoryInputTestIds {
  wrapper = 'size-category-input-wrapper',
  select = 'size-category-input-select',
}

const AlignmentOptions = [
  { label: undefined, value: undefined },
  { label: 'LG', value: { ethics: Ethics.LAW, morality: Morality.GOOD } },
  { label: 'LN', value: { ethics: Ethics.LAW, morality: Morality.NEUTRAL } },
  { label: 'LB', value: { ethics: Ethics.LAW, morality: Morality.BAD } },

  { label: 'NG', value: { ethics: Ethics.NEUTRAL, morality: Morality.GOOD } },
  { label: 'N', value: { ethics: Ethics.NEUTRAL, morality: Morality.NEUTRAL } },
  { label: 'NB', value: { ethics: Ethics.NEUTRAL, morality: Morality.BAD } },

  { label: 'CG', value: { ethics: Ethics.CHAOS, morality: Morality.GOOD } },
  { label: 'CN', value: { ethics: Ethics.CHAOS, morality: Morality.NEUTRAL } },
  { label: 'CB', value: { ethics: Ethics.CHAOS, morality: Morality.BAD } },
]

export enum AlignmentInputTestIds {
  wrapper = 'alignment-input-wrapper',
  select = 'alignment-input-select',
}

const StringInputPropTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
}

const MetadataStringInput: React.FC<PropTypes.InferProps<typeof StringInputPropTypes>> = ({ value, onChange, id, label }) => {
  return <div className={`metadata-input-block ${id}`}>
    <input value={value ?? ''} onChange={onChange} id={id} />
    <label htmlFor={id}>{label}</label>
  </div>
}

const NumberInputPropTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
}

const MetadataNumberInput: React.FC<PropTypes.InferProps<typeof NumberInputPropTypes>> = ({ value, onChange, id, label }) => {
  return <div className={`metadata-input-block ${id}`}>
    <input value={value ?? undefined} onChange={onChange} id={id} type={'number'} />
    <label htmlFor={id}>{label}</label>
  </div>
}

const mapState = (state: RootState) => state.characterMetaData

const mapDispatchToProps = CharacterMetadataActions

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplayCharacterMetaData = connector(({
  characterName, setCharacterName,
  playerName, setPlayerName,
  deity, setCharacterDeity,
  homeland, setCharacterHomeland,
  race, setCharacterRace,
  hair, setCharacterHair,
  eyes, setCharacterEyes,
  level, setCharacterLevel,
  className, setCharacterClass,
  campaign, setCampaign,
  age, setCharacterAge,
  height, setCharacterHeight,
  weight, setCharacterWeight,
  alignment, setCharacterAlignment,
  sizeCategory, setCharacterSizeCategory,
  gender, setCharacterGender,
}: Props) => {
  const callWithStringValue = useCallback(
    (callback: (value: string) => any) => useCallback(
      (event: ChangeEvent<HTMLInputElement>) => callback(event.target.value),
      [callback],
    ),
    [],
  )

  const callWithNumberValue = useCallback(
    (callback: (value: number | undefined) => any) => useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        callback(Number.isNaN(value) ? undefined : value)
      },
      [callback],
    ),
    [],
  )

  return (
    <div className={'character-meta-data'}>
      <MetadataStringInput
        id={'character-name'}
        value={characterName}
        label={'Charakter Name'}
        onChange={callWithStringValue(setCharacterName)}
      />
      <MetadataSelect
        onChange={setCharacterAlignment}
        options={AlignmentOptions}
        id={'alignment'}
        label={'Alignment'}
        value={alignment}
        testIds={AlignmentInputTestIds}
      />
      <MetadataStringInput
        id={'player-name'}
        value={playerName}
        label={'Player'}
        onChange={callWithStringValue(setPlayerName)}
      />
      <MetadataStringInput
        id={'class-name'}
        value={className}
        label={'Character Class'}
        onChange={callWithStringValue(setCharacterClass)}
      />
      <MetadataNumberInput
        id={'level'}
        value={level}
        label={'Level'}
        onChange={callWithNumberValue(setCharacterLevel)}
      />
      <MetadataStringInput
        id={'deity'}
        value={deity}
        label={'Deity'}
        onChange={callWithStringValue(setCharacterDeity)}
      />
      <MetadataSelect
        testIds={SizeCategoryInputTestIds}
        onChange={setCharacterSizeCategory}
        options={SizeCategoryInputOptions}
        id={'size-category'}
        value={sizeCategory}
        label={'Size Category'}
      />
      <MetadataSelect
        testIds={GenderInputTestIds}
        onChange={setCharacterGender}
        options={GenderInputOptions}
        id={'gender'}
        value={gender}
        label={'Gender'}
      />
      <MetadataStringInput
        id={'campaign'}
        value={campaign}
        label={'Campaign'}
        onChange={callWithStringValue(setCampaign)}
      />
      <MetadataStringInput
        id={'homeland'}
        value={homeland}
        label={'Homeland'}
        onChange={callWithStringValue(setCharacterHomeland)}
      />
      <MetadataStringInput
        id={'race'}
        value={race}
        label={'Race'}
        onChange={callWithStringValue(setCharacterRace)}
      />
      <MetadataStringInput
        id={'hair'}
        value={hair}
        label={'Hair'}
        onChange={callWithStringValue(setCharacterHair)}
      />
      <MetadataStringInput
        id={'eyes'}
        value={eyes}
        label={'Eyes'}
        onChange={callWithStringValue(setCharacterEyes)}
      />
      <MetadataNumberInput
        id={'age'}
        value={age}
        label={'Age'}
        onChange={callWithNumberValue(setCharacterAge)}
      />
      <MetadataNumberInput
        id={'height'}
        value={height}
        label={'Height'}
        onChange={callWithNumberValue(setCharacterHeight)}
      />
      <MetadataNumberInput
        id={'weight'}
        value={weight}
        label={'Weight'}
        onChange={callWithNumberValue(setCharacterWeight)}
      />
    </div>
  )
})
