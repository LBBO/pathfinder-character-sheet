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
    .addCase(setBaseSpeed, (state, action) => ({
      ...state,
      baseSpeed: action.payload,
    }))
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
