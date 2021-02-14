import { RootState } from '../root-reducer'

export const getWeapons = (state: RootState) => state.inventory.weapons

export const getGear = (state: RootState) => state.inventory.gear

export const getArmor = (state: RootState) => state.inventory.armor

export const getTotalArmorItemBonus = (state: RootState) =>
  state.inventory.armor.reduce(
    (sum, { armorBonus }) => sum + (armorBonus ?? 0),
    0,
  )

export const getTotalArmorCheckPenalty = (state: RootState) =>
  state.inventory.armor.reduce(
    (sum, { checkPenalty }) => sum + (checkPenalty ?? 0),
    0,
  )

export const getTotalArmorSpellFailure = (state: RootState) =>
  state.inventory.armor.reduce(
    (sum, { spellFailure }) => sum + (spellFailure ?? 0),
    0,
  )

export const getTotalArmorWeight = (state: RootState) =>
  state.inventory.armor.reduce((sum, { weight }) => sum + (weight ?? 0), 0)
