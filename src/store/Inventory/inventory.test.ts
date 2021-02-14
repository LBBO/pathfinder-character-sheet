import {
  Armor,
  generateEmptyWeapon,
  InventoryReducer,
  InventoryState,
  Weapon,
} from './reducers'
import { EmptyAction, RootReducer } from '../root-reducer'
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
import {
  getTotalArmorCheckPenalty,
  getTotalArmorItemBonus,
  getTotalArmorSpellFailure,
  getTotalArmorWeight,
} from './getters'

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

describe('armor items', () => {
  const firstItem: Armor = {
    name: 'first item',
    type: 'first type',
    properties: 'first properties',
  }
  const secondItem: Armor = {
    name: 'second item',
    type: 'second type',
    properties: 'second properties',
  }
  const newArmorItem: Armor = {
    name: '',
    type: '',
    properties: '',
  }

  it('should be an empty array by default', () => {
    expect(InventoryReducer(undefined, EmptyAction).armor).toHaveLength(0)
  })

  it('should be able to add an armor item', () => {
    const state = InventoryReducer(initialState, addArmorItem(firstItem))

    expect(state.armor).toHaveLength(1)
    expect(state.armor[0]).toMatchObject(firstItem)
  })

  it('should be able to edit an armor item', () => {
    const oldState = InventoryReducer(initialState, addArmorItem(firstItem))
    const newState = InventoryReducer(
      oldState,
      editArmorItem({
        oldArmorItemIndex: 0,
        newArmorItem: secondItem,
      }),
    )

    expect(newState.armor).toHaveLength(1)
    expect(newState.armor[0]).toMatchObject(secondItem)
  })

  it('should be able to edit an armor item', () => {
    const oldState = InventoryReducer(initialState, addArmorItem(firstItem))
    const newState = InventoryReducer(oldState, deleteArmorItem(0))

    expect(newState.armor).toHaveLength(0)
  })

  it('should be able to insert an armor item at first position', () => {
    const state = InventoryReducer(
      { ...initialState, armor: [firstItem, secondItem] },
      insertArmorItemAtIndex(0),
    )

    expect(state.armor).toHaveLength(3)
    expect(state.armor).toMatchObject([newArmorItem, firstItem, secondItem])
  })

  it('should be able to insert an armor item between two other items', () => {
    const state = InventoryReducer(
      { ...initialState, armor: [firstItem, secondItem] },
      insertArmorItemAtIndex(1),
    )

    expect(state.armor).toHaveLength(3)
    expect(state.armor).toMatchObject([firstItem, newArmorItem, secondItem])
  })

  it('should be able to insert an armor item at the end of the list', () => {
    const state = InventoryReducer(
      { ...initialState, armor: [firstItem, secondItem] },
      insertArmorItemAtIndex(2),
    )

    expect(state.armor).toHaveLength(3)
    expect(state.armor).toMatchObject([firstItem, secondItem, newArmorItem])
  })

  it('should correctly compute the total armor bonus', () => {
    let state = RootReducer(
      undefined,
      addArmorItem({ ...newArmorItem, armorBonus: 5 }),
    )
    state = RootReducer(
      state,
      addArmorItem({ ...newArmorItem, armorBonus: undefined }),
    )
    state = RootReducer(
      state,
      addArmorItem({ ...newArmorItem, armorBonus: -3 }),
    )

    expect(getTotalArmorItemBonus(state)).toBe(2)
  })

  it('should correctly compute the total check penalty', () => {
    let state = RootReducer(
      undefined,
      addArmorItem({ ...newArmorItem, checkPenalty: 5 }),
    )
    state = RootReducer(
      state,
      addArmorItem({ ...newArmorItem, checkPenalty: undefined }),
    )
    state = RootReducer(
      state,
      addArmorItem({ ...newArmorItem, checkPenalty: -3 }),
    )

    expect(getTotalArmorCheckPenalty(state)).toBe(2)
  })

  it('should correctly compute the total spell failure', () => {
    let state = RootReducer(
      undefined,
      addArmorItem({ ...newArmorItem, spellFailure: 5 }),
    )
    state = RootReducer(
      state,
      addArmorItem({ ...newArmorItem, spellFailure: undefined }),
    )
    state = RootReducer(
      state,
      addArmorItem({ ...newArmorItem, spellFailure: -3 }),
    )

    expect(getTotalArmorSpellFailure(state)).toBe(2)
  })

  it('should correctly compute the total armor weight', () => {
    let state = RootReducer(
      undefined,
      addArmorItem({ ...newArmorItem, weight: 5 }),
    )
    state = RootReducer(
      state,
      addArmorItem({ ...newArmorItem, weight: undefined }),
    )
    state = RootReducer(state, addArmorItem({ ...newArmorItem, weight: -3 }))

    expect(getTotalArmorWeight(state)).toBe(2)
  })
})
