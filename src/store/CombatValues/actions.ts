import {
  SavingThrowsState,
  SET_BASE_ATTACK_BONUS,
  SET_BASE_SAVE,
  SET_INITIATIVE_MISC_MODIFIER,
  SET_MISC_SAVING_THROW_MODIFIER,
  SET_SAVING_THROW_MAGIC_MODIFIER,
  SET_SPELL_RESISTANCE,
  SET_TEMPORARY_SAVING_THROW_MODIFIER,
  SetBaseAttackBonusAction,
  SetBaseSaveAction,
  SetInitiativeMiscModifierAction,
  SetMiscSavingThrowModifierAction,
  SetSavingThrowMagicModifierAction,
  SetSpellResistanceAction,
  SetTemporarySavingThrowModifierAction,
} from './types'

export const setBaseSave = (newBaseSave: number, savingThrowType: keyof SavingThrowsState): SetBaseSaveAction => (
  {
    type: SET_BASE_SAVE,
    payload: { savingThrowType, newBaseSave },
  }
)

export const setSavingThrowMagicModifier = (
  newMagicModifier: number, savingThrowType: keyof SavingThrowsState): SetSavingThrowMagicModifierAction => (
  {
    type: SET_SAVING_THROW_MAGIC_MODIFIER,
    payload: {
      savingThrowType, newMagicModifier,
    },
  }
)

export const setMiscSavingThrowModifier = (
  newMiscModifier: number, savingThrowType: keyof SavingThrowsState): SetMiscSavingThrowModifierAction => (
  {
    type: SET_MISC_SAVING_THROW_MODIFIER,
    payload: {
      savingThrowType, newMiscModifier,
    },
  }
)

export const setTemporarySavingThrowModifier = (
  newTemporaryModifier: number, savingThrowType: keyof SavingThrowsState): SetTemporarySavingThrowModifierAction => (
  {
    type: SET_TEMPORARY_SAVING_THROW_MODIFIER,
    payload: {
      newTemporaryModifier, savingThrowType,
    },
  }
)

export const setInitiativeMiscModifier = (newMiscModifier: number): SetInitiativeMiscModifierAction => (
  {
    type: SET_INITIATIVE_MISC_MODIFIER,
    payload: newMiscModifier,
  }
)

export const setBaseAttackBonus = (newBaseAttackBonus: number): SetBaseAttackBonusAction => (
  {
    type: SET_BASE_ATTACK_BONUS,
    payload: newBaseAttackBonus,
  }
)

export const setSpellResistance = (newSpellResistance: number): SetSpellResistanceAction => (
  {
    type: SET_SPELL_RESISTANCE,
    payload: newSpellResistance,
  }
)
