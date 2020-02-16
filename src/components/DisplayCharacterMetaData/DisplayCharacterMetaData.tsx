import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React, { ChangeEvent, useCallback } from 'react'
import * as CharacterMetadataActions from '../../store/CharacterMetaData/actions'

import './DisplayCharacterMetaData.css'

const mapState = (state: RootState) => state.characterMetaData

const mapDispatchToProps = CharacterMetadataActions

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
    <div className={'character-meta-data'}>
      <div className={'character-name metadata-input-block'}>
        <input value={characterName} onChange={callWithValue(setCharacterName)} id={'character-name'} />
        <label htmlFor={'character-name'}>CharakterName</label>
      </div>
      Character Name: <input value={characterName} onChange={callWithValue(setCharacterName)} /> <br />
      Player Name: <input value={playerName} onChange={callWithValue(setPlayerName)} /> <br />
    </div>
  )
})
