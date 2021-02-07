import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { DisplayCombatValues } from './DisplayCombatValues'
import {
  RootActionTypes,
  RootReducer,
  RootState,
} from '../../store/root-reducer'
import { Provider } from 'react-redux'
import { act } from 'react-dom/test-utils'
import { setInitiativeMiscModifier } from '../../store/CombatValues/actions'
import { createStore, Store } from 'redux'
import { setAbilityScore } from '../../store/Abilities/actions'
import { getAbilityModifiers } from '../../store/Abilities/selectors'
import {
  getArmorClass,
  getFlatFootedArmorClass,
  getTotalInitiativeBonus,
  getTouchArmorClass,
} from '../../store/CombatValues/selectors'
import { setCharacterSizeCategory } from '../../store/CharacterMetaData/actions'
import { SizeCategory } from '../../store/CharacterMetaData/Character'
import { getSizeModifier } from '../../store/CharacterMetaData/selectors'

const editingNumberInputFieldShouldSetState = ({
  inputElement,
  getState,
  newValue = 4,
}: {
  inputElement: HTMLElement
  getState: () => number
  newValue?: number
}) => {
  expect(inputElement).toBeInTheDocument()
  expect(inputElement.tagName).toMatch(/^input$/i)

  act(() => {
    fireEvent.change(inputElement, { target: { value: newValue } })
  })

  expect(getState()).toBe(newValue)
  expect((inputElement as HTMLInputElement).value).toBe(newValue.toString())
}

