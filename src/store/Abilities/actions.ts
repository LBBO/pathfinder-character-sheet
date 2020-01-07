import {
  abilityName,
  SET_ABILITY_SCORE,
  SET_ABILITY_TEMP_ADJUSTMENT,
  SetAbilityScoreAction,
  SetAbilityTempAdjustmentAction,
} from './types'

export const setAbilityScore = (ability: abilityName, newScore: number): SetAbilityScoreAction => {
  if (newScore >= 0 && newScore <= 20) {
    return {
      type: SET_ABILITY_SCORE,
      ability: ability,
      score: newScore,
    }
  } else {
    throw new Error('Cant set ability value higher than 20 or lower than 0')
  }
}

export const setAbilityTempAdjustment = (ability: abilityName, newAdjustment: number): SetAbilityTempAdjustmentAction => {
  if (newAdjustment >= 0 && newAdjustment <= 20) {
    return {
      type: SET_ABILITY_TEMP_ADJUSTMENT,
      ability: ability,
      adjustment: newAdjustment,
    }
  } else {
    throw new Error('Cant set ability value higher than 20 or lower than 0')
  }
}
