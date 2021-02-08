import { CharacterMetaDataReducer } from './CharacterMetaData/reducers'
import { AbilitiesReducer } from './Abilities/reducers'
import { SkillsReducer } from './Skills/reducers'
import {
  CharacterMetaDataState,
  UpdateCharacterMetaDataActionTypes,
} from './CharacterMetaData/types'
import { AbilitiesActionTypes, AbilityState } from './Abilities/types'
import { SkillState, UpdateSkillActionTypes } from './Skills/types'
import {
  CombatValuesActionTypes,
  CombatValuesState,
} from './CombatValues/types'
import { CombatValuesReducer } from './CombatValues/reducers'
import { combineReducers } from 'redux'
import { AppState, AppStateActionTypes } from './AppState/types'
import { AppStateReducer } from './AppState/reducers'
import { TalentsReducer, TalentsState } from './Talents/reducers'
import { TalentsActionType } from './Talents/actions'

export type RootState = {
  characterMetaData: CharacterMetaDataState
  abilities: AbilityState
  skills: SkillState
  combatValues: CombatValuesState
  appState: AppState
  talents: TalentsState
}

export type EmptyActionType = { type: 'EMPTY_ACTION' }
export const EmptyAction: EmptyActionType = {
  type: 'EMPTY_ACTION',
}

export type RootActionTypes =
  | CombatValuesActionTypes
  | UpdateCharacterMetaDataActionTypes
  | AbilitiesActionTypes
  | UpdateSkillActionTypes
  | AppStateActionTypes
  | TalentsActionType
  | EmptyActionType

// export const RootReducer = (state?: RootState, action?: RootActionTypes) => (
//   {
//     characterMetaData: CharacterMetaDataReducer(state?.characterMetaData, action),
//     abilities: AbilitiesReducer(state?.abilities, action),
//     skills: SkillsReducer(state?.skills, action),
//     combatValues: CombatValuesReducer(state?.combatValues, action),
//   }
// )

export const RootReducer = combineReducers<RootState, RootActionTypes>({
  characterMetaData: CharacterMetaDataReducer,
  abilities: AbilitiesReducer,
  skills: SkillsReducer,
  combatValues: CombatValuesReducer,
  appState: AppStateReducer,
  talents: TalentsReducer,
})
