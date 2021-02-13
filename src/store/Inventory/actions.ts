import { createAction } from '@reduxjs/toolkit'
import { GearItem, Weapon } from './reducers'

export const addWeapon = createAction<Weapon, 'ADD_WEAPON'>('ADD_WEAPON')

export const editWeapon = createAction<
  { oldWeaponIndex: number; newWeapon: Weapon },
  'EDIT_WEAPON'
>('EDIT_WEAPON')

export const deleteWeapon = createAction<number, 'DELETE_WEAPON'>(
  'DELETE_WEAPON',
)

export const addGearItem = createAction<GearItem, 'ADD_GEAR_ITEM'>(
  'ADD_GEAR_ITEM',
)

export const editGearItem = createAction<
  { oldGearItemIndex: number; newGearItem: GearItem },
  'EDIT_GEAR_ITEM'
>('EDIT_GEAR_ITEM')

export const deleteGearItem = createAction<number, 'DELETE_GEAR_ITEM'>(
  'DELETE_GEAR_ITEM',
)

export type InventoryActionType = ReturnType<
  | typeof addWeapon
  | typeof editWeapon
  | typeof deleteWeapon
  | typeof addGearItem
  | typeof editGearItem
  | typeof deleteGearItem
>
