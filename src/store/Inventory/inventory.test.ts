import { InventoryReducer, InventoryState, Weapon } from './reducers'
import { EmptyAction } from '../root-reducer'
import { addWeapon, deleteWeapon, editWeapon } from './actions'

const generateEmptyWeapon = () => ({
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
    hieb: true,
    stich: false,
    wucht: false,
  },
})

const generateEmptyState = (): InventoryState => ({
  armor: [],
  gear: [],
  weapons: [],
})

describe('weapons', () => {
  it('should correctly add new weapons', () => {
    const initialState = InventoryReducer(undefined, EmptyAction)
    expect(initialState.weapons.length).toBe(0)
  })

  it('should correctly add new weapons', () => {
    const state = InventoryReducer(undefined, addWeapon(generateEmptyWeapon()))

    expect(state.weapons.length).toBe(1)
    expect(state.weapons[0]).toMatchObject(generateEmptyWeapon())
  })

  it('should add weapons to the end of the list', () => {
    const emptyState = generateEmptyState()
    const newWeapon: Weapon = {
      ...generateEmptyWeapon(),
      name: 'new weapon',
    }
    const state = InventoryReducer(
      {
        ...emptyState,
        weapons: [generateEmptyWeapon()],
      },
      addWeapon(newWeapon),
    )

    expect(state.weapons).toHaveLength(2)
    expect(state.weapons[1]).toMatchObject(newWeapon)
  })

  it('should edit (replace) the correct weapon', () => {
    const emptyState = generateEmptyState()
    const oldWeapon: Weapon = {
      ...generateEmptyWeapon(),
      name: 'old weapon',
    }
    const newWeapon = {
      ...oldWeapon,
      name: 'new weapon!',
    }
    const state = InventoryReducer(
      {
        ...emptyState,
        weapons: [generateEmptyWeapon(), oldWeapon, generateEmptyWeapon()],
      },
      editWeapon({
        oldWeaponIndex: 1,
        newWeapon,
      }),
    )

    expect(state.weapons).toHaveLength(3)
    expect(state.weapons).not.toContain(oldWeapon)
    expect(state.weapons).toContain(newWeapon)
  })

  it('should delete the correct weapon', () => {
    const emptyState = generateEmptyState()
    const deletedWeapon: Weapon = generateEmptyWeapon()
    const state = InventoryReducer(
      {
        ...emptyState,
        weapons: [generateEmptyWeapon(), deletedWeapon, generateEmptyWeapon()],
      },
      deleteWeapon(1),
    )

    expect(state.weapons).toHaveLength(2)
    expect(state.weapons).not.toContain(deletedWeapon)
  })
})
