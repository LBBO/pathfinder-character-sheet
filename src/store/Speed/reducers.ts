import { createReducer } from '@reduxjs/toolkit'
import { SpeedState } from './types'
import {
  setBaseSpeed,
  setBurrowSpeed,
  setClimbSpeed,
  setFlySpeed,
  setSpeedTempModifiers,
  setSpeedWithArmor,
  setSwimSpeed,
} from './actions'

const initialState: SpeedState = {}

export const SpeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBaseSpeed, (state, action) => {
      // Swim and climb speed are usually 1/4 of base speed. This logic sets both automatically
      // so long the user hasn't changed them to not fit this rule.
      const oldQuarterSpeed =
        state.baseSpeed === undefined ? undefined : state.baseSpeed / 4
      const shouldBeOverwritten = (oldSpeed?: number) =>
        oldSpeed === undefined || oldSpeed === oldQuarterSpeed

      return {
        ...state,
        baseSpeed: action.payload,
        swim:
          shouldBeOverwritten(state.swim) && action.payload !== undefined
            ? action.payload / 4
            : state.swim,
        climb:
          shouldBeOverwritten(state.climb) && action.payload !== undefined
            ? action.payload / 4
            : state.climb,
      }
    })
    .addCase(setSpeedWithArmor, (state, action) => ({
      ...state,
      withArmor: action.payload,
    }))
    .addCase(setFlySpeed, (state, action) => ({
      ...state,
      fly: action.payload,
    }))
    .addCase(setSwimSpeed, (state, action) => ({
      ...state,
      swim: action.payload,
    }))
    .addCase(setClimbSpeed, (state, action) => ({
      ...state,
      climb: action.payload,
    }))
    .addCase(setBurrowSpeed, (state, action) => ({
      ...state,
      burrow: action.payload,
    }))
    .addCase(setSpeedTempModifiers, (state, action) => ({
      ...state,
      tempModifiers: action.payload,
    }))
})