describe('DisplayCombatValues', () => {
  let component = render(<></>)
  let store: Store<RootState, RootActionTypes>

  beforeEach(() => {
    store = createStore(RootReducer)
    component = render(
      <Provider store={store}>
        <DisplayCombatValues />
      </Provider>,
    )
  })

  describe('initiative block', () => {
    let initiativeContainer: HTMLElement
    let miscModifierInput: HTMLInputElement
    let dexterityModElement: HTMLInputElement
    let totalInitiativeBonusElement: HTMLInputElement

    beforeEach(() => {
      initiativeContainer = component.getByTestId('initiative-container')
      miscModifierInput = component.getByTestId(
        'initiative-misc-modifier',
      ) as HTMLInputElement
      dexterityModElement = component.getByTestId(
        'initiative-dexterity-modifier',
      ) as HTMLInputElement
      totalInitiativeBonusElement = component.getByTestId(
        'initiative-total-bonus',
      ) as HTMLInputElement
    })

    it('should render the initiative container', () => {
      expect(initiativeContainer).toBeInTheDocument()
    })

    it('should contain two input elements', () => {
      expect(miscModifierInput).toBeInTheDocument()
      expect(miscModifierInput.tagName).toMatch(/^input$/i)
      expect(dexterityModElement).toBeInTheDocument()
      expect(dexterityModElement.tagName).toMatch(/^input$/i)
      expect(totalInitiativeBonusElement).toBeInTheDocument()
      expect(totalInitiativeBonusElement.tagName).toMatch(/^input$/i)
    })

    it('should display the correct values', () => {
      act(() => {
        store.dispatch(setAbilityScore('dexterity', 12))
        store.dispatch(setInitiativeMiscModifier(2))
      })

      expect(dexterityModElement.value).toBe(
        getAbilityModifiers(store.getState()).dexterity.toString(),
      )
      expect(miscModifierInput.value).toBe(
        store.getState().combatValues.initiative.miscModifier.toString(),
      )
      expect(totalInitiativeBonusElement.value).toBe(
        getTotalInitiativeBonus(store.getState()).toString(),
      )
    })

    it('should dispatch the correct action when edited', () => {
      editingNumberInputFieldShouldSetState({
        inputElement: miscModifierInput,
        getState: () => store.getState().combatValues.initiative.miscModifier,
      })
    })
  })

  describe('armor class', () => {
    let totalArmorClassInput: HTMLInputElement
    let armorBonusInput: HTMLInputElement
    let shieldBonusInput: HTMLInputElement
    let dexterityModInput: HTMLInputElement
    let sizeModifierInput: HTMLInputElement
    let naturalArmorInput: HTMLInputElement
    let deflectionModifierInput: HTMLInputElement
    let miscModifierInput: HTMLInputElement
    let touchArmorInput: HTMLInputElement
    let flatFootedArmorInput: HTMLInputElement
    const getArmorValues = () => store.getState().combatValues.armorClass

    beforeEach(() => {
      totalArmorClassInput = component.getByTestId(
        'total-armor-class',
      ) as HTMLInputElement
      armorBonusInput = component.getByTestId(
        'armor-class-armor-bonus',
      ) as HTMLInputElement
      shieldBonusInput = component.getByTestId(
        'armor-class-shield-bonus',
      ) as HTMLInputElement
      dexterityModInput = component.getByTestId(
        'armor-class-dexterity-mod',
      ) as HTMLInputElement
      sizeModifierInput = component.getByTestId(
        'armor-class-size-modifier',
      ) as HTMLInputElement
      naturalArmorInput = component.getByTestId(
        'armor-class-natural-armor',
      ) as HTMLInputElement
      deflectionModifierInput = component.getByTestId(
        'armor-class-deflection-modifier',
      ) as HTMLInputElement
      miscModifierInput = component.getByTestId(
        'armor-class-misc-modifier',
      ) as HTMLInputElement
      touchArmorInput = component.getByTestId(
        'touch-armor-class',
      ) as HTMLInputElement
      flatFootedArmorInput = component.getByTestId(
        'flat-footed-class',
      ) as HTMLInputElement
    })

    it('should display the correct dex mod', () => {
      act(() => {
        store.dispatch(setAbilityScore('dexterity', 12))
      })

      expect(dexterityModInput.value).toBe(
        getAbilityModifiers(store.getState()).dexterity.toString(),
      )
    })

    it('should display the correct size mod', () => {
      act(() => {
        store.dispatch(setCharacterSizeCategory(SizeCategory.SMALL))
      })

      expect(sizeModifierInput.value).toBe(
        getSizeModifier(store.getState()).toString(),
      )
    })

    it('should display the correct total armor class', () => {
      act(() => {
        store.dispatch(setCharacterSizeCategory(SizeCategory.SMALL))
        store.dispatch(setAbilityScore('dexterity', 12))
      })

      expect(totalArmorClassInput.value).toBe(
        getArmorClass(store.getState()).toString(),
      )
    })

    it('should set the state correctly when armor bonus is edited', () => {
      editingNumberInputFieldShouldSetState({
        inputElement: armorBonusInput,
        getState: () => getArmorValues().armorBonus,
      })
    })

    it('should set the state correctly when shield bonus is edited', () => {
      editingNumberInputFieldShouldSetState({
        inputElement: shieldBonusInput,
        getState: () => getArmorValues().shieldBonus,
      })
    })

    it('should set the state correctly when natural armor is edited', () => {
      editingNumberInputFieldShouldSetState({
        inputElement: naturalArmorInput,
        getState: () => getArmorValues().naturalArmor,
      })
    })

    it('should set the state correctly when deflection mod is edited', () => {
      editingNumberInputFieldShouldSetState({
        inputElement: deflectionModifierInput,
        getState: () => getArmorValues().deflectionModifier,
      })
    })

    it('should set the state correctly when misc mod is edited', () => {
      editingNumberInputFieldShouldSetState({
        inputElement: miscModifierInput,
        getState: () => getArmorValues().miscModifier,
      })
    })

    it('should display the touch and flat-footed armor classes correctly', () => {
      act(() => {
        store.dispatch(setCharacterSizeCategory(SizeCategory.SMALL))
      })

      expect(touchArmorInput.value).toBe(
        getTouchArmorClass(store.getState()).toString(),
      )
      expect(flatFootedArmorInput.value).toBe(
        getFlatFootedArmorClass(store.getState()).toString(),
      )
    })
  })
})
