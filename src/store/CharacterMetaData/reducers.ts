import { CharacterMetaDataState } from './types'
import { SizeCategory } from './Character'
import { RootActionTypes } from '../root-reducer'

const initialState: CharacterMetaDataState = {
  level: 0,
  characterName: '',
  sizeCategory: SizeCategory.MEDIUM,
}

export const getSizeModifier = (characterMetadataState: CharacterMetaDataState) => {
  switch (characterMetadataState.sizeCategory) {
    case SizeCategory.LARGE:
      return -1
    case SizeCategory.MEDIUM:
      return 0
    case SizeCategory.SMALL:
      return 1
    default:
      return NaN
  }
}

export const CharacterMetaDataReducer = (
  state = initialState, action?: RootActionTypes): CharacterMetaDataState => {
  switch (action?.type) {
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
