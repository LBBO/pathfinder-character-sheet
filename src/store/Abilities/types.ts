export type abilityName = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'

export type AbilityAttributes = {
  score: number
  modifier: number
  temporaryAdjustment?: number
  temporaryModifier?: number
}

export type AbilityState = {
  [k in abilityName]: AbilityAttributes
}

export const SET_ABILITY_SCORE = 'SET_ABILITY_SCORE'
export const SET_ABILITY_TEMP_ADJUSTMENT = 'SET_ABILITY_TEMP_ADJUSTMENT'

export type SetAbilityScoreAction = {
  type: typeof SET_ABILITY_SCORE
  ability: keyof AbilityState
  score: number
}

export type SetAbilityTempAdjustmentAction = {
  type: typeof SET_ABILITY_TEMP_ADJUSTMENT
  ability: keyof AbilityState
  adjustment: number
}

export type AbilitiesActionTypes = SetAbilityTempAdjustmentAction | SetAbilityScoreAction
