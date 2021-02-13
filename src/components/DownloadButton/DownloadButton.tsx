import React, { useCallback } from 'react'
import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import sanitize from 'sanitize-filename'
import { useTranslation } from 'react-i18next'

const mapStateDoProps = (state: RootState) => ({
  state,
})
const mapDispatchToProps = {}
const connector = connect(mapStateDoProps, mapDispatchToProps)

export const DownloadButton = connector(
  ({ state }: ConnectedProps<typeof connector>) => {
    const { t } = useTranslation()

    const downloadState = useCallback(() => {
      const json = JSON.stringify(state, null, 2)
      const blob = new Blob([json], { type: 'text/plain;charset=utf-8' })
      const url = window.URL || window.webkitURL
      const link = url.createObjectURL(blob)
      const a = document.createElement('a')
      a.download = sanitize(
        `${t('general.characterSheet')} ${
          state.characterMetaData.characterName
        }.json`,
      )
      a.href = link
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }, [state, t])

    return (
      <>
        <button onClick={downloadState}>⬇</button>
      </>
    )
  },
)
