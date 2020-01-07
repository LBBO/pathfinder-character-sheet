import { combineReducers } from 'redux'
import { CharacterMetaDataReducer } from './CharacterMetaData/reducers'

export const rootReducer = combineReducers({ characterMetaData: CharacterMetaDataReducer })

export type RootState = ReturnType<typeof rootReducer>
