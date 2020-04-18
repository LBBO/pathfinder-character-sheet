import { EmptyAction, RootReducer, RootState } from '../root-reducer'
import { setAbilityScore } from '../Abilities/actions'
import { CombatValuesReducer } from './reducers'
import { SizeCategory } from '../CharacterMetaData/Character'
import { getInitialCombatValuesState } from './initialState'
import {
  setArmorBonus,
  setBaseAttackBonus,
  setBaseSave,
  setDeflectionModifier,
  setInitiativeMiscModifier,
  setMiscArmorModifier,
  setMiscSavingThrowModifier,
  setNaturalArmor,
  setOtherArmorModifiers,
  setSavingThrowMagicModifier,
  setShieldBonus,
  setSpellResistance,
  setTemporarySavingThrowModifier,
} from './actions'
import { setCharacterSizeCategory } from '../CharacterMetaData/actions'
import {
  getArmorClass,
  getCombatManeuverBonus,
  getCombatManeuverDefense,
  getFlatFootedArmorClass,
  getFortitudeBonus,
  getReflexBonus,
  getTotalInitiativeBonus,
  getTouchArmorClass,
  getWillBonus,
} from './selectors'
import { SavingThrowsState } from './types'

describe('getTotalInitiativeBonus', () => {
  let rootState: RootState

  beforeEach(() => {
    rootState = RootReducer(undefined, EmptyAction)
  })

  it('should return the sum of misc initiative mod and dexterity mod', () => {
    rootState = RootReducer(rootState, setAbilityScore('dexterity', 14))
    rootState = RootReducer(rootState, setInitiativeMiscModifier(-1))

    expect(getTotalInitiativeBonus(rootState)).toBe(1)
  })
})

describe('getArmorClass', () => {
  let rootState: RootState

  beforeEach(() => {
    rootState = RootReducer(undefined, EmptyAction)
  })

  it('should return 10 when all values are at 0', () => {
    expect(getArmorClass(rootState)).toBe(10)
  })

  describe('different armor classes', () => {
    beforeEach(() => {
      rootState = RootReducer(rootState, setArmorBonus(1))
      rootState = RootReducer(rootState, setShieldBonus(1))
      rootState = RootReducer(rootState, setNaturalArmor(1))
      rootState = RootReducer(rootState, setDeflectionModifier(1))
      rootState = RootReducer(rootState, setMiscArmorModifier(1))
      // Evaluates to dex mod of +1
      rootState = RootReducer(rootState, setAbilityScore('dexterity', 12))
      // Evaluates to size mod of +1
      rootState = RootReducer(rootState, setCharacterSizeCategory(SizeCategory.SMALL))
    })

    it('armor class should return the sum of all values plus 10', () => {
      expect(getArmorClass(rootState)).toBe(17)
    })

    it('touch armor class should ignore armor bonuses', () => {
      // Should be ignored
      rootState = RootReducer(rootState, setArmorBonus(2))
      rootState = RootReducer(rootState, setNaturalArmor(2))
      rootState = RootReducer(rootState, setShieldBonus(2))

      expect(getTouchArmorClass(rootState)).toBe(14)
    })

    it('flatt-footed should ignore dex mod if it is positive', () => {
      // Should be ignored
      rootState = RootReducer(rootState, setAbilityScore('dexterity', 14))

      expect(getFlatFootedArmorClass(rootState)).toBe(16)
    })

    it('flatt-footed should NOT ignore dex mod if it is negative', () => {
      // Should NOT be ignored
      rootState = RootReducer(rootState, setAbilityScore('dexterity', 6))

      expect(getFlatFootedArmorClass(rootState)).toBe(14)
    })
  })
})

describe('savingThrowReducer', () => {
  it('should set base save correctly', () => {
    expect(getInitialCombatValuesState().savingThrows.fortitude.baseSave).toBe(0)
    const action = setBaseSave(2, 'fortitude')
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.savingThrows.fortitude.baseSave).toBe(2)
  })

  it('should set magic modifier correctly', () => {
    expect(getInitialCombatValuesState().savingThrows.fortitude.magicModifier).toBe(0)
    const action = setSavingThrowMagicModifier(2, 'fortitude')
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.savingThrows.fortitude.magicModifier).toBe(2)
  })

  it('should set misc modifier correctly', () => {
    expect(getInitialCombatValuesState().savingThrows.fortitude.miscModifier).toBe(0)
    const action = setMiscSavingThrowModifier(2, 'fortitude')
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.savingThrows.fortitude.miscModifier).toBe(2)
  })

  it('should set temp modifier correctly', () => {
    expect(getInitialCombatValuesState().savingThrows.fortitude.temporaryModifier).toBe(0)
    const action = setTemporarySavingThrowModifier(2, 'fortitude')
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.savingThrows.fortitude.temporaryModifier).toBe(2)
  })
})

