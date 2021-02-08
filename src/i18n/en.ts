import { TranslationResource } from './i18nSetup'
import { Ethics, Morality } from '../store/CharacterMetaData/Alignment'
import {
  CharacterGender,
  SizeCategory,
} from '../store/CharacterMetaData/Character'

export const en: TranslationResource = {
  translation: {
    general: {
      modifier: {
        short: 'Mod',
        long: 'Modifier',
      },
      misc: {
        short: 'Misc',
        long: 'Miscellaneous',
      },
      ability: {
        short: 'Abil',
        long: 'Ability',
      },
      total: 'Total',
      bonus: 'Bonus',
    },
    abilities: {
      charisma: {
        short: 'CHA',
        long: 'charisma',
      },
      constitution: {
        short: 'CON',
        long: 'constitution',
      },
      dexterity: {
        short: 'DEX',
        long: 'dexterity',
      },
      intelligence: {
        short: 'INT',
        long: 'intelligence',
      },
      strength: {
        short: 'STR',
        long: 'strength',
      },
      wisdom: {
        short: 'WIS',
        long: 'wisdom',
      },
    },
    abilitiesTable: {
      abilityName: 'Ability name',
      score: 'Score',
      modifier: 'Mod.',
      tempAdjustment: 'Temp. Adjustment',
      tempModifier: 'Temp. Mod.',
    },
    skills: {
      acrobatics: 'acrobatics',
      appraise: 'appraise',
      bluff: 'bluff',
      climb: 'climb',
      craft: 'craft',
      diplomacy: 'diplomacy',
      disableDevice: 'disable Device',
      disguise: 'disguise',
      escapeArtist: 'escape artist',
      fly: 'fly',
      handleAnimal: 'handle animal',
      heal: 'heal',
      intimidate: 'intimidate',
      knowledgeArcana: 'knowledge arcana',
      knowledgeDungeoneering: 'knowledge dungeoneering',
      knowledgeEngineering: 'knowledge engineering',
      knowledgeGeography: 'knowledge geography',
      knowledgeHistory: 'knowledge history',
      knowledgeLocal: 'knowledge local',
      knowledgeNature: 'knowledge nature',
      knowledgeNobility: 'knowledge nobility',
      knowledgePlanes: 'knowledge planes',
      knowledgeReligion: 'knowledge religion',
      linguistics: 'linguistics',
      perception: 'perception',
      perform: 'perform',
      profession: 'profession',
      ride: 'ride',
      senseMotive: 'sense motive',
      sleightOfHand: 'sleight of hand',
      spellcraft: 'spellcraft',
      stealth: 'stealth',
      survival: 'survival',
      swim: 'swim',
      useMagicDevice: 'use magic device',
    },
    skillsTable: {
      title: 'Skills',
      ranks: 'Ranks',
      skillName: 'Skill names',
      classSkill: 'Class skill',
      trainedOnly: 'Trained only',
    },
    combatValues: {
      savingThrows: {
        fortitude: 'fortitude',
        reflex: 'reflex',
        will: 'will',
      },
      initiative: {
        short: 'INI',
        long: 'Initiative',
      },
      armorClass: {
        short: 'AC',
        long: 'Armor class',
      },
      armorBonus: 'Armor',
      shield: 'Shield',
      sizeModifier: 'Size',
      naturalArmor: 'Natural armor',
      deflectionModifier: 'Deflection',
      flatFooted: 'Flat-footed',
      touch: 'Touch',
      baseAttackBonus: {
        short: 'BAB',
        long: 'Base attack bonus',
      },
      spellResistance: 'Spell resistance',
      combatManeuverBonus: {
        short: 'CMB',
        long: 'Combat Maneuver Bonus',
      },
      combatManeuverDefense: {
        short: 'CMD',
        long: 'Combat Maneuver Defense',
      },
    },
    alignments: {
      ethics: {
        [Ethics.LAW]: {
          long: 'Lawful',
          short: 'L',
        },
        [Ethics.NEUTRAL]: {
          long: 'Neutral',
          short: 'N',
        },
        [Ethics.CHAOS]: {
          long: 'Chaos',
          short: 'C',
        },
      },
      morality: {
        [Morality.GOOD]: {
          long: 'Good',
          short: 'G',
        },
        [Morality.NEUTRAL]: {
          long: 'Neutral',
          short: 'N',
        },
        [Morality.BAD]: {
          long: 'Bad',
          short: 'B',
        },
      },
      neutral: {
        long: 'Neutral',
        short: 'N',
      },
    },
    genders: {
      [CharacterGender.MALE]: 'Male',
      [CharacterGender.FEMALE]: 'Female',
      [CharacterGender.OTHER]: 'Other',
    },
    sizeCategories: {
      [SizeCategory.SMALL]: 'Small',
      [SizeCategory.MEDIUM]: 'Normal',
      [SizeCategory.LARGE]: 'Large',
    },
    characterMetaData: {
      characterName: 'character name',
      alignment: 'alignment',
      player: 'player',
      characterClass: 'character class',
      level: 'level',
      race: 'race',
      campaign: 'campaign',
      homeland: 'homeland',
      deity: 'deity',
      sizeCategory: 'size category',
      gender: 'gender',
      age: 'age',
      height: 'height',
      weight: 'weight',
      hair: 'hair',
      eyes: 'eyes',
    },
    talents: {
      title: 'Talents',
    },
    specialAbilities: {
      title: 'Besondere Fähigkeiten',
    },
  },
}
