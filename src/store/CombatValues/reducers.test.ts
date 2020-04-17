import { rootReducer, RootState } from '../root-reducer'
import { setAbilityScore } from '../Abilities/actions'
import { getCurrentModifiersFromAbilities } from '../Abilities/selectors'
import { armorClassReducer, CombatValuesReducer, initiativeReducer } from './reducers'
import { SizeCategory } from '../CharacterMetaData/Character'
import { initialCombatValuesState } from './initialState'
import {
  setBaseSave,
  setMiscSavingThrowModifier,
  setSavingThrowMagicModifier,
  setTemporarySavingThrowModifier,
} from './actions'

describe('initiativeReducer', () => {
  let rootState: RootState

  beforeEach(() => {
    rootState = rootReducer()
  })

  it('should return the sum of misc initiative mod and dexterity mod', () => {
    rootState = rootReducer(rootState, setAbilityScore('dexterity', 14))
    const abilityModifiers = getCurrentModifiersFromAbilities(rootState.abilities)
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
    const abilityModifiers = getCurrentModifiersFromAbilities(rootState.abilities)
    expect(armorClassReducer(rootState.combatValues, abilityModifiers, rootState.characterMetaData)).toBe(10)
  })

  it('should return the sum of all values plus 10', () => {
    rootState.combatValues.armorClass.armorBonus = 1
    rootState.combatValues.armorClass.shieldBonus = 1
    rootState.combatValues.armorClass.naturalArmor = 1
    rootState.combatValues.armorClass.deflectionModifier = 1
    rootState.combatValues.armorClass.miscModifier = 1
    // Evaluates to dex mod of +1
    rootState.abilities.dexterity.score = 12
    // Evaluates to size mod of +1
    rootState.characterMetaData.sizeCategory = SizeCategory.SMALL
    const abilityMods = getCurrentModifiersFromAbilities(rootState.abilities)

    expect(armorClassReducer(rootState.combatValues, abilityMods, rootState.characterMetaData))
      .toBe(17)
  })
})

describe('attackBonusesReducer', () => {})

describe('savingThrowReducer', () => {
  it('should set base save correctly', () => {
    expect(initialCombatValuesState.savingThrows.fortitude.baseSave).not.toBe(2)
    const action = setBaseSave(2, 'fortitude')
    const newState = CombatValuesReducer(initialCombatValuesState, action)
    expect(newState.savingThrows.fortitude.baseSave).toBe(2)
  })

  it('should set magic modifier correctly', () => {
    expect(initialCombatValuesState.savingThrows.fortitude.magicModifier).not.toBe(2)
    const action = setSavingThrowMagicModifier(2, 'fortitude')
    const newState = CombatValuesReducer(initialCombatValuesState, action)
    expect(newState.savingThrows.fortitude.magicModifier).toBe(2)
  })

  it('should set misc modifier correctly', () => {
    expect(initialCombatValuesState.savingThrows.fortitude.miscModifier).not.toBe(2)
    const action = setMiscSavingThrowModifier(2, 'fortitude')
    const newState = CombatValuesReducer(initialCombatValuesState, action)
    expect(newState.savingThrows.fortitude.miscModifier).toBe(2)
  })

  it('should set temp modifier correctly', () => {
    expect(initialCombatValuesState.savingThrows.fortitude.temporaryModifier).not.toBe(2)
    const action = setTemporarySavingThrowModifier(2, 'fortitude')
    const newState = CombatValuesReducer(initialCombatValuesState, action)
    expect(newState.savingThrows.fortitude.temporaryModifier).toBe(2)
  })

  describe('fortitude', () => {})
  describe('reflex', () => {})
  describe('will', () => {})
})