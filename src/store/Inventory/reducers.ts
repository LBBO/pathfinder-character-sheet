import { createReducer } from '@reduxjs/toolkit'
import { addWeapon, deleteWeapon, editWeapon } from './actions'

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
  attackBonus?: number
  criticalAttackProperties: {
    multiplier: number
    minDieValue: number
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
  attackBonus: undefined,
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
})
