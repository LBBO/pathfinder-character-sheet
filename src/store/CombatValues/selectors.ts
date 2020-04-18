import { CombatValuesState } from './types'
import { AbilityModifiers, getAbilityModifiers } from '../Abilities/selectors'
import { getSizeModifier } from '../CharacterMetaData/selectors'
import { RootState } from '../root-reducer'
import { createSelector } from 'reselect'

export const getCombatValues = (state: RootState) => state.combatValues

export const getTotalInitiativeBonus = createSelector(
  [getCombatValues, getAbilityModifiers],
  (state: CombatValuesState, abilityModifiers: AbilityModifiers) =>
    state.initiative.miscModifier + abilityModifiers.dexterity,
)

export const getArmorClass = createSelector(
  [getCombatValues, getAbilityModifiers, getSizeModifier],
  (
    state: CombatValuesState,
    abilityModifiers: AbilityModifiers,
    sizeModifier: number,
  ) =>
    10 + state.armorClass.armorBonus + state.armorClass.shieldBonus + abilityModifiers.dexterity +
    sizeModifier + state.armorClass.naturalArmor + state.armorClass.deflectionModifier +
    state.armorClass.miscModifier,
)

export const getTouchArmorClass = createSelector(
  [getCombatValues, getAbilityModifiers, getSizeModifier],
  (
    state: CombatValuesState,
    abilityModifiers: AbilityModifiers,
    sizeModifier: number,
  ) =>
    10 + abilityModifiers.dexterity + sizeModifier + state.armorClass.deflectionModifier +
    state.armorClass.miscModifier,
)

export const getFlatFootedArmorClass = createSelector(
  [getCombatValues, getAbilityModifiers, getSizeModifier],
  (
    state: CombatValuesState,
    abilityModifiers: AbilityModifiers,
    sizeModifier: number,
  ) =>
    10 + state.armorClass.armorBonus + state.armorClass.shieldBonus + Math.min(0, abilityModifiers.dexterity) +
    sizeModifier + state.armorClass.naturalArmor + state.armorClass.deflectionModifier +
    state.armorClass.miscModifier,
)
