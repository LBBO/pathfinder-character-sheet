import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { RootReducer } from './root-reducer'

export const store = createStore(
  RootReducer,
  devToolsEnhancer({}),
)
