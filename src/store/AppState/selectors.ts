import { RootState } from '../root-reducer'

export const getLanguage = (state: RootState) => state.appState.lang
