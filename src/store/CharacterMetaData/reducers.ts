import { CharacterMetaDataState, UpdateCharacterMetaDataActionTypes } from './types'

const initialState: CharacterMetaDataState = {
  level: 0,
}

export const CharacterMetaDataReducer = (
  state = initialState, action: UpdateCharacterMetaDataActionTypes): CharacterMetaDataState => {
  switch (action.type) {
    case 'UPDATE_CHARACTER_NAME':
      return {
        ...state,
        characterName: action.payload,
      }
    case 'UPDATE_CAMPAIGN':
      return {
        ...state,
        campaign: action.payload,
      }
    case 'UPDATE_CHARACTER_AGE':
      return {
        ...state,
        age: action.payload,
      }
    case 'UPDATE_CHARACTER_ALIGNMENT':
      return {
        ...state,
        alignment: action.payload,
      }
    case 'UPDATE_CHARACTER_CLASS':
      return {
        ...state,
        className: action.payload,
      }
    case 'UPDATE_CHARACTER_DEITY':
      return {
        ...state,
        deity: action.payload,
      }
    case 'UPDATE_CHARACTER_EYES':
      return {
        ...state,
        eyes: action.payload,
      }
    case 'UPDATE_CHARACTER_GENDER':
      return {
        ...state,
        gender: action.payload,
      }
    case 'UPDATE_CHARACTER_HAIR':
      return {
        ...state,
        hair: action.payload,
      }
    case 'UPDATE_CHARACTER_HEIGHT':
      return {
        ...state,
        height: action.payload,
      }
    case 'UPDATE_CHARACTER_HOMELAND':
      return {
        ...state,
        homeland: action.payload,
      }
    case 'UPDATE_CHARACTER_LEVEL':
      return {
        ...state,
        level: action.payload,
      }
    case 'UPDATE_CHARACTER_RACE':
      return {
        ...state,
        race: action.payload,
      }
    case 'UPDATE_CHARACTER_SIZE_CATEGORY':
      return {
        ...state,
        sizeCategory: action.payload,
      }
    case 'UPDATE_CHARACTER_WEIGHT':
      return {
        ...state,
        weight: action.payload,
      }
    case 'UPDATE_PLAYER_NAME':
      return {
        ...state,
        playerName: action.payload,
      }
    default:
      return state
  }
}
