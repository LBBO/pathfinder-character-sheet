import React, { useCallback } from 'react'
import { TextareaWithLines } from '../TextareaWithLines/TextareaWithLines'
import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import { InvertedBorderRadius } from '../InvertedBorderRadius/InvertedBorderRadius'
import { useTranslation } from 'react-i18next'
import './DisplaySpecialAbilities.scss'
import { setSpecialAbilities } from '../../store/SpecialAbilities/actions'

const mapStateToProps = (state: RootState) => ({
  specialAbilities: state.specialAbilities,
})
const mapDispatchToProps = { setSpecialAbilities }
const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

export const DisplaySpecialAbilities = connector(
  ({ specialAbilities, setSpecialAbilities }: Props) => {
    const { t } = useTranslation()

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSpecialAbilities(e.target.value)
      },
      [setSpecialAbilities],
    )

    return (
      <div className={'special-abilities'}>
        <InvertedBorderRadius className={'title'}>
          {t('specialAbilities.title')}
        </InvertedBorderRadius>
        <TextareaWithLines
          minRows={12}
          value={specialAbilities}
          onChange={onChange}
        />
      </div>
    )
  },
)
