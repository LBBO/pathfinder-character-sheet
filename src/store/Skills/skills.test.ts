import { quickSkillDefinitions, Skill, SkillState } from './types'
import { createInitialState, SkillsReducer } from './reducers'
import { setAbilityScore } from '../Abilities/actions'
import { setIsSkillClassSkill, setSkillMiscMod, setSkillRanks } from './actions'
import { EmptyAction, RootReducer, RootState } from '../root-reducer'
import { abilityName } from '../Abilities/types'
import { computeTotalSkillBonus, getTotalSkillBonuses } from './selectors'
import { setCharacterSizeCategory } from '../CharacterMetaData/actions'
import { SizeCategory } from '../CharacterMetaData/Character'
import { addArmorItem } from '../Inventory/actions'

let initialRootState: RootState
let initialState: SkillState
const newModifierValue = 1

const setup = () => {
  initialRootState = RootReducer(undefined, EmptyAction)
  const abilityNames: abilityName[] = [
    'charisma',
    'constitution',
    'dexterity',
    'intelligence',
    'strength',
    'wisdom',
  ]

  abilityNames.forEach((abilityName) => {
    initialRootState = RootReducer(
      initialRootState,
      setAbilityScore(abilityName, 10 + newModifierValue * 2),
    )
  })

  initialState = createInitialState()
}

beforeEach(setup)
setup()

describe('total skill bonus calculator', () => {
  let skill: Skill
  let abilityModifier: number

  beforeEach(() => {
    skill = {
      isClassSkill: false,
      name: 'acrobatics',
      miscModifier: 0,
      ranks: 0,
    }
    abilityModifier = 0
  })

  it('should return 0 when every modifier is 0', () => {
    expect(computeTotalSkillBonus(skill, abilityModifier)).toBe(0)
  })

  it('should include ability mod, ranks and misc mod in calculation', () => {
    skill.ranks = 1
    abilityModifier = 3
    skill.miscModifier = -2

    expect(computeTotalSkillBonus(skill, abilityModifier)).toBe(2)
  })

  it('should add a bonus of 3 if a class skill has at least one rank', () => {
    skill.isClassSkill = true
    skill.ranks = 0

    expect(computeTotalSkillBonus(skill, abilityModifier)).toBe(0)

    skill.ranks = 1

    // ranks + bonus for class skill = 4
    expect(computeTotalSkillBonus(skill, abilityModifier)).toBe(4)
  })
})

describe('createInitialState', () => {
  it('should always create the same state when called with initial modifiers', () => {
    expect(createInitialState()).toMatchSnapshot()
  })
})

describe('SkillsReducer', () => {
  it('should return the correct initial state', () => {
    expect(SkillsReducer()).toMatchObject(initialState)
  })

  it('should update a skill correctly when a misc mod is changed', () => {
    const action = setSkillMiscMod('acrobatics', 2)
    const newState = SkillsReducer(initialState, action)
    expect(newState).toMatchObject({
      ...initialState,
      acrobatics: {
        ...initialState.acrobatics,
        miscModifier: 2,
      },
    })
  })

  it('should update a skill correctly when its ranks are changed', () => {
    const action = setSkillRanks('acrobatics', 2)
    const newState = SkillsReducer(initialState, action)
    expect(newState).toMatchObject({
      ...initialState,
      acrobatics: {
        ...initialState.acrobatics,
        ranks: 2,
      },
    })
  })

  it('should update a skill correctly when its class skill flag is changed', () => {
    const setClassSkillAction = setIsSkillClassSkill('acrobatics', true)
    const stateWithClassSkill = SkillsReducer(initialState, setClassSkillAction)
    expect(stateWithClassSkill).toMatchObject({
      ...initialState,
      acrobatics: {
        ...initialState.acrobatics,
        isClassSkill: true,
      },
    })

    const setRanksAction = setSkillRanks('acrobatics', 1)
    const stateWithRank = SkillsReducer(stateWithClassSkill, setRanksAction)
    expect(stateWithRank).toMatchObject({
      ...initialState,
      acrobatics: {
        ...initialState.acrobatics,
        isClassSkill: true,
        ranks: 1,
      },
    })
  })
})

describe('total skill bonus selector', () => {
  it('should update when an ability is changed', () => {
    const oldTotalBonuses = getTotalSkillBonuses(initialRootState)
    const action = setAbilityScore('dexterity', 14)
    const newState = RootReducer(initialRootState, action)
    const newTotalBonuses = getTotalSkillBonuses(newState)

    expect(oldTotalBonuses).not.toBe(newTotalBonuses)
    expect(quickSkillDefinitions.acrobatics.baseAbility).toBe('dexterity')
    expect(newTotalBonuses.acrobatics).toBe(2)
  })

  it('should update when a skill is changed', () => {
    initialRootState = RootReducer(
      initialRootState,
      setAbilityScore('dexterity', 10),
    )
    const oldTotalBonuses = getTotalSkillBonuses(initialRootState)
    const action = setSkillRanks('acrobatics', 1)
    const newState = RootReducer(initialRootState, action)
    const newTotalBonuses = getTotalSkillBonuses(newState)

    expect(oldTotalBonuses).not.toBe(newTotalBonuses)
    expect(newTotalBonuses.acrobatics).toBe(1)
  })

  it('should not update something else is changed', () => {
    const oldTotalBonuses = getTotalSkillBonuses(initialRootState)
    const action = setCharacterSizeCategory(SizeCategory.SMALL)
    const newState = RootReducer(initialRootState, action)
    const newTotalBonuses = getTotalSkillBonuses(newState)

    expect(oldTotalBonuses).toBe(newTotalBonuses)
  })

  it('should subtract total armor check penalty from DEX and STR skills', () => {
    let state = RootReducer(
      undefined,
      addArmorItem({
        name: '',
        type: '',
        properties: '',
        checkPenalty: 1,
      }),
    )
    state = RootReducer(state, setSkillRanks('acrobatics', 2))
    state = RootReducer(state, setSkillRanks('climb', 2))

    expect(getTotalSkillBonuses(state).acrobatics).toBe(1)
    expect(getTotalSkillBonuses(state).climb).toBe(1)
  })
})
