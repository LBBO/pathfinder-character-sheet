import { AppState, SET_LANGUAGE, SetLanguageAction } from './types'

export const setLanguage = (
  newLanguage: AppState['lang'],
): SetLanguageAction => ({
  type: SET_LANGUAGE,
  language: newLanguage,
})
