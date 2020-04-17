import {
  CombatValuesActionTypes,
  CombatValuesState,
  SET_ARMOR_BONUS,
  SET_BASE_ATTACK_BONUS,
  SET_BASE_SAVE,
  SET_DEFLECTION_MODIFIER,
  SET_INITIATIVE_MISC_MODIFIER,
  SET_MISC_ARMOR_MODIFIER,
  SET_MISC_SAVING_THROW_MODIFIER,
  SET_NATURAL_ARMOR,
  SET_OTHER_ARMOR_MODIFIERS,
  SET_SAVING_THROW_MAGIC_MODIFIER,
  SET_SHIELD_BONUS,
  SET_SPELL_RESISTANCE,
  SET_TEMPORARY_SAVING_THROW_MODIFIER,
} from './types'
import { AbilityModifiers } from '../Abilities/selectors'
import { getInitialCombatValuesState } from './initialState'
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
  state = getInitialCombatValuesState(),
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
    case SET_INITIATIVE_MISC_MODIFIER:
      return {
        ...state,
        initiative: {
          miscModifier: action?.payload,
        },
      }

    case SET_BASE_ATTACK_BONUS:
      return {
        ...state,
        attackBonuses: {
          ...state.attackBonuses,
          baseAttackBonus: action?.payload,
        },
      }

    case SET_SPELL_RESISTANCE:
      return {
        ...state,
        attackBonuses: {
          ...state.attackBonuses,
          spellResistance: action?.payload,
        },
      }

    case SET_SHIELD_BONUS:
      return {
        ...state,
        armorClass: {
          ...state.armorClass,
          shieldBonus: action?.payload,
        },
      }

    case SET_ARMOR_BONUS:
      return {
        ...state,
        armorClass: {
          ...state.armorClass,
          armorBonus: action?.payload,
        },
      }

    case SET_DEFLECTION_MODIFIER:
      return {
        ...state,
        armorClass: {
          ...state.armorClass,
          deflectionModifier: action?.payload,
        },
      }

    case SET_MISC_ARMOR_MODIFIER:
      return {
        ...state,
        armorClass: {
          ...state.armorClass,
          miscModifier: action?.payload,
        },
      }

    case SET_NATURAL_ARMOR:
      return {
        ...state,
        armorClass: {
          ...state.armorClass,
          naturalArmor: action?.payload,
        },
      }

    case SET_OTHER_ARMOR_MODIFIERS:
      return {
        ...state,
        armorClass: {
          ...state.armorClass,
          otherModifiers: action?.payload,
        },
      }

    default:
      return state
  }
}
