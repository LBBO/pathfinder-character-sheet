import {RootState} from '../../store/root-reducer'
import {connect, ConnectedProps} from 'react-redux'
import React, {ChangeEvent, useCallback} from 'react'
import {setCharacterName, setPlayerName} from '../../store/CharacterMetaData/actions'

const mapState = (state: RootState) => (
  {
    abilities: state.abilities,
  }
)

const mapDispatchToProps = {}

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplayAbilities = connector((
  {abilities}: Props,
) => {
  const abilityElements = Object.entries(abilities).map((entry) => (
    <div key={entry[0]}>
      {entry[0]} {JSON.stringify(entry[1])}
    </div>
  ))
  return (
    <div>
      {abilityElements}
      <div className={'inverted-rounded-corners'} style={{fontSize: '1em'}}>
        Fertigkeiten
      </div>
      <br />
      <div className={'inverted-rounded-corners'} style={{fontSize: '2em'}}>
        Fertigkeiten
      </div>
      <br />
      <div className={'inverted-rounded-corners'} style={{fontSize: '3em'}}>
        Fertigkeiten
      </div>
      <br />
      <div className={'inverted-rounded-corners'} style={{fontSize: '4em'}}>
        Fertigkeiten
      </div>
    </div>
  )
})
