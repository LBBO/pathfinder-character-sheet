import { createAction } from '@reduxjs/toolkit'

export const updateTalents = createAction<string, 'UPDATE_TALENTS'>(
  'UPDATE_TALENTS',
)

export type TalentsActionType = ReturnType<typeof updateTalents>
