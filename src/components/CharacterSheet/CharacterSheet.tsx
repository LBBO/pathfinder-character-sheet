import React from 'react'
import { DisplayCharacterMetaData } from '../DisplayCharacterMetaData/DisplayCharacterMetaData'
import { DisplayAbilities } from '../DisplayAbilities/DisplayAbilities'
import { DisplaySkills } from '../DisplaySkills/DisplaySkills'
import { DisplayCombatValues } from '../DisplayCombatValues/DisplayCombatValues'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { useI18nSetup } from '../../i18n/i18nSetup'

export const CharacterSheet: React.FC = () => {
  const { hasLoaded: i18nHasLoaded } = useI18nSetup()

  return i18nHasLoaded ? (
    <div>
      <img
        className={'pathfinder-logo'}
        alt={'Pathfinder logo'}
        src={'./pathfinderDE-logo.png'}
      />
      <LanguageSwitcher />
      <DisplayCharacterMetaData />
      <DisplayAbilities />
      <DisplayCombatValues />
      <DisplaySkills />
    </div>
  ) : null
}
