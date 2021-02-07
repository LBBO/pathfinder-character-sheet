import { CharacterMetaDataReducer } from './reducers'
import { CharacterGender, SizeCategory } from './Character'
import { NeutralAlignment } from './Alignment'
import {
  setCampaign,
  setCharacterAge,
  setCharacterAlignment,
  setCharacterClass,
  setCharacterDeity,
  setCharacterEyes,
  setCharacterGender,
  setCharacterHair,
  setCharacterHeight,
  setCharacterHomeland,
  setCharacterLevel,
  setCharacterName,
  setCharacterRace,
  setCharacterSizeCategory,
  setCharacterWeight,
  setPlayerName,
} from './actions'
import { getSizeModifier } from './selectors'
import { RootReducer } from '../root-reducer'

describe('CharacterMetaDataReducer', () => {
  it('should return the correct initial state', () => {
    expect(CharacterMetaDataReducer()).toMatchObject({
      level: 0,
      characterName: '',
    })
  })

  describe('Should set all the metadata correctly', () => {
    const expectedEndState = {
      level: 2,
      characterName: 'Character Name',
      campaign: 'Campaign',
      sizeCategory: SizeCategory.SMALL,
      playerName: 'Player Name',
      className: 'Magician',
      race: 'Human',
      homeland: 'Mars',
      alignment: NeutralAlignment,
      weight: 70,
      height: 170,
      hair: 'brown',
      gender: CharacterGender.MALE,
      eyes: 'green',
      deity: 'Atheist',
      age: 24,
    }

    let initialState = CharacterMetaDataReducer()
    const actions = [
      setCharacterLevel(expectedEndState.level),
      setCharacterName(expectedEndState.characterName),
      setCampaign(expectedEndState.campaign),
      setCharacterSizeCategory(expectedEndState.sizeCategory),
      setPlayerName(expectedEndState.playerName),
      setCharacterClass(expectedEndState.className),
      setCharacterRace(expectedEndState.race),
      setCharacterHomeland(expectedEndState.homeland),
      setCharacterAlignment(expectedEndState.alignment),
      setCharacterWeight(expectedEndState.weight),
      setCharacterHeight(expectedEndState.height),
      setCharacterHair(expectedEndState.hair),
      setCharacterGender(expectedEndState.gender),
      setCharacterEyes(expectedEndState.eyes),
      setCharacterDeity(expectedEndState.deity),
      setCharacterAge(expectedEndState.age),
    ]

    const finalState = actions.reduce(
      (currState, action) => CharacterMetaDataReducer(currState, action),
      initialState,
    )
    expect(finalState).toMatchObject(expectedEndState)
  })
})

describe('getSizeModifier', () => {
  it('should return 0 when the size category is medium', () => {
    const state = RootReducer(
      undefined,
      setCharacterSizeCategory(SizeCategory.MEDIUM),
    )
    expect(getSizeModifier(state)).toBe(0)
  })

  it('should return 1 when the size category is small', () => {
    const state = RootReducer(
      undefined,
      setCharacterSizeCategory(SizeCategory.SMALL),
    )
    expect(getSizeModifier(state)).toBe(1)
  })

  it('should return -1 when the size category is large', () => {
    const state = RootReducer(
      undefined,
      setCharacterSizeCategory(SizeCategory.LARGE),
    )
    expect(getSizeModifier(state)).toBe(-1)
  })
})
