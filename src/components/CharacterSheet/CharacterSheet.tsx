import React from 'react'
import { DisplayCharacterMetaData } from '../DisplayCharacterMetaData/DisplayCharacterMetaData'
import { DisplayAbilities } from '../DisplayAbilities/DisplayAbilities'
import { DisplaySkills } from '../DisplaySkills/DisplaySkills'
import { DisplayCombatValues } from '../DisplayCombatValues/DisplayCombatValues'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { useI18nSetup } from '../../i18n/i18nSetup'
import { DisplayTalents } from '../DisplayTalents/DisplayTalents'
import { DisplaySpecialAbilities } from '../DisplaySpecialAbilities/DisplaySpecialAbilities'
import { DisplayInventory } from '../DisplayInventory/DisplayInventory'
import { DownloadButton } from '../DownloadButton/DownloadButton'
import { DisplayGear } from '../DisplayInventory/DisplayGear'
import { DisplayArmorItems } from '../DisplayInventory/DisplayArmorItems'
import './CharacterSheet.scss'
import { useTranslation } from 'react-i18next'

export const CharacterSheet: React.FC = () => {
  const { hasLoaded: i18nHasLoaded } = useI18nSetup()
  const { t } = useTranslation()

  return i18nHasLoaded ? (
    <div className={'character-sheet'}>
      <header>
        <div className={'other-controls'}>
          <DownloadButton />
          <LanguageSwitcher />
        </div>
        <div
          className={'logo'}
          role={'img'}
          aria-label={t('general.logo')}
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + '/pathfinderDE-logo.png'
            })`,
          }}
        />
        <h1>{t('general.characterSheet')}</h1>

        <DisplayCharacterMetaData />
      </header>
      <div className={'first-page'}>
        <div className={'left-column'}>
          <DisplayAbilities />
          <DisplayCombatValues />
          <DisplayInventory />
        </div>
        <div className={'right-column'}>
          <DisplaySkills />
        </div>
      </div>
      <div className={'second-page'}>
        <DisplayArmorItems />
        <DisplayGear />
        <DisplayTalents />
        <DisplaySpecialAbilities />
      </div>
    </div>
  ) : null
}
