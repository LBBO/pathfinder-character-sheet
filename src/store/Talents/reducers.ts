import { createReducer } from '@reduxjs/toolkit'
import { updateTalents } from './actions'

export type TalentsState = string

const initialState: TalentsState = ''
export const TalentsReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateTalents, (state, action) => action.payload)
})
