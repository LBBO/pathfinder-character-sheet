import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { RootReducer } from './root-reducer'
import localForage from 'localforage'
import { persistReducer } from 'redux-persist'

const persistenceConfig = {
  key: 'pathfinder-character-sheet',
  storage: localForage,
}

const persistedReducer = persistReducer(persistenceConfig, RootReducer)

export const store = createStore(persistedReducer, devToolsEnhancer({}))
