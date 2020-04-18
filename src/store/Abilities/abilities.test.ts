import { AbilitiesReducer, createDefaultAbility } from './reducers'
import { setAbilityScore, setAbilityTempAdjustment } from './actions'
import { getAbilityModifiers, getModifierFromScore } from './selectors'
import { EmptyAction, RootReducer, RootState } from '../root-reducer'

const defaultAbility = { score: 10, temporaryAdjustment: 0 }

describe('createDefaultAbility', () => {
  it('should always return the same ability', () => {
    expect(createDefaultAbility()).toMatchObject(defaultAbility)
  })
})

describe('AbilitiesReducer', () => {
  it('should return all default abilities as the initial state', () => {
    const initialState = AbilitiesReducer()

    Object.values(initialState).forEach((ability) => {
      expect(ability).toMatchObject(defaultAbility)
    })
  })

  it('should be able to set an ability score to 12', () => {
    const initialState = AbilitiesReducer()

    expect(AbilitiesReducer(initialState, setAbilityScore('charisma', 12)))
      .toMatchObject({
        ...initialState,
        charisma: {
          ...initialState.charisma,
          score: 12,
        },
      })
  })

  it('should set the score to 0 when called with NaN', () => {
    const initialState = AbilitiesReducer()

    expect(AbilitiesReducer(initialState, setAbilityScore('charisma', NaN)))
      .toMatchObject({
        ...initialState,
        charisma: {
          ...initialState.charisma,
          score: 0,
        },
      })
  })

  it('should be able to set a temporary ability score to 12', () => {
    const initialState = AbilitiesReducer()

    expect(AbilitiesReducer(
      initialState,
      setAbilityTempAdjustment('charisma', 12),
    ))
      .toMatchObject({
        ...initialState,
        charisma: {
          ...initialState.charisma,
          temporaryAdjustment: 12,
        },
      })
  })

  it('should set the temp adjustment to 0 when called with NaN', () => {
    const initialState = AbilitiesReducer()

    expect(AbilitiesReducer(
      initialState,
      setAbilityTempAdjustment('charisma', NaN),
    ))
      .toMatchObject({
        ...initialState,
        charisma: {
          ...initialState.charisma,
          temporaryAdjustment: 0,
        },
      })
  })

  it('should return the state it was called with when called with a different action', () => {
    const initialState = AbilitiesReducer()
    const otherState = AbilitiesReducer(
      initialState,
      setAbilityTempAdjustment('charisma', 12),
    )

    expect(AbilitiesReducer(
      otherState,
      // @ts-ignore TypeScript wouldn't allow a different action
      { type: 'SOME_OTHER_ACTION' },
    )).toBe(otherState)
  })
})

describe('getModifierFromScore', () => {
  it('should return a modifier from 0 for a score of 10', () => {
    expect(getModifierFromScore(10)).toBe(0)
  })

  it('should return a modifier from 1 for a score of 12', () => {
    expect(getModifierFromScore(12)).toBe(1)
  })

  it('should return a modifier from -1 for a score of 8', () => {
    expect(getModifierFromScore(8)).toBe(-1)
  })

  it('should floor the modifier when the score is uneven', () => {
    expect(getModifierFromScore(11)).toBe(0)
    expect(getModifierFromScore(13)).toBe(1)
    expect(getModifierFromScore(9)).toBe(-1)
  })
})

describe('map score and temp adjustment to modifier', () => {
  const initialState = RootReducer(undefined, EmptyAction)

  it('should map the initial state to all 0s', () => {
    Object.values(getAbilityModifiers(initialState)).forEach(score => {
      expect(score).toBe(0)
    })
  })

  it('should return the correct modifiers for example scores', () => {
    const state: RootState = {
      ...initialState,
      abilities: {
        ...initialState.abilities,
        charisma: {
          score: 7,
          temporaryAdjustment: 3,
        },
        constitution: {
          score: 10,
          temporaryAdjustment: 3,
        },
        dexterity: {
          score: 12,
          temporaryAdjustment: 0,
        },
        intelligence: {
          score: 8,
          temporaryAdjustment: -2,
        },
      }
    }

    const modifiers = getAbilityModifiers(state)

    expect(modifiers).toMatchObject({
      charisma: 0,
      constitution: 1,
      dexterity: 1,
      intelligence: -2,
      strength: 0,
      wisdom: 0,
    })
  })
})
