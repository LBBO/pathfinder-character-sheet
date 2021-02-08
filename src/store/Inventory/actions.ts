import { createAction } from '@reduxjs/toolkit'
import { Weapon } from './reducers'

export const addWeapon = createAction<Weapon, 'ADD_WEAPON'>('ADD_WEAPON')

export const editWeapon = createAction<
  { oldWeaponIndex: number; newWeapon: Weapon },
  'EDIT_WEAPON'
>('EDIT_WEAPON')

export const deleteWeapon = createAction<number, 'DELETE_WEAPON'>(
  'DELETE_WEAPON',
)

export type InventoryActionType = ReturnType<typeof addWeapon>
