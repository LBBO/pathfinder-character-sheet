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
import { useEffect, useState } from 'react'
import { getLanguage } from '../store/AppState/selectors'
import { useSelector } from 'react-redux'

export type TranslationResource = Resource & {
  translation: {
    general: {
      modifier: {
        short: string
        long: string
      }
      misc: {
        short: string
        long: string
      }
      ability: {
        short: string
        long: string
      }
      total: string
      bonus: string
      characterSheet: string
    }
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
    skillsTable: {
      title: string
      skillName: string
      ranks: string
      classSkill: string
      trainedOnly: string
    }
    combatValues: {
      savingThrows: {
        fortitude: string
        reflex: string
        will: string
      }
      initiative: {
        short: string
        long: string
      }
      armorClass: {
        short: string
        long: string
      }
      armorBonus: string
      shield: string
      sizeModifier: string
      naturalArmor: string
      deflectionModifier: string
      touch: string
      flatFooted: string
      baseAttackBonus: {
        short: string
        long: string
      }
      spellResistance: string
      combatManeuverBonus: {
        short: string
        long: string
      }
      combatManeuverDefense: {
        short: string
        long: string
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
    talents: {
      title: string
    }
    specialAbilities: {
      title: string
    }
    inventory: {
      weapons: {
        title: string
        attackBonus: string
        criticalHit: string
        multiplier: string
        minDieValue: string
        type: {
          title: string
          bludgeoning: {
            long: string
            short: string
          }
          piercing: {
            long: string
            short: string
          }
          slashing: {
            long: string
            short: string
          }
        }
        range: string
        ammunition: string
        damage: string
      }
      gear: {
        title: string
        item: string
        weight: string
        totalWeight: string
      }
      armor: {
        title: string
        bonus: string
        type: string
        checkPenalty: string
        spellFailure: string
        weight: string
        properties: string
      }
    }
  }
}

export const initializeI18n = () => {
  return i18n.use(initReactI18next).init({
    resources: {
      en,
      de,
    },
    lng: 'en',
    fallbackLng: 'en',
  })
}

export const useI18nSetup = () => {
  const [hasLoaded, setHasBeenInitialized] = useState(false)
  useEffect(() => {
    initializeI18n().then(() => setHasBeenInitialized(true))
  }, [])

  const language = useSelector(getLanguage)
  useEffect(() => {
    if (hasLoaded) {
      i18n.changeLanguage(language).catch(console.error)
    }
  }, [language, hasLoaded])

  return { hasLoaded }
}
