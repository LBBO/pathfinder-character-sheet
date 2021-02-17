import { SpeedReducer } from './reducers'
import { EmptyAction, RootReducer } from '../root-reducer'
import {
  setBaseSpeed,
  setBurrowSpeed,
  setClimbSpeed,
  setFlySpeed,
  setSpeedTempModifiers,
  setSpeedWithArmor,
  setSwimSpeed,
} from './actions'
import { getSpeed, getSpeedInSquares, realLifeUnitToSquares } from './getters'
import { setLanguage } from '../AppState/actions'

describe('speed reducer', () => {
  it('should set an empty initial state', () => {
    expect(SpeedReducer(undefined, EmptyAction)).toMatchObject({})
  })

  it('should correctly set the base speed', () => {
    expect(SpeedReducer(undefined, setBaseSpeed(6)).baseSpeed).toBe(6)
  })

  it('should correctly set the "with armor" speed', () => {
    expect(SpeedReducer(undefined, setSpeedWithArmor(6))).toMatchObject({
      withArmor: 6,
    })
  })

  it('should correctly set the "fly" speed', () => {
    expect(SpeedReducer(undefined, setFlySpeed(6))).toMatchObject({
      fly: 6,
    })
  })

  it('should correctly set the "swim" speed', () => {
    expect(SpeedReducer(undefined, setSwimSpeed(6))).toMatchObject({
      swim: 6,
    })
  })

  it('should correctly set the "climb" speed', () => {
    expect(SpeedReducer(undefined, setClimbSpeed(6))).toMatchObject({
      climb: 6,
    })
  })

  describe('swim and climb are usually 1/4 of base speed', () => {
    it('should set climb and swim to 1/4 base speed if they are undefined', () => {
      expect(SpeedReducer(undefined, setBaseSpeed(6))).toMatchObject({
        baseSpeed: 6,
        swim: 1.5,
        climb: 1.5,
      })

      expect(SpeedReducer({ swim: 10 }, setBaseSpeed(6))).toMatchObject({
        baseSpeed: 6,
        swim: 10,
        climb: 1.5,
      })

      expect(SpeedReducer({ climb: 10 }, setBaseSpeed(6))).toMatchObject({
        baseSpeed: 6,
        swim: 1.5,
        climb: 10,
      })
    })

    it('should set climb and swim to 1/4 base speed if they are 1/4 of old base speed', () => {
      let state = SpeedReducer(undefined, setBaseSpeed(6))

      expect(SpeedReducer(state, setBaseSpeed(12))).toMatchObject({
        baseSpeed: 12,
        swim: 3,
        climb: 3,
      })
    })

    it('should NOT set climb and swim to 1/4 base speed if they are not undefined', () => {
      expect(SpeedReducer({ swim: 10 }, setBaseSpeed(12)).swim).toBe(10)
      expect(SpeedReducer({ climb: 10 }, setBaseSpeed(12)).climb).toBe(10)
    })

    it('should NOT set climb and swim to 1/4 base speed if they are not 1/4 of old base speed', () => {
      const state = SpeedReducer(undefined, setBaseSpeed(6))

      expect(SpeedReducer({ ...state, swim: 10 }, setBaseSpeed(12)).swim).toBe(
        10,
      )
      expect(
        SpeedReducer({ ...state, climb: 10 }, setBaseSpeed(12)).climb,
      ).toBe(10)
    })
  })

  it('should correctly set the "burrow" speed', () => {
    expect(SpeedReducer(undefined, setBurrowSpeed(6))).toMatchObject({
      burrow: 6,
    })
  })

  it('should correctly set the temp modifiers', () => {
    const modifiers = 'These are some temp modifiers'
    expect(
      SpeedReducer(undefined, setSpeedTempModifiers(modifiers)),
    ).toMatchObject({
      tempModifiers: modifiers,
    })
  })
})

describe('speed getters', () => {
  it('should be able to get the entire speed state', () => {
    const rootState = RootReducer(undefined, setBaseSpeed(6))
    expect(getSpeed(rootState)).toBe(rootState.speed)
  })

  describe('real unit to squares conversion', () => {
    it('should return undefined if distance is undefined', () => {
      expect(realLifeUnitToSquares(undefined)).toBe(undefined)
    })

    it('should convert 0 meters to 0 squares', () => {
      expect(realLifeUnitToSquares(0)).toBe(0)
    })

    it('should convert 1.49 meters to 0 squares', () => {
      expect(realLifeUnitToSquares(1.49)).toBe(0)
    })

    it('should convert 1.49 meters to 1 square if started squares are included', () => {
      expect(realLifeUnitToSquares(1.49, undefined, true)).toBe(1)
    })

    it('should convert 1.5 meters to 1 square', () => {
      expect(realLifeUnitToSquares(1.5)).toBe(1)
    })

    it('should convert 1.51 meters to 2 squares if started squares are included', () => {
      expect(realLifeUnitToSquares(1.51, undefined, true)).toBe(2)
    })

    it('should convert 2.99 meters to 1 square', () => {
      expect(realLifeUnitToSquares(2.99)).toBe(1)
    })

    it('should convert 3 meters to 2 squares', () => {
      expect(realLifeUnitToSquares(3)).toBe(2)
    })

    it('should convert 4.99 feet to 0 squares', () => {
      expect(realLifeUnitToSquares(4.99, true)).toBe(0)
    })

    it('should convert 5 feet to 1 square', () => {
      expect(realLifeUnitToSquares(5, true)).toBe(1)
    })

    it('should convert 15 feet to 3 squares', () => {
      expect(realLifeUnitToSquares(15, true)).toBe(3)
    })

    it('should convert 15.01 feet to 4 squares if started squares are included', () => {
      expect(realLifeUnitToSquares(15.01, true, true)).toBe(4)
    })
  })

  describe('converter of all speeds to squares', () => {
    it(`should never include modifiers in result`, () => {
      let state = RootReducer(undefined, setLanguage('de'))
      state = RootReducer(state, setSpeedTempModifiers('some modifiers'))

      expect(getSpeedInSquares(state)).toMatchObject({})
    })

    it(`should convert speeds from meters to squares if language is set to 'de'`, () => {
      let state = RootReducer(undefined, setLanguage('de'))
      state = RootReducer(state, setBaseSpeed(3))
      state = RootReducer(state, setSpeedWithArmor(5))

      expect(getSpeedInSquares(state)).toMatchObject({
        baseSpeed: 2,
        withArmor: 3,
      })
    })

    it(`should convert speeds from feet to squares if language is set to 'en'`, () => {
      let state = RootReducer(undefined, setLanguage('en'))
      state = RootReducer(state, setBaseSpeed(10))
      state = RootReducer(state, setSpeedWithArmor(17))

      expect(getSpeedInSquares(state)).toMatchObject({
        baseSpeed: 2,
        withArmor: 3,
      })
    })
  })
})
