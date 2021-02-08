import { createAction } from '@reduxjs/toolkit'

const SET_SPECIAL_ABILITIES = 'SET_SPECIAL_ABILITIES' as const
export const setSpecialAbilities = createAction<
  string,
  typeof SET_SPECIAL_ABILITIES
>(SET_SPECIAL_ABILITIES)

export type SpecialAbilitiesActionType = ReturnType<typeof setSpecialAbilities>
