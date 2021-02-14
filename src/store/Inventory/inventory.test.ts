import {
  generateEmptyWeapon,
  InventoryReducer,
  InventoryState,
  Weapon,
} from './reducers'
import { EmptyAction } from '../root-reducer'
import {
  addGearItem,
  addWeapon,
  deleteGearItem,
  deleteWeapon,
  editGearItem,
  editWeapon,
  insertGearItemAtIndex,
} from './actions'

const generateEmptyState = (): InventoryState => ({
  armor: [],
  gear: [],
  weapons: [],
})

const initialState = InventoryReducer(undefined, EmptyAction)

describe('weapons', () => {
  it('should have one empty weapon by default', () => {
    const initialState = InventoryReducer(undefined, EmptyAction)
    expect(initialState.weapons.length).toBe(1)
  })

  it('should correctly add new weapons', () => {
    const state = InventoryReducer(
      {
        ...initialState,
        weapons: [],
      },
      addWeapon(generateEmptyWeapon()),
    )

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

describe('gear items', () => {
  it('should correctly have no items by default', () => {
    const initialState = InventoryReducer(undefined, EmptyAction)
    expect(initialState.gear.length).toBe(0)
  })

  it('should be able to add a gear item', () => {
    const addedItem = {
      name: 'added item',
    }

    const state = InventoryReducer(initialState, addGearItem(addedItem))

    expect(state.gear).toHaveLength(1)
    expect(state.gear[0]).toMatchObject(addedItem)
  })

  it('should be able to insert an empty item at index 0', () => {
    const initialGear = [{ name: 'first item' }, { name: 'second item' }]
    const state = InventoryReducer(
      { ...initialState, gear: initialGear },
      insertGearItemAtIndex(0),
    )

    expect(state.gear).toHaveLength(3)
    expect(state.gear).toMatchObject([{ name: '' }, ...initialGear])
  })

  it('should be able to insert an empty item after another item', () => {
    const initialGear = [{ name: 'first item' }, { name: 'second item' }]
    const state = InventoryReducer(
      { ...initialState, gear: initialGear },
      insertGearItemAtIndex(1),
    )

    expect(state.gear).toHaveLength(3)
    expect(state.gear).toMatchObject([
      initialGear[0],
      { name: '' },
      initialGear[1],
    ])
  })

  it('should be able to insert an empty item after all other items', () => {
    const initialGear = [{ name: 'first item' }, { name: 'second item' }]
    const state = InventoryReducer(
      { ...initialState, gear: initialGear },
      insertGearItemAtIndex(2),
    )

    expect(state.gear).toHaveLength(3)
    expect(state.gear).toMatchObject([...initialGear, { name: '' }])
  })

  it('should be able to edit a gear item', () => {
    const oldItem = {
      name: 'added item',
    }
    const newItem = {
      name: 'edited item',
      weight: 10,
    }

    const oldState = InventoryReducer(initialState, addGearItem(oldItem))
    const newState = InventoryReducer(
      oldState,
      editGearItem({
        oldGearItemIndex: 0,
        newGearItem: newItem,
      }),
    )

    expect(newState.gear).toHaveLength(1)
    expect(newState.gear[0]).toMatchObject(newItem)
  })

  it('should be able to delete a gear item', () => {
    const firstItem = {
      name: 'first item',
    }
    const lastItem = {
      name: 'last item',
    }
    const deletedItem = {
      name: 'deleted item',
    }

    const state = InventoryReducer(
      { ...initialState, gear: [firstItem, deletedItem, lastItem] },
      deleteGearItem(1),
    )

    expect(state.gear).toHaveLength(2)
    expect(state.gear).toMatchObject([firstItem, lastItem])
  })
})
