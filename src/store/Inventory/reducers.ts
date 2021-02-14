import { createReducer } from '@reduxjs/toolkit'
import {
  addArmorItem,
  addGearItem,
  addWeapon,
  deleteArmorItem,
  deleteGearItem,
  deleteWeapon,
  editArmorItem,
  editGearItem,
  editWeapon,
  insertArmorItemAtIndex,
  insertGearItemAtIndex,
} from './actions'

export type GearItem = {
  name: string
  weight?: number
}

export type Armor = {
  name: string
  armorBonus?: number
  type: string
  checkPenalty?: number
  spellFailure?: number
  weight?: number
  properties: string
}

export type Weapon = {
  name: string
  attackBonus: string
  criticalAttackProperties: {
    multiplier?: number
    minDieValue?: number
  }
  type: {
    slashing: boolean
    piercing: boolean
    bludgeoning: boolean
  }
  range?: number
  ammunition: string
  damage: string
}

export type InventoryState = {
  gear: Array<GearItem>
  armor: Array<Armor>
  weapons: Array<Weapon>
}

export const generateEmptyWeapon = (): Weapon => ({
  ammunition: '',
  attackBonus: '',
  criticalAttackProperties: {
    multiplier: 2,
    minDieValue: 20,
  },
  damage: '',
  name: '',
  range: undefined,
  type: {
    bludgeoning: false,
    piercing: false,
    slashing: false,
  },
})

const initialState: InventoryState = {
  armor: [],
  gear: [],
  weapons: [generateEmptyWeapon()],
}

export const InventoryReducer = createReducer(initialState, (builder) => {
  builder

    // Weapon actions
    .addCase(addWeapon, (state, action) => ({
      ...state,
      weapons: [...state.weapons, action.payload],
    }))
    .addCase(editWeapon, (state, action) => ({
      ...state,
      weapons: state.weapons.map((weapon, index) =>
        index === action.payload.oldWeaponIndex
          ? action.payload.newWeapon
          : weapon,
      ),
    }))
    .addCase(deleteWeapon, (state, action) => ({
      ...state,
      weapons: state.weapons.filter(
        (weapon, index) => index !== action.payload,
      ),
    }))

    // Gear actions
    .addCase(addGearItem, (state, action) => ({
      ...state,
      gear: [...state.gear, action.payload],
    }))
    .addCase(editGearItem, (state, action) => ({
      ...state,
      gear: state.gear.map((gearItem, index) =>
        index === action.payload.oldGearItemIndex
          ? action.payload.newGearItem
          : gearItem,
      ),
    }))
    .addCase(deleteGearItem, (state, action) => ({
      ...state,
      gear: state.gear.filter((_, index) => index !== action.payload),
    }))
    .addCase(insertGearItemAtIndex, (state, action) => {
      let newGear: Array<GearItem>
      const newGearItem = { name: '' }

      if (action.payload >= state.gear.length) {
        newGear = [...state.gear, newGearItem]
      } else if (action.payload < 0) {
        newGear = [newGearItem, ...state.gear]
      } else {
        newGear = state.gear.reduce((arr, currGearItem, index) => {
          if (index === action.payload) {
            return [...arr, newGearItem, currGearItem]
          } else {
            return [...arr, currGearItem]
          }
        }, [] as Array<GearItem>)
      }

      return {
        ...state,
        gear: newGear,
      }
    })

    // Armor actions
    .addCase(addArmorItem, (state, action) => ({
      ...state,
      armor: [...state.armor, action.payload],
    }))
    .addCase(editArmorItem, (state, action) => ({
      ...state,
      armor: state.armor.map((armorItem, index) =>
        index === action.payload.oldArmorItemIndex
          ? action.payload.newArmorItem
          : armorItem,
      ),
    }))
    .addCase(deleteArmorItem, (state, action) => ({
      ...state,
      armor: state.armor.filter((armorItem, index) => index !== action.payload),
    }))
    .addCase(insertArmorItemAtIndex, (state, action) => {
      let newArmorItems: Array<Armor>
      const newArmorItem: Armor = { name: '', type: '', properties: '' }

      if (action.payload >= state.armor.length) {
        newArmorItems = [...state.armor, newArmorItem]
      } else if (action.payload < 0) {
        newArmorItems = [newArmorItem, ...state.armor]
      } else {
        newArmorItems = state.armor.reduce((arr, currArmorItem, index) => {
          if (index === action.payload) {
            return [...arr, newArmorItem, currArmorItem]
          } else {
            return [...arr, currArmorItem]
          }
        }, [] as Array<Armor>)
      }

      return {
        ...state,
        armor: newArmorItems,
      }
    })
})
