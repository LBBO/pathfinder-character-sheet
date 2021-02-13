import { RootState } from '../root-reducer'

export const getWeapons = (state: RootState) => state.inventory.weapons

export const getGear = (state: RootState) => state.inventory.gear
