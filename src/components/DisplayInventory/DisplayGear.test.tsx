import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import {
  RootActionTypes,
  RootReducer,
  RootState,
} from '../../store/root-reducer'
import { createStore, Store } from 'redux'
import { Provider } from 'react-redux'
import { getGear } from '../../store/Inventory/getters'
import {
  DisplayGear,
  gearNameInputTestID,
  gearWeightInputTestID,
} from './DisplayGear'
import { act } from 'react-dom/test-utils'
import { GearItem } from '../../store/Inventory/reducers'
import { addGearItem } from '../../store/Inventory/actions'
import userEvent, { specialChars } from '@testing-library/user-event'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage(): Promise<Function> {
        return new Promise(() => {})
      },
    },
  }),
}))

afterAll(() => {
  jest.resetModules()
})

describe('DisplayGear', () => {
  let component = render(<></>)
  let store: Store<RootState, RootActionTypes>

  beforeEach(() => {
    store = createStore(RootReducer)
    component = render(
      <Provider store={store}>
        <DisplayGear />
      </Provider>,
    )
  })

  it('should have one row of inputs when there are no gear in the store', () => {
    expect(getGear(store.getState())).toHaveLength(0)
    expect(component.getAllByTestId(gearNameInputTestID)).toHaveLength(1)
    expect(component.getAllByTestId(gearWeightInputTestID)).toHaveLength(1)

    expect(component.getByTestId(gearNameInputTestID)).not.toHaveValue()
    expect(component.getByTestId(gearWeightInputTestID)).not.toHaveValue()
  })

  it('should add a gear item to the store as soon as a name is entered', () => {
    const nameInput = component.getByTestId(
      gearNameInputTestID,
    ) as HTMLInputElement
    const newGearItem: GearItem = { name: 'new item name' }

    act(() => {
      fireEvent.change(nameInput, { target: { value: newGearItem.name } })
    })

    expect(getGear(store.getState())).toHaveLength(1)
    expect(getGear(store.getState())[0]).toMatchObject(newGearItem)
  })

  it('should add a gear item to the store as soon as a weight is entered', () => {
    const weightInput = component.getByTestId(
      gearWeightInputTestID,
    ) as HTMLInputElement
    const newGearItem: GearItem = { name: '', weight: 10 }

    act(() => {
      fireEvent.change(weightInput, { target: { value: newGearItem.weight } })
    })

    expect(getGear(store.getState())).toHaveLength(1)
    expect(getGear(store.getState())[0]).toMatchObject(newGearItem)
  })

  it(`should display each item's name and weight in an input`, () => {
    const firstItem = { name: 'first item', weight: 0 }
    const secondItem = { name: 'second item', weight: 1 }
    store.dispatch(addGearItem(firstItem))
    store.dispatch(addGearItem(secondItem))
    expect(getGear(store.getState())).toHaveLength(2)

    // Additional empty inputs for new gear item
    expect(component.getAllByTestId(gearNameInputTestID)).toHaveLength(3)
    expect(component.getAllByTestId(gearWeightInputTestID)).toHaveLength(3)

    expect(component.getAllByTestId(gearNameInputTestID)[0]).toHaveValue(
      firstItem.name,
    )
    expect(component.getAllByTestId(gearWeightInputTestID)[0]).toHaveValue(
      firstItem.weight,
    )

    expect(component.getAllByTestId(gearNameInputTestID)[1]).toHaveValue(
      secondItem.name,
    )
    expect(component.getAllByTestId(gearWeightInputTestID)[1]).toHaveValue(
      secondItem.weight,
    )
  })

  it('should still have an additional empty inputs when there are other gear items as well', () => {
    const firstItem = { name: 'first item', weight: 0 }
    const secondItem = { name: 'second item', weight: 1 }
    store.dispatch(addGearItem(firstItem))
    store.dispatch(addGearItem(secondItem))

    expect(
      component.getAllByTestId(gearNameInputTestID).pop(),
    ).not.toHaveValue()
    expect(
      component.getAllByTestId(gearWeightInputTestID).pop(),
    ).not.toHaveValue()
  })

  it('should remove the last item if it is empty, as there is always an empty row at the very end of the list', () => {
    const firstItem = { name: 'first item', weight: 0 }
    const secondItem = { name: 'second item', weight: 1 }
    store.dispatch(addGearItem(firstItem))
    store.dispatch(addGearItem(secondItem))
    const secondNameInput = component.getAllByTestId(gearNameInputTestID)[1]
    const secondWeightInput = component.getAllByTestId(gearWeightInputTestID)[1]

    act(() => {
      fireEvent.change(secondNameInput, { target: { value: '' } })
    })
    act(() => {
      fireEvent.change(secondWeightInput, { target: { value: '' } })
    })

    expect(getGear(store.getState())).toHaveLength(1)
    expect(getGear(store.getState())[0]).toMatchObject(firstItem)
  })

  it('should insert a new item below the current one when enter is pressed', () => {
    const firstItem = { name: 'first item', weight: 0 }
    const secondItem = { name: 'second item', weight: 1 }
    store.dispatch(addGearItem(firstItem))
    store.dispatch(addGearItem(secondItem))
    const firstNameInput = component.getAllByTestId(gearNameInputTestID)[0]

    act(() => {
      userEvent.type(firstNameInput, specialChars.enter)
    })

    expect(getGear(store.getState())).toHaveLength(3)
    expect(getGear(store.getState())).toMatchObject([
      firstItem,
      { name: '' },
      secondItem,
    ])
  })
})
