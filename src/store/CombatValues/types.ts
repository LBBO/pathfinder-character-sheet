export type InitiativeState = {
  miscModifier: number
}
export const SET_INITIATIVE_MISC_MODIFIER = 'SET_INITIATIVE_MISC_MODIFIER'
export type SetInitiativeMiscModifierAction = {
  type: typeof SET_INITIATIVE_MISC_MODIFIER
  payload: number
}

export type ArmorClassState = {
  armorBonus: number // aus ruestung tabelle
  shieldBonus: number // aus ruestung tabelle
  naturalArmor: number // talente / volk
  deflectionModifier: number // zauber?
  miscModifier: number
  otherModifiers: string
}
export const SET_ARMOR_BONUS = 'SET_ARMOR_BONUS'
export type SetArmorBonusAction = {
  type: typeof SET_ARMOR_BONUS
  payload: number
}
export const SET_SHIELD_BONUS = 'SET_SHIELD_BONUS'
export type SetShieldBonusAction = {
  type: typeof SET_SHIELD_BONUS
  payload: number
}
export const SET_NATURAL_ARMOR = 'SET_NATURAL_ARMOR'
export type SetNaturalArmorAction = {
  type: typeof SET_NATURAL_ARMOR
  payload: number
}
export const SET_DEFLECTION_MODIFIER = 'SET_DEFLECTION_MODIFIER'
export type SetDeflectionModifierAction = {
  type: typeof SET_DEFLECTION_MODIFIER
  payload: number
}
export const SET_MISC_ARMOR_MODIFIER = 'SET_MISC_ARMOR_MODIFIER'
export type SetMiscArmorModifierAction = {
  type: typeof SET_MISC_ARMOR_MODIFIER
  payload: number
}
export const SET_OTHER_ARMOR_MODIFIERS = 'SET_OTHER_ARMOR_MODIFIERS'
export type SetOtherArmorModifiersAction = {
  type: typeof SET_OTHER_ARMOR_MODIFIERS
  payload: string
}

export type SavingThrowValues = {
  baseSave: number // tabellen
  magicModifier: number // zauber
  miscModifier: number // talente
  temporaryModifier: number
}
export const SET_BASE_SAVE = 'SET_BASE_SAVE'
export type SetBaseSaveAction = {
  type: typeof SET_BASE_SAVE
  payload: {
    savingThrowType: keyof SavingThrowsState
    newBaseSave: number
  }
}
export const SET_SAVING_THROW_MAGIC_MODIFIER = 'SET_SAVING_THROW_MAGIC_MODIFIER'
export type SetSavingThrowMagicModifierAction = {
  type: typeof SET_SAVING_THROW_MAGIC_MODIFIER
  payload: {
    savingThrowType: keyof SavingThrowsState
    newMagicModifier: number
  }
}
export const SET_MISC_SAVING_THROW_MODIFIER = 'SET_MISC_SAVING_THROW_MODIFIER'
export type SetMiscSavingThrowModifierAction = {
  type: typeof SET_MISC_SAVING_THROW_MODIFIER
  payload: {
    savingThrowType: keyof SavingThrowsState
    newMiscModifier: number
  }
}
export const SET_TEMPORARY_SAVING_THROW_MODIFIER =
  'SET_TEMPORARY_SAVING_THROW_MODIFIER'
export type SetTemporarySavingThrowModifierAction = {
  type: typeof SET_TEMPORARY_SAVING_THROW_MODIFIER
  payload: {
    savingThrowType: keyof SavingThrowsState
    newTemporaryModifier: number
  }
}

export type SavingThrowsState = {
  fortitude: SavingThrowValues
  reflex: SavingThrowValues
  will: SavingThrowValues
}

export type AttackBonusesState = {
  baseAttackBonus: number
  spellResistance: number // gegenstaende, klassen, voelker
}
export const SET_BASE_ATTACK_BONUS = 'SET_BASE_ATTACK_BONUS'
export type SetBaseAttackBonusAction = {
  type: typeof SET_BASE_ATTACK_BONUS
  payload: number
}
export const SET_SPELL_RESISTANCE = 'SET_SPELL_RESISTANCE'
export type SetSpellResistanceAction = {
  type: typeof SET_SPELL_RESISTANCE
  payload: number
}

export type CombatValuesState = {
  initiative: InitiativeState
  armorClass: ArmorClassState
  savingThrows: SavingThrowsState
  attackBonuses: AttackBonusesState
}

export type CombatValuesActionTypes =
  | SetInitiativeMiscModifierAction
  | SetArmorBonusAction
  | SetShieldBonusAction
  | SetNaturalArmorAction
  | SetDeflectionModifierAction
  | SetMiscArmorModifierAction
  | SetOtherArmorModifiersAction
  | SetBaseSaveAction
  | SetSavingThrowMagicModifierAction
  | SetMiscSavingThrowModifierAction
  | SetTemporarySavingThrowModifierAction
  | SetBaseAttackBonusAction
  | SetSpellResistanceAction
