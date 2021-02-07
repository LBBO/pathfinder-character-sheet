export type AppState = {
  lang: 'en' | 'de'
}

export const SET_LANGUAGE = 'SET_LANGUAGE'

export type SetLanguageAction = {
  type: typeof SET_LANGUAGE
  language: AppState['lang']
}

export type AppStateActionTypes = SetLanguageAction
