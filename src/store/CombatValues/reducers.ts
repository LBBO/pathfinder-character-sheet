import {
  CombatValuesActionTypes,
  CombatValuesState,
  SET_BASE_SAVE,
  SET_MISC_SAVING_THROW_MODIFIER,
  SET_SAVING_THROW_MAGIC_MODIFIER,
  SET_TEMPORARY_SAVING_THROW_MODIFIER,
} from './types'
import { AbilityModifiers } from '../Abilities/selectors'
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
  action?: CombatValuesActionTypes,
): CombatValuesState => {
  // Handle actions that change saving throws
  if (
    action?.type === SET_BASE_SAVE ||
    action?.type === SET_SAVING_THROW_MAGIC_MODIFIER ||
    action?.type === SET_MISC_SAVING_THROW_MODIFIER ||
    action?.type === SET_TEMPORARY_SAVING_THROW_MODIFIER
  ) {
    const savingThrowType = action?.payload.savingThrowType
    const stateCopy = {
      ...state,
      savingThrows: {
        ...state.savingThrows,
        [savingThrowType]: {
          ...state.savingThrows[savingThrowType],
        },
      },
    }
    const currentSavingThrow = stateCopy.savingThrows[savingThrowType]

    switch (action.type) {
      case SET_BASE_SAVE:
        currentSavingThrow.baseSave = action.payload.newBaseSave
        break
      case SET_SAVING_THROW_MAGIC_MODIFIER:
        currentSavingThrow.magicModifier = action.payload.newMagicModifier
        break
      case SET_MISC_SAVING_THROW_MODIFIER:
        currentSavingThrow.miscModifier = action.payload.newMiscModifier
        break
      case SET_TEMPORARY_SAVING_THROW_MODIFIER:
        currentSavingThrow.temporaryModifier = action.payload.newTemporaryModifier
    }

    return stateCopy
  }
  switch (action?.type) {
    default:
      return state
  }
}
