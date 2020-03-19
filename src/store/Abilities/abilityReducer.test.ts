import { AbilitiesReducer, createDefaultAbility } from './reducers'
import { setAbilityScore, setAbilityTempAdjustment } from './actions'

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