describe('initiative misc modifier', () => {
  it('should be set correctly', () => {
    expect(getInitialCombatValuesState().initiative.miscModifier).toBe(0)
    const action = setInitiativeMiscModifier(2)
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.initiative.miscModifier).toBe(2)
  })
})

describe('attack bonuses', () => {
  it('should set the base attack bonus correctly', () => {
    expect(getInitialCombatValuesState().attackBonuses.baseAttackBonus).toBe(0)
    const action = setBaseAttackBonus(2)
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.attackBonuses.baseAttackBonus).toBe(2)
  })

  it('should set the spell resistance bonus correctly', () => {
    expect(getInitialCombatValuesState().attackBonuses.spellResistance).toBe(0)
    const action = setSpellResistance(2)
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.attackBonuses.spellResistance).toBe(2)
  })

  describe('saving throws', () => {
    let state =

      beforeEach(() => {
        state = RootReducer(undefined, EmptyAction)
      })

    const setValuesFor = (savingThrowName: keyof SavingThrowsState) => {
      state = RootReducer(state, setBaseSave(1, savingThrowName))
      state = RootReducer(state, setSavingThrowMagicModifier(1, savingThrowName))
      state = RootReducer(state, setMiscSavingThrowModifier(1, savingThrowName))
      state = RootReducer(state, setTemporarySavingThrowModifier(1, savingThrowName))
    }

    it('should return the sum of all required values and constitution mod for fortitude', () => {
      setValuesFor('fortitude')
      state = RootReducer(state, setAbilityScore('constitution', 14))
      expect(getFortitudeBonus(state)).toBe(6)
    })

    it('should return the sum of all required values and dexterity mod for reflex', () => {
      setValuesFor('reflex')
      state = RootReducer(state, setAbilityScore('dexterity', 14))
      expect(getReflexBonus(state)).toBe(6)
    })

    it('should return the sum of all required values and wisdom mod for will', () => {
      setValuesFor('will')
      state = RootReducer(state, setAbilityScore('wisdom', 14))
      expect(getWillBonus(state)).toBe(6)
    })
  })

  describe('combat maneuvers', () => {
    it('should correctly calculate combat maneuver bonus', () => {
      let state = RootReducer(undefined, setBaseAttackBonus(1))
      state = RootReducer(state, setAbilityScore('strength', 12))
      // Size modifiers are inverted in combat maneuvers! Large is good; small is bad
      state = RootReducer(state, setCharacterSizeCategory(SizeCategory.LARGE))

      expect(getCombatManeuverBonus(state)).toBe(3)
    })

    it('should correctly calculate combat maneuver defense', () => {
      let state = RootReducer(undefined, setBaseAttackBonus(1))
      state = RootReducer(state, setAbilityScore('strength', 12))
      // Size modifiers are inverted in combat maneuvers! Large is good; small is bad
      state = RootReducer(state, setCharacterSizeCategory(SizeCategory.LARGE))
      state = RootReducer(state, setAbilityScore('dexterity', 12))

      expect(getCombatManeuverDefense(state)).toBe(14)
    })
  })
})

describe('armorClass', () => {
  it('should set the shield bonus correctly', () => {
    expect(getInitialCombatValuesState().armorClass.shieldBonus).toBe(0)
    const action = setShieldBonus(2)
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.armorClass.shieldBonus).toBe(2)
  })

  it('should set the armor bonus correctly', () => {
    expect(getInitialCombatValuesState().armorClass.armorBonus).toBe(0)
    const action = setArmorBonus(2)
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.armorClass.armorBonus).toBe(2)
  })

  it('should set the deflection modifier correctly', () => {
    expect(getInitialCombatValuesState().armorClass.deflectionModifier).toBe(0)
    const action = setDeflectionModifier(2)
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.armorClass.deflectionModifier).toBe(2)
  })

  it('should set the misc modifier correctly', () => {
    expect(getInitialCombatValuesState().armorClass.miscModifier).toBe(0)
    const action = setMiscArmorModifier(2)
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.armorClass.miscModifier).toBe(2)
  })

  it('should set the natural armor correctly', () => {
    expect(getInitialCombatValuesState().armorClass.naturalArmor).toBe(0)
    const action = setNaturalArmor(2)
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.armorClass.naturalArmor).toBe(2)
  })

  it('should set the other modifiers correctly', () => {
    expect(getInitialCombatValuesState().armorClass.otherModifiers).toBe('')
    const otherArmorModifiers = 'other armor modifiers'
    const action = setOtherArmorModifiers(otherArmorModifiers)
    const newState = CombatValuesReducer(getInitialCombatValuesState(), action)
    expect(newState.armorClass.otherModifiers).toBe(otherArmorModifiers)
  })
})
