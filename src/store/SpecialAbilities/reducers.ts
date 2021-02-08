import { createReducer } from '@reduxjs/toolkit'
import { setSpecialAbilities } from './actions'

export type SpecialAbilitiesState = string

const initialState: SpecialAbilitiesState = ''
export const SpecialAbilitiesReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(setSpecialAbilities, (state, action) => action.payload)
  },
)
