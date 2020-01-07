import { CharacterClass, CharacterGender, CharacterMetaData, SizeCategory } from './Character'
import { Alignment } from './Alignment'

export const UPDATE_CHARACTER_NAME = 'UPDATE_CHARACTER_NAME'
export const UPDATE_CHARACTER_CLASS = 'UPDATE_CHARACTER_CLASS'
export const UPDATE_CHARACTER_RACE = 'UPDATE_CHARACTER_RACE'
export const UPDATE_CHARACTER_ALIGNMENT = 'UPDATE_CHARACTER_ALIGNMENT'
export const UPDATE_CHARACTER_LEVEL = 'UPDATE_CHARACTER_LEVEL'
export const UPDATE_CHARACTER_DEITY = 'UPDATE_CHARACTER_DEITY'
export const UPDATE_CHARACTER_SIZE_CATEGORY = 'UPDATE_CHARACTER_SIZE_CATEGORY'
export const UPDATE_CHARACTER_GENDER = 'UPDATE_CHARACTER_GENDER'
export const UPDATE_CHARACTER_AGE = 'UPDATE_CHARACTER_AGE'
export const UPDATE_CHARACTER_HOMELAND = 'UPDATE_CHARACTER_HOMELAND'
export const UPDATE_CHARACTER_HEIGHT = 'UPDATE_CHARACTER_HEIGHT'
export const UPDATE_CHARACTER_WEIGHT = 'UPDATE_CHARACTER_WEIGHT'
export const UPDATE_CHARACTER_HAIR = 'UPDATE_CHARACTER_HAIR'
export const UPDATE_CHARACTER_EYES = 'UPDATE_CHARACTER_EYES'
export const UPDATE_PLAYER_NAME = 'UPDATE_PLAYER_NAME'
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'

type UpdateCharacterNameAction = {
  type: typeof UPDATE_CHARACTER_NAME
  payload: string
}

type UpdateCharacterClassAction = {
  type: typeof UPDATE_CHARACTER_CLASS
  payload: CharacterClass
}

type UpdateCharacterRaceAction = {
  type: typeof UPDATE_CHARACTER_RACE
  payload: string
}

type UpdateCharacterAlignmentAction = {
  type: typeof UPDATE_CHARACTER_ALIGNMENT
  payload: Alignment
}

type UpdateCharacterLevelAction = {
  type: typeof UPDATE_CHARACTER_LEVEL
  payload: number
}

type UpdateCharacterDeityTypeAction = {
  type: typeof UPDATE_CHARACTER_DEITY
  payload: string
}

type UpdateCharacterSizeCategoryAction = {
  type: typeof UPDATE_CHARACTER_SIZE_CATEGORY
  payload: SizeCategory
}

type UpdateCharacterGenderAction = {
  type: typeof UPDATE_CHARACTER_GENDER
  payload: CharacterGender
}

type UpdateCharacterAgeAction = {
  type: typeof UPDATE_CHARACTER_AGE
  payload: number
}

type UpdateCharacterHomelandAction = {
  type: typeof UPDATE_CHARACTER_HOMELAND
  payload: string
}

type UpdateCharacterHeightAction = {
  type: typeof UPDATE_CHARACTER_HEIGHT
  payload: number
}

type UpdateCharacterWeightAction = {
  type: typeof UPDATE_CHARACTER_WEIGHT
  payload: number
}

type UpdateCharacterHAIRAction = {
  type: typeof UPDATE_CHARACTER_HAIR
  payload: string
}

type UpdateCharacterEYESAction = {
  type: typeof UPDATE_CHARACTER_EYES
  payload: string
}

type UpdatePlayerNameAction = {
  type: typeof UPDATE_PLAYER_NAME
  payload: string
}

type UpdateCampaignAction = {
  type: typeof UPDATE_CAMPAIGN
  payload: string
}

export type UpdateCharacterMetaDataActionTypes =
  UpdateCharacterNameAction
  | UpdateCharacterClassAction
  | UpdateCharacterRaceAction
  | UpdateCharacterAlignmentAction
  | UpdateCharacterLevelAction
  | UpdateCharacterDeityTypeAction
  | UpdateCharacterSizeCategoryAction
  | UpdateCharacterGenderAction
  | UpdateCharacterAgeAction
  | UpdateCharacterHomelandAction
  | UpdateCharacterHeightAction
  | UpdateCharacterWeightAction
  | UpdateCharacterHAIRAction
  | UpdateCharacterEYESAction
  | UpdatePlayerNameAction
  | UpdateCampaignAction

export type CharacterMetaDataState = CharacterMetaData
