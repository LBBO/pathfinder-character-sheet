import {combineReducers} from 'redux'
import {CharacterMetaDataReducer} from './CharacterMetaData/reducers'
import {AbilitiesReducer} from './Abilities/reducers'

export const rootReducer = combineReducers({
  characterMetaData: CharacterMetaDataReducer,
  abilities: AbilitiesReducer,
})

export type RootState = ReturnType<typeof rootReducer>
