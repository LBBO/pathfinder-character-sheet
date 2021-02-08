import React from 'react'
import { RootState } from '../store/root-reducer'
import { getLanguage } from '../store/AppState/selectors'
import { setLanguage } from '../store/AppState/actions'
import { connect, ConnectedProps } from 'react-redux'
import 'flag-icon-css/sass/flag-icon.scss'
import './LanguageSwitcher.scss'

const mapState = (state: RootState) => ({
  language: getLanguage(state),
})

const mapDispatchToProps = {
  setLanguage,
}

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const LanguageSwitcher = connector(({ setLanguage }: Props) => {
  return (
    <div className={'language-switcher'}>
      <span
        className={'flag-icon flag-icon-de'}
        onClick={() => setLanguage('de')}
      />
      <span
        className={'flag-icon flag-icon-us'}
        onClick={() => setLanguage('en')}
      />
    </div>
  )
})
