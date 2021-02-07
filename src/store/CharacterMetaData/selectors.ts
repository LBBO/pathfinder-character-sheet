import { CharacterMetaDataState } from './types'
import { SizeCategory } from './Character'
import { RootState } from '../root-reducer'
import { createSelector } from 'reselect'

export const getCharacterMetadata = (state: RootState) =>
  state.characterMetaData

export const getSizeModifier = createSelector(
  [getCharacterMetadata],
  (characterMetadataState: CharacterMetaDataState) => {
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
  },
)
