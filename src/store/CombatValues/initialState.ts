import { CombatValuesState } from './types'

export const getInitialCombatValuesState = (): CombatValuesState => ({
  armorClass: {
    shieldBonus: 0,
    deflectionModifier: 0,
    miscModifier: 0,
    naturalArmor: 0,
    otherModifiers: '',
  },
  initiative: {
    miscModifier: 0,
  },
  attackBonuses: {
    baseAttackBonus: 0,
    spellResistance: 0,
  },
  savingThrows: {
    fortitude: {
      baseSave: 0,
      magicModifier: 0,
      miscModifier: 0,
      temporaryModifier: 0,
    },
    reflex: {
      baseSave: 0,
      magicModifier: 0,
      miscModifier: 0,
      temporaryModifier: 0,
    },
    will: {
      baseSave: 0,
      magicModifier: 0,
      miscModifier: 0,
      temporaryModifier: 0,
    },
  },
})
