import { en } from './en'
import { Ethics, Morality } from '../store/CharacterMetaData/Alignment'
import { TranslationResource } from './i18nSetup'
import {
  CharacterGender,
  SizeCategory,
} from '../store/CharacterMetaData/Character'

export const de: TranslationResource = {
  translation: {
    abilities: {
      charisma: {
        short: 'CH',
        long: 'Charisma',
      },
      constitution: {
        short: 'KO',
        long: 'Konstitution',
      },
      dexterity: {
        short: 'GE',
        long: 'Geschicklichkeit',
      },
      intelligence: {
        short: 'IN',
        long: 'Intelligenz',
      },
      strength: {
        short: 'ST',
        long: 'Stärke',
      },
      wisdom: {
        short: 'WE',
        long: 'Weisheit',
      },
    },
    abilitiesTable: {
      abilityName: 'Attribut',
      score: 'Attributs­wert',
      modifier: 'Attributs­mod.',
      tempAdjustment: 'Temp. Wert',
      tempModifier: 'Temp. Mod.',
    },
    skills: {
      acrobatics: 'Akrobatik',
      appraise: 'Schätzen',
      bluff: 'Bluffen',
      climb: 'Klettern',
      craft: 'Handwerk',
      diplomacy: 'Diplomatie',
      disableDevice: 'Mechanismus Ausschalten',
      disguise: 'Verkleiden',
      escapeArtist: 'Entfesslungskunst',
      fly: 'Fliegen',
      handleAnimal: 'Mit Tieren umgehen',
      heal: 'Heilkunde',
      intimidate: 'Einschüchtern',
      knowledgeArcana: 'Wissen (Arkanes)',
      knowledgeDungeoneering: 'Wissen (Gewölbekunde)',
      knowledgeEngineering: 'Wissen (Baukunst)',
      knowledgeGeography: 'Wissen (Geographie)',
      knowledgeHistory: 'Wissen (Geschichte)',
      knowledgeLocal: 'Wissen (Lokales)',
      knowledgeNature: 'Wissen (Natur)',
      knowledgeNobility: 'Wissen (Adel und Königshäuser)',
      knowledgePlanes: 'Wissen (Die Ebenen)',
      knowledgeReligion: 'Wissen (Religion)',
      linguistics: 'Sprachenkunde',
      perception: 'Wahrnehmung',
      perform: 'Auftreten',
      profession: 'Beruf',
      ride: 'Reiten',
      senseMotive: 'Motiv erkennen',
      sleightOfHand: 'Fingerfertigkeit',
      spellcraft: 'Zauberkunde',
      stealth: 'Heimlichkeit',
      survival: 'Überlebenskunst',
      swim: 'Schwimmen',
      useMagicDevice: 'Magischen Gegenstand benutzen',
    },
    combatValues: {
      savingThrows: {
        fortitude: 'Zähigkeit',
        reflex: 'Reflex',
        will: 'Wille',
      },
    },
    alignments: {
      ethics: {
        [Ethics.LAW]: {
          long: 'Rechtschaffend',
          short: 'R',
        },
        [Ethics.NEUTRAL]: {
          long: 'Neutral',
          short: 'N',
        },
        [Ethics.CHAOS]: {
          long: 'Chaotisch',
          short: 'C',
        },
      },
      morality: {
        [Morality.GOOD]: {
          long: 'Gut',
          short: 'G',
        },
        [Morality.NEUTRAL]: {
          long: 'Neutral',
          short: 'N',
        },
        [Morality.BAD]: {
          long: 'Böse',
          short: 'B',
        },
      },
      neutral: {
        long: 'Neutral',
        short: 'N',
      },
    },
    genders: {
      [CharacterGender.MALE]: 'Männlich',
      [CharacterGender.FEMALE]: 'Weiblich',
      [CharacterGender.OTHER]: 'Sonstige',
    },
    sizeCategories: {
      [SizeCategory.SMALL]: 'Klein',
      [SizeCategory.MEDIUM]: 'Normal',
      [SizeCategory.LARGE]: 'Groß',
    },
    characterMetaData: {
      characterName: 'Charaktername',
      alignment: 'Gesinnung',
      player: 'Spieler',
      characterClass: 'Klasse',
      level: 'Stufe',
      race: 'Volk',
      campaign: 'Kampagne',
      homeland: 'Heimat',
      deity: 'Gottheit',
      sizeCategory: 'Größenkategorie',
      gender: 'Geschlecht',
      age: 'Alter',
      height: 'Größe',
      weight: 'Gewicht',
      hair: 'Haarfarbe',
      eyes: 'Augenfarbe',
    },
  },
}
