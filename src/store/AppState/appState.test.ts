import { AppStateReducer } from './reducers'
import { setLanguage } from './actions'

describe('App state', () => {
  describe('Language changes', () => {
    it('should set the default language to English', () => {
      const initialState = AppStateReducer()

      expect(initialState.lang).toBe('en')
    })

    it('should change the language when the appropriate action was dispatched', () => {
      const initialState = AppStateReducer()

      expect(AppStateReducer(initialState, setLanguage('de'))).toMatchObject({
        ...initialState,
        lang: 'de',
      })
    })
  })
})
