import { abilityName, SET_ABILITY_SCORE, SetAbilityScoreAction } from './types'

export const setAbilityScore = (ability: abilityName, newScore: number): SetAbilityScoreAction => {
  if (newScore >= 0 && newScore <= 20) {
    return {
      type: SET_ABILITY_SCORE,
      ability: ability,
      score: newScore
    }
  }
}
