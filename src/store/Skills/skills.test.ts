import { quickSkillDefinitions, Skill, SkillState } from './types'
import { applyNewModifiers, createInitialState, SkillsReducer, updateTotalSkillBonus } from './reducers'
import { AbilityModifiers, getAbilityModifiers } from '../Abilities/selectors'
import { setAbilityScore } from '../Abilities/actions'
import { setIsSkillClassSkill, setSkillMiscMod, setSkillRanks } from './actions'
import { rootReducer, RootState } from '../root-reducer'
import { abilityName } from '../Abilities/types'

let initialRootState: RootState
let initialAbilityModifiers: AbilityModifiers
let initialState: SkillState
const newModifierValue = 1

const setup = () => {
  initialRootState = rootReducer()
  const abilityNames: abilityName[] = [
    'charisma',
    'constitution',
    'dexterity',
    'intelligence',
    'strength',
    'wisdom',
  ]

  abilityNames.forEach((abilityName) => {
    initialRootState = rootReducer(
      initialRootState,
      setAbilityScore(abilityName, 10 + newModifierValue * 2),
    )
  })

  initialAbilityModifiers = getAbilityModifiers(initialRootState)

  initialState = createInitialState(initialAbilityModifiers)
}

beforeEach(setup)
setup()

describe('total skill bonus calculator', () => {
  let skill: Skill

  beforeEach(() => {
    skill = {
      isClassSkill: false,
      name: 'acrobatics',
      miscModifier: 0,
      ranks: 0,
      abilityModifier: 0,
      totalBonus: NaN,
    }
  })

  it('should return 0 when every modifier is 0', () => {
    updateTotalSkillBonus(skill)
    expect(skill.totalBonus).toBe(0)
  })

  it('should include ability mod, ranks and misc mod in calculation', () => {
    skill.ranks = 1
    skill.abilityModifier = 3
    skill.miscModifier = -2

    updateTotalSkillBonus(skill)

    expect(skill.totalBonus).toBe(2)
  })

  it('should add a bonus of 3 if a class skill has at least one rank', () => {
    skill.isClassSkill = true
    skill.ranks = 0
    updateTotalSkillBonus(skill)

    expect(skill.totalBonus).toBe(0)

    skill.ranks = 1

    updateTotalSkillBonus(skill)

    // ranks + bonus for class skill = 4
    expect(skill.totalBonus).toBe(4)
  })
})

describe('createInitialState', () => {
  const initialModifiers = getAbilityModifiers(rootReducer())

  it('should always create the same state when called with initial modifiers', () => {
    expect(createInitialState(initialModifiers)).toMatchSnapshot()
  })

  it('should consider different modifiers', () => {
    initialModifiers.strength = 2
    initialModifiers.intelligence = -1

    const initialState = createInitialState((
      initialModifiers
    ))

    expect(initialState.climb.abilityModifier).toBe(2)
    expect(initialState.climb.totalBonus).toBe(2)
    expect(initialState.knowledgeArcana.abilityModifier).toBe(-1)
    expect(initialState.knowledgeArcana.totalBonus).toBe(-1)
  })
})

describe('applyNewModifiers', () => {
  it('should set every skills ability modifier', () => {
    const newState = applyNewModifiers(initialState, initialAbilityModifiers)

    Object.values(newState).forEach(skill => {
      expect(skill.abilityModifier).toBe(newModifierValue)
    })
  })

  it('should set every total bonus', () => {
    const newState = applyNewModifiers(initialState, initialAbilityModifiers)

    Object.values(newState).forEach(skill => {
      expect(skill.totalBonus).toBe(newModifierValue)
    })
  })
})

describe('SkillsReducer', () => {
  it('should return the correct initial state', () => {
    expect(SkillsReducer(
      undefined,
      undefined,
      initialAbilityModifiers,
      undefined,
    )).toMatchObject(initialState)
  })

  describe('when charisma was changed', () => {
    // compute changed ability mods
    const newAbilityMod = 14
    const changedAbilityName = 'charisma'
    const action = setAbilityScore(changedAbilityName, newAbilityMod)
    const newModifiers = getAbilityModifiers(rootReducer(initialRootState, action))

    // compute new state after abilities changed
    const newSkillState = SkillsReducer(
      initialState,
      // @ts-ignore TS wouldn't allow to call reducer with unsupported action
      action,
      newModifiers,
      true,
    )

    type SkillDefinition = typeof quickSkillDefinitions[keyof typeof quickSkillDefinitions]
    (
      Object.entries(quickSkillDefinitions) as Array<[keyof typeof quickSkillDefinitions, SkillDefinition]>
    )
      .forEach(([skillName, skillDefinition]) => {
        // if skill is based on charisma, it should have a new ability mod and total bonus
        if (skillDefinition.baseAbility === changedAbilityName) {
          it(`should have updated ${skillName}`, () => {
            const skill = newSkillState[skillName]
            expect(skill.abilityModifier).toBe(newModifiers[changedAbilityName])
            expect(skill.totalBonus).toBe(newModifiers[changedAbilityName])
          })
        } else {
          // if skill is not based on charisma, it should be the same as before
          it(`should not have changed ${skillName}`, () => {
            expect(newSkillState[skillName]).toMatchObject(initialState[skillName])
          })
        }
      })
  })

  it('should update a skill correctly when a misc mod is changed', () => {
    const action = setSkillMiscMod('acrobatics', 2)
    const newState = SkillsReducer(initialState, action, initialAbilityModifiers)
    expect(newState).toMatchObject({
      ...initialState,
      acrobatics: {
        ...initialState.acrobatics,
        miscModifier: 2,
        // ability modifier of initialState is 1
        totalBonus: 3,
      },
    })
  })

  it('should update a skill correctly when its ranks are changed', () => {
    const action = setSkillRanks('acrobatics', 2)
    const newState = SkillsReducer(initialState, action, initialAbilityModifiers)
    expect(newState).toMatchObject({
      ...initialState,
      acrobatics: {
        ...initialState.acrobatics,
        ranks: 2,
        // ability modifier of initialState is 1
        totalBonus: 3,
      },
    })
  })

  it('should update a skill correctly when its class skill flag is changed', () => {
    const setClassSkillAction = setIsSkillClassSkill('acrobatics', true)
    const stateWithClassSkill = SkillsReducer(initialState, setClassSkillAction, initialAbilityModifiers)
    expect(stateWithClassSkill).toMatchObject({
      ...initialState,
      acrobatics: {
        ...initialState.acrobatics,
        isClassSkill: true,
        // ability modifier of initialState is 1
        totalBonus: 1,
      },
    })

    const setRanksAction = setSkillRanks('acrobatics', 1)
    const stateWithRank = SkillsReducer(stateWithClassSkill, setRanksAction, initialAbilityModifiers)
    expect(stateWithRank).toMatchObject({
      ...initialState,
      acrobatics: {
        ...initialState.acrobatics,
        isClassSkill: true,
        ranks: 1,
        // ability modifier of initialState is 1
        totalBonus: 5,
      },
    })
  })
})
