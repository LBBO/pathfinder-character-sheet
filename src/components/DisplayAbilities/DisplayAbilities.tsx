import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React from 'react'
import { setAbilityScore, setAbilityTempAdjustment } from '../../store/Abilities/actions'
import { AbilityAttributes, abilityName, AbilityState } from '../../store/Abilities/types'
import { InvertedBorderRadius } from '../InvertedBorderRadius/InvertedBorderRadius'
import { getModifierFromScore } from '../../store/Abilities/selectors'
import { BoxNumberInput } from '../BoxInput/BoxNumberInput'

const mapState = (state: RootState) => (
  {
    abilities: state.abilities,
  }
)

const mapDispatchToProps = {
  setAbilityScore,
  setAbilityTempAdjustment,
}

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplayAbilities = connector(({
  abilities,
  setAbilityScore,
  setAbilityTempAdjustment,
}: Props) => {
  const onScoreChange = (abilityName: keyof AbilityState) => (newVal?: number) => {
    if (newVal !== undefined) {
      setAbilityScore(abilityName, newVal)
    }
  }
  const onTempAdjustmentChange = (abilityName: keyof AbilityState) => (newVal?: number) => {
    if (newVal !== undefined) {
      setAbilityTempAdjustment(abilityName, newVal)
    }
  }

  const abilityNames = Object.keys(abilities) as Array<abilityName>
  const abilityElements = abilityNames.map((abilityName) => {
    const abilityAttributes: AbilityAttributes = abilities[abilityName]

    return (
      <tr key={abilityName}>
        <td>
          <InvertedBorderRadius
          >
            {abilityName}
          </InvertedBorderRadius>
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
            value={abilityAttributes.temporaryAdjustment ?
              getModifierFromScore(abilityAttributes.score + abilityAttributes.temporaryAdjustment)
              : null
            }
          /></td>
      </tr>
    )
  })
  return (
    <table>
      <thead>
        <tr>
          <td>Ability Name</td>
          <td>Score</td>
          <td>Mod</td>
          <td>Temp adjustment</td>
          <td>Temp mod</td>
        </tr>
      </thead>
      <tbody>
        {abilityElements}
      </tbody>
    </table>
  )
})
