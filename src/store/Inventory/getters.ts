import { RootState } from '../root-reducer'

export const getWeapons = (state: RootState) => state.inventory.weapons
