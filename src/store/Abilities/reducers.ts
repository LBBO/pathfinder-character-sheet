import {AbilitiesActionTypes, AbilityState} from './types'

const getModifierFromScore = (score: number) => Math.floor(score / 2) - 5

const initialState: AbilityState = {
  charisma: {
    score: 10,
    modifier: 0,
  },
  constitution: {
    score: 10,
    modifier: 0,
  },
  dexterity: {
    score: 10,
    modifier: 0,
  },
  intelligence: {
    score: 10,
    modifier: 0,
  },
  strength: {
    score: 10,
    modifier: 0,
  },
  wisdom: {
    score: 10,
    modifier: 0,
  },
}

export const AbilitiesReducer = (state: AbilityState = initialState, action: AbilitiesActionTypes): AbilityState => {
  switch (action.type) {
    case 'SET_ABILITY_SCORE':
      const newState: AbilityState = {
        ...state,
        [action.ability]: {
          score: action.score,
          modifier: getModifierFromScore(action.score),
        },
      }

      const abilityName = action.ability
      const tempAdjustment = state[abilityName].temporaryAdjustment
      if (tempAdjustment) {
        newState[abilityName].temporaryModifier = getModifierFromScore(action.score + tempAdjustment)
      }

      return newState
    case 'SET_ABILITY_TEMP_ADJUSTMENT':
      return {
        ...state,
        [action.ability]: {
          ...state[action.ability],
          tempAdjustment: action.adjustment,
          tempModifier: getModifierFromScore(state[action.ability].score + action.adjustment),
        },
      }
    default:
      return state
  }
}
