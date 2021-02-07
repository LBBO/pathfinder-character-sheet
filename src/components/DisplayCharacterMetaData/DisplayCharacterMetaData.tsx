import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React, { ChangeEvent, useCallback } from 'react'
import * as CharacterMetadataActions from '../../store/CharacterMetaData/actions'
import PropTypes from 'prop-types'

import './DisplayCharacterMetaData.scss'
import {
  CharacterGender,
  SizeCategory,
} from '../../store/CharacterMetaData/Character'
import { MetadataSelect } from './MetadataSelect/MetadataSelect'
import { Ethics, Morality } from '../../store/CharacterMetaData/Alignment'

import { useTranslation } from 'react-i18next'

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

const MetadataStringInput: React.FC<
  PropTypes.InferProps<typeof StringInputPropTypes>
> = ({ value, onChange, id, label }) => {
  return (
    <div className={`metadata-input-block ${id}`}>
      <input value={value ?? ''} onChange={onChange} id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

const NumberInputPropTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
}

const MetadataNumberInput: React.FC<
  PropTypes.InferProps<typeof NumberInputPropTypes>
> = ({ value, onChange, id, label }) => {
  return (
    <div className={`metadata-input-block ${id}`}>
      <input
        value={value ?? undefined}
        onChange={onChange}
        id={id}
        type={'number'}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

const mapState = (state: RootState) => state.characterMetaData

const mapDispatchToProps = CharacterMetadataActions

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplayCharacterMetaData = connector(
  ({
    characterName,
    setCharacterName,
    playerName,
    setPlayerName,
    deity,
    setCharacterDeity,
    homeland,
    setCharacterHomeland,
    race,
    setCharacterRace,
    hair,
    setCharacterHair,
    eyes,
    setCharacterEyes,
    level,
    setCharacterLevel,
    className,
    setCharacterClass,
    campaign,
    setCampaign,
    age,
    setCharacterAge,
    height,
    setCharacterHeight,
    weight,
    setCharacterWeight,
    alignment,
    setCharacterAlignment,
    sizeCategory,
    setCharacterSizeCategory,
    gender,
    setCharacterGender,
  }: Props) => {
    const { t } = useTranslation()

    const callWithStringValue = useCallback(
      (callback: (value: string) => any) =>
        useCallback(
          (event: ChangeEvent<HTMLInputElement>) =>
            callback(event.target.value),
          [callback],
        ),
      [],
    )

    const callWithNumberValue = useCallback(
      (callback: (value: number | undefined) => any) =>
        useCallback(
          (event: ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(event.target.value)
            callback(Number.isNaN(value) ? undefined : value)
          },
          [callback],
        ),
      [],
    )

    const translatedAlignmentOptions = AlignmentOptions.map(
      (alignmentOption) => {
        const ethics = alignmentOption.value?.ethics
        const morality = alignmentOption.value?.morality

        let newLabel =
          t(`alignments.ethics.${ethics}.long`) +
          ' ' +
          t(`alignments.morality.${morality}.long`)

        if (ethics === Ethics.NEUTRAL && morality === Morality.NEUTRAL) {
          newLabel = t('alignments.neutral.long')
        } else if (ethics === undefined && morality === undefined) {
          newLabel = ''
        }

        return {
          ...alignmentOption,
          label: newLabel,
        }
      },
    )

    const translatedGenderOptions = GenderInputOptions.map((genderOption) => ({
      ...genderOption,
      label:
        genderOption.value !== undefined
          ? t(`genders.${genderOption.value}`)
          : '',
    }))

    const translatedSizeOptions = SizeCategoryInputOptions.map(
      (sizeOption) => ({
        ...sizeOption,
        label:
          sizeOption.value !== undefined
            ? t(`sizeCategories.${sizeOption.value}`)
            : '',
      }),
    )

    return (
      <div className={'character-meta-data'}>
        <MetadataStringInput
          id={'character-name'}
          value={characterName}
          label={t('characterMetaData.characterName')}
          onChange={callWithStringValue(setCharacterName)}
        />
        <MetadataSelect
          onChange={setCharacterAlignment}
          options={translatedAlignmentOptions}
          id={'alignment'}
          label={t('characterMetaData.alignment')}
          value={alignment}
          testIds={AlignmentInputTestIds}
        />
        <MetadataStringInput
          id={'player-name'}
          value={playerName}
          label={t('characterMetaData.player')}
          onChange={callWithStringValue(setPlayerName)}
        />
        <MetadataStringInput
          id={'class-name'}
          value={className}
          label={t('characterMetaData.characterClass')}
          onChange={callWithStringValue(setCharacterClass)}
        />
        <MetadataNumberInput
          id={'level'}
          value={level}
          label={t('characterMetaData.level')}
          onChange={callWithNumberValue(setCharacterLevel)}
        />
        <MetadataStringInput
          id={'deity'}
          value={deity}
          label={t('characterMetaData.deity')}
          onChange={callWithStringValue(setCharacterDeity)}
        />
        <MetadataSelect
          testIds={SizeCategoryInputTestIds}
          onChange={setCharacterSizeCategory}
          options={translatedSizeOptions}
          id={'size-category'}
          value={sizeCategory}
          label={t('characterMetaData.sizeCategory')}
        />
        <MetadataSelect
          testIds={GenderInputTestIds}
          onChange={setCharacterGender}
          options={translatedGenderOptions}
          id={'gender'}
          value={gender}
          label={t('characterMetaData.gender')}
        />
        <MetadataStringInput
          id={'campaign'}
          value={campaign}
          label={t('characterMetaData.campaign')}
          onChange={callWithStringValue(setCampaign)}
        />
        <MetadataStringInput
          id={'homeland'}
          value={homeland}
          label={t('characterMetaData.homeland')}
          onChange={callWithStringValue(setCharacterHomeland)}
        />
        <MetadataStringInput
          id={'race'}
          value={race}
          label={t('characterMetaData.race')}
          onChange={callWithStringValue(setCharacterRace)}
        />
        <MetadataStringInput
          id={'hair'}
          value={hair}
          label={t('characterMetaData.hair')}
          onChange={callWithStringValue(setCharacterHair)}
        />
        <MetadataStringInput
          id={'eyes'}
          value={eyes}
          label={t('characterMetaData.eyes')}
          onChange={callWithStringValue(setCharacterEyes)}
        />
        <MetadataNumberInput
          id={'age'}
          value={age}
          label={t('characterMetaData.age')}
          onChange={callWithNumberValue(setCharacterAge)}
        />
        <MetadataNumberInput
          id={'height'}
          value={height}
          label={t('characterMetaData.height')}
          onChange={callWithNumberValue(setCharacterHeight)}
        />
        <MetadataNumberInput
          id={'weight'}
          value={weight}
          label={t('characterMetaData.weight')}
          onChange={callWithNumberValue(setCharacterWeight)}
        />
      </div>
    )
  },
)
