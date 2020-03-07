import { AbilitiesActionTypes, AbilityState } from './types'
import { getModifierFromScore } from './selectors'

const createDefaultAbility = () => ({
  score: 10,
  temporaryAdjustment: 0,
})

const initialState: AbilityState = {
  charisma: createDefaultAbility(),
  constitution: createDefaultAbility(),
  dexterity: createDefaultAbility(),
  intelligence: createDefaultAbility(),
  strength: createDefaultAbility(),
  wisdom: createDefaultAbility(),
}

export const AbilitiesReducer = (state: AbilityState = initialState, action: AbilitiesActionTypes): AbilityState => {
  switch (action.type) {
    case 'SET_ABILITY_SCORE':
      return {
        ...state,
        [action.ability]: {
          ...state[action.ability],
          // NaN --> 0
          score: action.score || 0,
          modifier: getModifierFromScore(action.score),
        },
      }
    case 'SET_ABILITY_TEMP_ADJUSTMENT':
      return {
        ...state,
        [action.ability]: {
          ...state[action.ability],
          // NaN --> 0
          temporaryAdjustment: action.adjustment || 0,
        },
      }
    default:
      return state
  }
}
