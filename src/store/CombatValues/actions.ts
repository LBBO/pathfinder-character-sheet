import {
  SavingThrowsState,
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
  SetArmorBonusAction,
  SetBaseAttackBonusAction,
  SetBaseSaveAction,
  SetDeflectionModifierAction,
  SetInitiativeMiscModifierAction,
  SetMiscArmorModifierAction,
  SetMiscSavingThrowModifierAction,
  SetNaturalArmorAction,
  SetOtherArmorModifiersAction,
  SetSavingThrowMagicModifierAction,
  SetShieldBonusAction,
  SetSpellResistanceAction,
  SetTemporarySavingThrowModifierAction,
} from './types'

export const setBaseSave = (
  newBaseSave: number,
  savingThrowType: keyof SavingThrowsState,
): SetBaseSaveAction => ({
  type: SET_BASE_SAVE,
  payload: { savingThrowType, newBaseSave },
})

export const setSavingThrowMagicModifier = (
  newMagicModifier: number,
  savingThrowType: keyof SavingThrowsState,
): SetSavingThrowMagicModifierAction => ({
  type: SET_SAVING_THROW_MAGIC_MODIFIER,
  payload: {
    savingThrowType,
    newMagicModifier,
  },
})

export const setMiscSavingThrowModifier = (
  newMiscModifier: number,
  savingThrowType: keyof SavingThrowsState,
): SetMiscSavingThrowModifierAction => ({
  type: SET_MISC_SAVING_THROW_MODIFIER,
  payload: {
    savingThrowType,
    newMiscModifier,
  },
})

export const setTemporarySavingThrowModifier = (
  newTemporaryModifier: number,
  savingThrowType: keyof SavingThrowsState,
): SetTemporarySavingThrowModifierAction => ({
  type: SET_TEMPORARY_SAVING_THROW_MODIFIER,
  payload: {
    newTemporaryModifier,
    savingThrowType,
  },
})

export const setInitiativeMiscModifier = (
  newMiscModifier: number,
): SetInitiativeMiscModifierAction => ({
  type: SET_INITIATIVE_MISC_MODIFIER,
  payload: newMiscModifier,
})

export const setBaseAttackBonus = (
  newBaseAttackBonus: number,
): SetBaseAttackBonusAction => ({
  type: SET_BASE_ATTACK_BONUS,
  payload: newBaseAttackBonus,
})

export const setSpellResistance = (
  newSpellResistance: number,
): SetSpellResistanceAction => ({
  type: SET_SPELL_RESISTANCE,
  payload: newSpellResistance,
})

export const setShieldBonus = (
  newShieldBonus: number,
): SetShieldBonusAction => ({
  type: SET_SHIELD_BONUS,
  payload: newShieldBonus,
})

export const setArmorBonus = (newArmorBonus: number): SetArmorBonusAction => ({
  type: SET_ARMOR_BONUS,
  payload: newArmorBonus,
})

export const setDeflectionModifier = (
  newDeflectionModifier: number,
): SetDeflectionModifierAction => ({
  type: SET_DEFLECTION_MODIFIER,
  payload: newDeflectionModifier,
})

export const setMiscArmorModifier = (
  newMiscArmorModifier: number,
): SetMiscArmorModifierAction => ({
  type: SET_MISC_ARMOR_MODIFIER,
  payload: newMiscArmorModifier,
})

export const setNaturalArmor = (
  newNaturalArmor: number,
): SetNaturalArmorAction => ({
  type: SET_NATURAL_ARMOR,
  payload: newNaturalArmor,
})

export const setOtherArmorModifiers = (
  newOtherArmorModifiers: string,
): SetOtherArmorModifiersAction => ({
  type: SET_OTHER_ARMOR_MODIFIERS,
  payload: newOtherArmorModifiers,
})
