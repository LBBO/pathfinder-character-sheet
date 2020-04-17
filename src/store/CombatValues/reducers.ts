import { CombatValuesState } from './types'
import { AbilityModifiers } from '../Abilities/selectors'
import { RootActionTypes } from '../root-reducer'
import { initialCombatValuesState } from './initialState'
import { CharacterMetaDataState } from '../CharacterMetaData/types'
import { getSizeModifier } from '../CharacterMetaData/reducers'

export const initiativeReducer = (state: CombatValuesState, abilityModifiers: AbilityModifiers) =>
  state.initiative.miscModifier + abilityModifiers.dexterity

export const armorClassReducer = (
  state: CombatValuesState,
  abilityModifiers: AbilityModifiers,
  characterMetaDataState: CharacterMetaDataState,
) =>
  10 + state.armorClass.armorBonus + state.armorClass.shieldBonus + abilityModifiers.dexterity +
  getSizeModifier(characterMetaDataState) + state.armorClass.naturalArmor + state.armorClass.deflectionModifier +
  state.armorClass.miscModifier

export const CombatValuesReducer = (
  state = initialCombatValuesState,
  action?: RootActionTypes,
): CombatValuesState => {
  switch (action?.type) {
    default:
      return state
  }
}
