import { createAction } from '@reduxjs/toolkit'
import { Armor, GearItem, Weapon } from './reducers'

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

export const insertGearItemAtIndex = createAction<number, 'INSERT_GEAR_ITEM'>(
  'INSERT_GEAR_ITEM',
)

export const gearActions = {
  addGearItem,
  insertGearItemAtIndex,
  editGearItem,
  deleteGearItem,
}

export const addArmorItem = createAction<Armor, 'ADD_ARMOR_ITEM'>(
  'ADD_ARMOR_ITEM',
)

export const editArmorItem = createAction<
  { oldArmorItemIndex: number; newArmorItem: Armor },
  'EDIT_ARMOR_ITEM'
>('EDIT_ARMOR_ITEM')

export const deleteArmorItem = createAction<number, 'DELETE_ARMOR_ITEM'>(
  'DELETE_ARMOR_ITEM',
)

export const insertArmorItemAtIndex = createAction<number, 'INSERT_ARMOR_ITEM'>(
  'INSERT_ARMOR_ITEM',
)

export const armorActions = {
  addArmorItem,
  editArmorItem,
  deleteArmorItem,
  insertArmorItemAtIndex,
}

export type InventoryActionType = ReturnType<
  | typeof addWeapon
  | typeof editWeapon
  | typeof deleteWeapon
  | typeof addGearItem
  | typeof insertGearItemAtIndex
  | typeof editGearItem
  | typeof deleteGearItem
  | typeof addArmorItem
  | typeof insertArmorItemAtIndex
  | typeof editArmorItem
  | typeof deleteArmorItem
>
