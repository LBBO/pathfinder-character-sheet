import { createAction } from '@reduxjs/toolkit'

const SET_BASE_SPEED = 'SET_BASE_SPEED' as const
export const setBaseSpeed = createAction<
  number | undefined,
  typeof SET_BASE_SPEED
>(SET_BASE_SPEED)

const SET_SPEED_WITH_ARMOR = 'SET_SPEED_WITH_ARMOR' as const
export const setSpeedWithArmor = createAction<
  number | undefined,
  typeof SET_SPEED_WITH_ARMOR
>(SET_SPEED_WITH_ARMOR)

const SET_FLY_SPEED = 'SET_FLY_SPEED' as const
export const setFlySpeed = createAction<
  number | undefined,
  typeof SET_FLY_SPEED
>(SET_FLY_SPEED)

const SET_SWIM_SPEED = 'SET_SWIM_SPEED' as const
export const setSwimSpeed = createAction<
  number | undefined,
  typeof SET_SWIM_SPEED
>(SET_SWIM_SPEED)

const SET_CLIMB_SPEED = 'SET_CLIMB_SPEED' as const
export const setClimbSpeed = createAction<
  number | undefined,
  typeof SET_CLIMB_SPEED
>(SET_CLIMB_SPEED)

const SET_BURROW_SPEED = 'SET_BURROW_SPEED' as const
export const setBurrowSpeed = createAction<
  number | undefined,
  typeof SET_BURROW_SPEED
>(SET_BURROW_SPEED)

const SET_SPEED_TEMP_MODIFIERS = 'SET_SPEED_TEMP_MODIFIERS' as const
export const setSpeedTempModifiers = createAction<
  string | undefined,
  typeof SET_SPEED_TEMP_MODIFIERS
>(SET_SPEED_TEMP_MODIFIERS)

export type SpeedActionType = ReturnType<
  | typeof setBaseSpeed
  | typeof setSpeedWithArmor
  | typeof setFlySpeed
  | typeof setSwimSpeed
  | typeof setClimbSpeed
  | typeof setBurrowSpeed
  | typeof setSpeedTempModifiers
>
