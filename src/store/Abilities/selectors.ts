import { AbilityAttributes, abilityName, AbilityState } from './types'
import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'

export type AbilityModifiers = {
  [k in abilityName]: number
}

export const getModifierFromScore = (score: number) => Math.floor(score / 2) - 5

export const getAbilities = (state: RootState) => state.abilities

export const getCurrentModifiersFromAbilities = (
  abilitiesState: AbilityState,
) =>
  (Object.entries(abilitiesState) as Array<
    [abilityName, AbilityAttributes]
  >).reduce((modifiers: AbilityModifiers, [abilityName, values]) => {
    modifiers[abilityName] = getModifierFromScore(
      values.score + values.temporaryAdjustment,
    )

    return modifiers
  }, {} as AbilityModifiers)

export const getAbilityModifiers = createSelector(
  [getAbilities],
  getCurrentModifiersFromAbilities,
)
