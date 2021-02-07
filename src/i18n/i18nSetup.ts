import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { abilityName } from '../store/Abilities/types'
import { en } from './en'
import { de } from './de'
import { SkillName } from '../store/Skills/types'
import { Ethics, Morality } from '../store/CharacterMetaData/Alignment'
import {
  CharacterGender,
  SizeCategory,
} from '../store/CharacterMetaData/Character'

export type TranslationResource = Resource & {
  translation: {
    abilities: {
      [key in abilityName]: {
        short: string
        long: string
      }
    }
    abilitiesTable: {
      abilityName: string
      score: string
      modifier: string
      tempAdjustment: string
      tempModifier: string
    }
    skills: {
      [key in SkillName]: string
    }
    combatValues: {
      savingThrows: {
        fortitude: string
        reflex: string
        will: string
      }
    }
    alignments: {
      ethics: {
        [key in Ethics]: {
          long: string
          short: string
        }
      }
      morality: {
        [key in Morality]: {
          long: string
          short: string
        }
      }
      neutral: {
        long: string
        short: string
      }
    }
    genders: {
      [key in CharacterGender]: string
    }
    sizeCategories: {
      [key in SizeCategory]: string
    }
    characterMetaData: {
      characterName: string
      alignment: string
      player: string
      characterClass: string
      level: string
      race: string
      campaign: string
      homeland: string
      deity: string
      sizeCategory: string
      gender: string
      age: string
      height: string
      weight: string
      hair: string
      eyes: string
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
