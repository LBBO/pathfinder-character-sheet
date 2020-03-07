import {CharacterMetaDataReducer} from './CharacterMetaData/reducers'
import {AbilitiesReducer} from './Abilities/reducers'
import { SkillsReducer } from './Skills/reducers'
import { CharacterMetaDataState, UpdateCharacterMetaDataActionTypes } from './CharacterMetaData/types'
import { AbilitiesActionTypes, AbilityState } from './Abilities/types'
import { SkillState, UpdateSkillActionTypes } from './Skills/types'
import { Action } from 'redux'
import { getCurrentModifiersFromAbilities } from './Abilities/selectors'

export type RootState = {
  characterMetaData: CharacterMetaDataState,
  abilities: AbilityState,
  skills: SkillState,
}

export type RootActionTypes = UpdateCharacterMetaDataActionTypes | AbilitiesActionTypes

export const rootReducer = (state?: RootState, action?: Action): RootState => {
  const characterMetaData = CharacterMetaDataReducer(state?.characterMetaData, action as UpdateCharacterMetaDataActionTypes)
  const abilities = AbilitiesReducer(state?.abilities, action as AbilitiesActionTypes)
  const abilityModifiers = getCurrentModifiersFromAbilities(abilities)

  return {
    characterMetaData,
    abilities,
    skills: SkillsReducer(state?.skills, action as UpdateSkillActionTypes, abilityModifiers, abilities !== state?.abilities),
  }
}
