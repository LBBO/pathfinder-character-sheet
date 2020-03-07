import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React, { ChangeEvent } from 'react'
import { setAbilityScore, setAbilityTempAdjustment } from '../../store/Abilities/actions'
import { AbilityAttributes, AbilityState } from '../../store/Abilities/types'
import { InvertedBorderRadius } from '../InvertedBorderRadius/InvertedBorderRadius'

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

export const DisplayAbilities = connector((
  { abilities, setAbilityScore, setAbilityTempAdjustment }: Props,
) => {
  const onScoreChange = (abilityName: keyof AbilityState) => (event: ChangeEvent<HTMLInputElement>) => {
    setAbilityScore(abilityName, parseInt(event.target.value))
  }
  const onTempAdjustmentChange = (abilityName: keyof AbilityState) => (event: ChangeEvent<HTMLInputElement>) => {
    setAbilityTempAdjustment(abilityName, parseInt(event.target.value))
  }

  const abilityElements = Object.keys(abilities).map((abilityName) => {
    // @ts-ignore
    const abilityAttributes: AbilityAttributes = abilities[abilityName]

    return (
      <tr key={abilityName}>
        <td>
          <InvertedBorderRadius
            style={{
              fontSize: '1em',
            }}
          >
            {abilityName}
          </InvertedBorderRadius>
        </td>
        <td>
          <input
            type={'number'}
            value={abilityAttributes.score}
            onChange={onScoreChange(abilityName as keyof AbilityState)}
          />
        </td>
        <td>{abilityAttributes.modifier}</td>
        <td>
          <input
            type={'number'}
             // Display an empty input if temp adjustment is 0
            value={abilityAttributes.temporaryAdjustment || ''}
            onChange={onTempAdjustmentChange(abilityName as keyof AbilityState)}
          />
        </td>
        <td>{abilityAttributes.temporaryAdjustment ? abilityAttributes.temporaryModifier : ''}</td>
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
