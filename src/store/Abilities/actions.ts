import {
  abilityName,
  SET_ABILITY_SCORE,
  SET_ABILITY_TEMP_ADJUSTMENT,
  SetAbilityScoreAction,
  SetAbilityTempAdjustmentAction,
} from './types'

export const setAbilityScore = (
  ability: abilityName,
  newScore: number,
): SetAbilityScoreAction => {
  return {
    type: SET_ABILITY_SCORE,
    ability: ability,
    score: newScore,
  }
}

export const setAbilityTempAdjustment = (
  ability: abilityName,
  newAdjustment: number,
): SetAbilityTempAdjustmentAction => {
  return {
    type: SET_ABILITY_TEMP_ADJUSTMENT,
    ability: ability,
    adjustment: newAdjustment,
  }
}
