import {AbilitiesActionTypes, AbilityState} from './types'

const getModifierFromScore = (score: number) => Math.floor(score / 2) - 5

const createDefaultAbility = () => ({
  score: 10,
    modifier: 0,
    temporaryAdjustment: 0,
    temporaryModifier: 0,
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
      const newState: AbilityState = {
        ...state,
        [action.ability]: {
          ...state[action.ability],
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
      console.log(action, state[action.ability])
      return {
        ...state,
        [action.ability]: {
          ...state[action.ability],
          temporaryAdjustment: action.adjustment,
          temporaryModifier: getModifierFromScore(state[action.ability].score + action.adjustment),
        },
      }
    default:
      return state
  }
}
