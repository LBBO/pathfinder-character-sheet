import { CharacterMetaDataReducer } from './reducers'
import { CharacterMetaDataState } from './types'
import { CharacterGender, SizeCategory } from './Character'
import { NeutralAlignment } from './Alignment'
import {
  setCampaign, setCharacterAge,
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
