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
import {
  SpecialAbilitiesReducer,
  SpecialAbilitiesState,
} from './SpecialAbilities/reducers'
import { SpecialAbilitiesActionType } from './SpecialAbilities/actions'
import { InventoryReducer, InventoryState } from './Inventory/reducers'
import { InventoryActionType } from './Inventory/actions'
import { SpeedState } from './Speed/types'
import { SpeedReducer } from './Speed/reducers'
import { SpeedActionType } from './Speed/actions'

export type RootState = {
  characterMetaData: CharacterMetaDataState
  abilities: AbilityState
  skills: SkillState
  combatValues: CombatValuesState
  appState: AppState
  talents: TalentsState
  specialAbilities: SpecialAbilitiesState
  inventory: InventoryState
  speed: SpeedState
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
  | SpecialAbilitiesActionType
  | InventoryActionType
  | SpeedActionType
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
  specialAbilities: SpecialAbilitiesReducer,
  inventory: InventoryReducer,
  speed: SpeedReducer,
})
