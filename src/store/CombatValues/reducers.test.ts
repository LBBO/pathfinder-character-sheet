import { rootReducer, RootState } from '../root-reducer'
import { setAbilityScore } from '../Abilities/actions'
import { getAbilityModifiers } from '../Abilities/selectors'
import { armorClassReducer, CombatValuesReducer, initiativeReducer } from './reducers'
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

describe('initiativeReducer', () => {
  let rootState: RootState

  beforeEach(() => {
    rootState = rootReducer()
  })

  it('should return the sum of misc initiative mod and dexterity mod', () => {
    rootState = rootReducer(rootState, setAbilityScore('dexterity', 14))
    const abilityModifiers = getAbilityModifiers(rootState)
    rootState.combatValues.initiative.miscModifier = -1

    expect(initiativeReducer(rootState.combatValues, abilityModifiers)).toBe(1)
  })
})

describe('armorClassReducer', () => {
  let rootState: RootState

  beforeEach(() => {
    rootState = rootReducer()
  })

  it('should return 10 when all values are at 0', () => {
    const abilityModifiers = getAbilityModifiers(rootState)
    expect(armorClassReducer(rootState.combatValues, abilityModifiers, rootState.characterMetaData)).toBe(10)
  })

  it('should return the sum of all values plus 10', () => {
    rootState = rootReducer(rootState, setArmorBonus(1))
    rootState = rootReducer(rootState, setShieldBonus(1))
    rootState = rootReducer(rootState, setNaturalArmor(1))
    rootState = rootReducer(rootState, setDeflectionModifier(1))
    rootState = rootReducer(rootState, setMiscArmorModifier(1))
    // Evaluates to dex mod of +1
    rootState = rootReducer(rootState, setAbilityScore('dexterity', 12))
    // Evaluates to size mod of +1
    rootState = rootReducer(rootState, setCharacterSizeCategory(SizeCategory.SMALL))
    const abilityMods = getAbilityModifiers(rootState)

    expect(armorClassReducer(rootState.combatValues, abilityMods, rootState.characterMetaData))
      .toBe(17)
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
