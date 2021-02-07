import {
  UPDATE_CAMPAIGN,
  UPDATE_CHARACTER_AGE,
  UPDATE_CHARACTER_ALIGNMENT,
  UPDATE_CHARACTER_CLASS,
  UPDATE_CHARACTER_DEITY,
  UPDATE_CHARACTER_EYES,
  UPDATE_CHARACTER_GENDER,
  UPDATE_CHARACTER_HAIR,
  UPDATE_CHARACTER_HEIGHT,
  UPDATE_CHARACTER_HOMELAND,
  UPDATE_CHARACTER_LEVEL,
  UPDATE_CHARACTER_NAME,
  UPDATE_CHARACTER_RACE,
  UPDATE_CHARACTER_SIZE_CATEGORY,
  UPDATE_CHARACTER_WEIGHT,
  UPDATE_PLAYER_NAME,
  UpdateCharacterMetaDataActionTypes,
} from './types'
import { CharacterGender, CharacterRace, SizeCategory } from './Character'
import { Alignment } from './Alignment'

export const setCharacterName = (
  name: string,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_NAME,
  payload: name,
})

export const setCharacterClass = (
  className: string,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_CLASS,
  payload: className,
})

export const setCharacterRace = (
  race: CharacterRace | undefined,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_RACE,
  payload: race,
})

export const setCharacterAlignment = (
  alignment: Alignment | undefined,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_ALIGNMENT,
  payload: alignment,
})

export const setCharacterLevel = (
  level: number | undefined,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_LEVEL,
  payload: level,
})

export const setCharacterDeity = (
  deity: string,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_DEITY,
  payload: deity,
})

export const setCharacterSizeCategory = (
  sizeCategory: SizeCategory,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_SIZE_CATEGORY,
  payload: sizeCategory,
})

export const setCharacterGender = (
  gender: CharacterGender | undefined,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_GENDER,
  payload: gender,
})

export const setCharacterAge = (
  age: number | undefined,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_AGE,
  payload: age,
})

export const setCharacterHomeland = (
  homeland: string,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_HOMELAND,
  payload: homeland,
})

export const setCharacterHeight = (
  height: number | undefined,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_HEIGHT,
  payload: height,
})

export const setCharacterWeight = (
  weight: number | undefined,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_WEIGHT,
  payload: weight,
})

export const setCharacterHair = (
  hair: string,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_HAIR,
  payload: hair,
})

export const setCharacterEyes = (
  eyes: string,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CHARACTER_EYES,
  payload: eyes,
})

export const setPlayerName = (
  name: string,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_PLAYER_NAME,
  payload: name,
})

export const setCampaign = (
  name: string,
): UpdateCharacterMetaDataActionTypes => ({
  type: UPDATE_CAMPAIGN,
  payload: name,
})
