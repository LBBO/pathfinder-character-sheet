import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React from 'react'
import {
  setAbilityScore,
  setAbilityTempAdjustment,
} from '../../store/Abilities/actions'
import {
  AbilityAttributes,
  abilityName,
  AbilityState,
} from '../../store/Abilities/types'
import { getModifierFromScore } from '../../store/Abilities/selectors'
import { BoxNumberInput } from '../BoxInput/BoxNumberInput'
import './DisplayAbilities.scss'
import { BlackBox } from '../BlackBox/BlackBox'
import { useTranslation } from 'react-i18next'

const mapState = (state: RootState) => ({
  abilities: state.abilities,
})

const mapDispatchToProps = {
  setAbilityScore,
  setAbilityTempAdjustment,
}

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplayAbilities = connector(
  ({ abilities, setAbilityScore, setAbilityTempAdjustment }: Props) => {
    const { t } = useTranslation()

    const onScoreChange = (abilityName: keyof AbilityState) => (
      newVal?: number,
    ) => {
      if (newVal !== undefined) {
        setAbilityScore(abilityName, newVal)
      }
    }
    const onTempAdjustmentChange = (abilityName: keyof AbilityState) => (
      newVal?: number,
    ) => {
      if (newVal !== undefined) {
        setAbilityTempAdjustment(abilityName, newVal)
      }
    }

    const abilityNames = Object.keys(abilities) as Array<abilityName>
    const abilityElements = abilityNames
      .sort((nameA, nameB) =>
        t(`abilities.${nameA}.short`).localeCompare(
          t(`abilities.${nameB}.short`),
        ),
      )
      .map((abilityName) => {
        const abilityAttributes: AbilityAttributes = abilities[abilityName]

        return (
          <tr key={abilityName}>
            <td>
              <BlackBox>
                {t(`abilities.${abilityName}.short`)}
                <aside>{t(`abilities.${abilityName}.long`)}</aside>
              </BlackBox>
            </td>
            <td>
              <BoxNumberInput
                value={abilityAttributes.score}
                onChange={onScoreChange(abilityName)}
              />
            </td>
            <td>
              <BoxNumberInput
                value={getModifierFromScore(abilityAttributes.score)}
              />
            </td>
            <td>
              <BoxNumberInput
                value={abilityAttributes.temporaryAdjustment || null}
                onChange={onTempAdjustmentChange(abilityName)}
              />
            </td>
            <td>
              <BoxNumberInput
                value={
                  abilityAttributes.temporaryAdjustment
                    ? getModifierFromScore(
                        abilityAttributes.score +
                          abilityAttributes.temporaryAdjustment,
                      )
                    : null
                }
              />
            </td>
          </tr>
        )
      })
    return (
      <table className={'abilities'}>
        <thead>
          <tr>
            <td>{t('abilitiesTable.abilityName')}</td>
            <td>{t('abilitiesTable.score')}</td>
            <td>{t('abilitiesTable.modifier')}</td>
            <td>{t('abilitiesTable.tempAdjustment')}</td>
            <td>{t('abilitiesTable.tempModifier')}</td>
          </tr>
        </thead>
        <tbody>{abilityElements}</tbody>
      </table>
    )
  },
)
