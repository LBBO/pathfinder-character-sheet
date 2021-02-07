import { AppState, SET_LANGUAGE } from './types'
import { RootActionTypes } from '../root-reducer'

const initialState: AppState = {
  lang: 'en',
}

export const AppStateReducer = (
  state: AppState = initialState,
  action?: RootActionTypes,
) => {
  switch (action?.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        lang: action.language,
      }
    default:
      return state
  }
}
