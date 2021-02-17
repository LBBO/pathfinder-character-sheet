import { RootState } from '../root-reducer'
import { SpeedState } from './types'
import { createSelector } from '@reduxjs/toolkit'
import { getLanguage } from '../AppState/selectors'

export const getSpeed = (state: RootState): SpeedState => state.speed

export const realLifeUnitToSquares = (
  distance?: number,
  isInFeet = false,
  includeStartedSquare = false,
) => {
  if (distance !== undefined) {
    const unitsPerSquare = isInFeet ? 5 : 1.5
    const convertedToSquares = distance / unitsPerSquare
    return includeStartedSquare
      ? Math.ceil(convertedToSquares)
      : Math.floor(convertedToSquares)
  }
}

export const getSpeedInSquares = createSelector(
  getSpeed,
  getLanguage,
  (completeSpeedState, language) => {
    const { tempModifiers, maneuverability, ...speedState } = completeSpeedState
    const keys = Object.keys(speedState) as Array<keyof typeof speedState>

    return keys.reduce(
      (result, currSpeedName) => ({
        ...result,
        [currSpeedName]: realLifeUnitToSquares(
          speedState[currSpeedName],
          language === 'en',
          false,
        ),
      }),
      {} as typeof speedState,
    )
  },
)
