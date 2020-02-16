import React from 'react'
import { DisplayCharacterMetaData } from '../DisplayCharacterMetaData/DisplayCharacterMetaData'
import { DisplayAbilities } from '../DisplayAbilities/DisplayAbilities'

export const CharacterSheet: React.FC = () => {
  return (
    <div>
      <img className={'pathfinder-logo'} alt={'Pathfinder logo'} src={'./pathfinderDE-logo.png'} />
      <DisplayCharacterMetaData />
      <DisplayAbilities />
    </div>
  )
}
