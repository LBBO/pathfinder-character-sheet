import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { abilityName } from '../store/Abilities/types'
import { en } from './en'
import { de } from './de'

export type TranslationResource = {
  translation: {
    abilities: {
      [key in abilityName]: {
        short: string
        long: string
      }
    }
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en,
    de,
  },
  lng: 'de',
  fallbackLng: 'en',
})

console.log('i18n setup done')
