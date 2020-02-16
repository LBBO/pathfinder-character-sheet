import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { rootReducer } from './root-reducer'

export const store = createStore(
  rootReducer,
  devToolsEnhancer({}),
)
