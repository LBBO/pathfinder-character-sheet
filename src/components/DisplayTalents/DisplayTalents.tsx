import React, { useCallback } from 'react'
import { TextareaWithLines } from '../TextareaWithLines/TextareaWithLines'
import { RootState } from '../../store/root-reducer'
import { updateTalents } from '../../store/Talents/actions'
import { connect, ConnectedProps } from 'react-redux'
import { InvertedBorderRadius } from '../InvertedBorderRadius/InvertedBorderRadius'
import { useTranslation } from 'react-i18next'
import './DisplayTalents.scss'

const mapStateToProps = (state: RootState) => ({
  talents: state.talents,
})
const mapDispatchToProps = { updateTalents }
const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

export const DisplayTalents = connector(({ talents, updateTalents }: Props) => {
  const { t } = useTranslation()

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateTalents(e.target.value)
    },
    [updateTalents],
  )

  return (
    <div className={'talents'}>
      <InvertedBorderRadius className={'title'}>
        {t('talents.title')}
      </InvertedBorderRadius>
      <TextareaWithLines minRows={12} value={talents} onChange={onChange} />
    </div>
  )
})
