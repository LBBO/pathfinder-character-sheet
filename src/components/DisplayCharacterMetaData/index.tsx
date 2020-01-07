import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React, { ChangeEvent, useCallback } from 'react'
import { setCharacterName, setPlayerName } from '../../store/CharacterMetaData/actions'

const mapState = (state: RootState) => (
  {
    characterName: state.characterMetaData.characterName ?? '',
    playerName: state.characterMetaData.playerName ?? '',
  }
)

const mapDispatchToProps = {
  setCharacterName,
  setPlayerName,
}

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplayCharacterMetaData = connector(({
  characterName, setCharacterName, playerName, setPlayerName,
}: Props) => {
  const callWithValue = useCallback(
    (callback: (value: string) => any) => useCallback(
      (event: ChangeEvent<HTMLInputElement>) => callback(event.target.value),
      [callback],
    ),
    [],
  )

  return (
    <div>
      Character Name: <input value={characterName} onChange={callWithValue(setCharacterName)} /> <br />
      Player Name: <input value={playerName} onChange={callWithValue(setPlayerName)} /> <br />
    </div>
  )
})
