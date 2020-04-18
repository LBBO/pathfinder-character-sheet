import { Alignment } from './Alignment'

export type CharacterClass = string

// TODO: add other size categories
//  http://prd.5footstep.de/Grundregelwerk/Kampf/DieGrundregelndesKampfes/Ruestungsklasse
export enum SizeCategory {
  SMALL = -1,
  MEDIUM = 0,
  LARGE = 1,
}

export enum CharacterGender {
  MALE,
  FEMALE,
  OTHER,
}

export type CharacterRace = string

export type CharacterMetaData = {
  characterName: string
  className?: CharacterClass
  race?: CharacterRace
  alignment?: Alignment
  level?: number
  deity?: string
  sizeCategory: SizeCategory
  gender?: CharacterGender
  age?: number
  homeland?: string
  height?: number
  weight?: number
  hair?: string
  eyes?: string

  playerName?: string
  campaign?: string
}
