import React, { useCallback } from 'react'
import { BlackBox } from '../BlackBox/BlackBox'
import './DisplaySpeed.scss'
import { useTranslation } from 'react-i18next'
import { NumberInput } from '../util/NumberInput'
import { ModifiersInput } from '../ModifiersInput/ModifiersInput'
import { RootState } from '../../store/root-reducer'
import { getSpeed, getSpeedInSquares } from '../../store/Speed/getters'
import * as speedActions from '../../store/Speed/actions'
import { connect, ConnectedProps } from 'react-redux'

const mapStateToProps = (state: RootState) => ({
  speed: getSpeed(state),
  speedInSquares: getSpeedInSquares(state),
})
const mapDispatchToProps = speedActions
const connector = connect(mapStateToProps, mapDispatchToProps)

export const DisplaySpeed = connector(
  ({
    speed,
    speedInSquares,
    setBaseSpeed,
    setSpeedWithArmor,
    setFlySpeed,
    setSwimSpeed,
    setClimbSpeed,
    setBurrowSpeed,
    setSpeedTempModifiers,
  }: ConnectedProps<typeof connector>) => {
    const { t } = useTranslation()
    const onChangeModifiers = useCallback(
      (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSpeedTempModifiers(evt.target.value)
      },
      [setSpeedTempModifiers],
    )
    return (
      <div className={'speed'}>
        <BlackBox className={'title'}>
          {t('speed.speed')}
          <aside>{t('speed.land')}</aside>
        </BlackBox>
        <span className='speed-input-label base-speed'>
          {t('speed.baseSpeed')}
        </span>
        <span className='speed-input-label with-armor'>
          {t('speed.withArmor')}
        </span>
        <div className='speed-input-label fly'>
          <span>{t('speed.fly')}</span>
          <span>{t('speed.maneuverability')}</span>
        </div>
        <span className='speed-input-label swim'>{t('speed.swim')}</span>
        <span className='speed-input-label climb'>{t('speed.climb')}</span>
        <span className='speed-input-label burrow'>{t('speed.burrow')}</span>
        <div className='speed-input base-speed'>
          <label className='actual'>
            <NumberInput value={speed.baseSpeed} onChange={setBaseSpeed} />
            <aside>{t('speed.actualUnit')}</aside>
          </label>
          <label className='squares'>
            <NumberInput value={speedInSquares.baseSpeed} disabled readOnly />
            <aside>{t('speed.squaresUnit')}</aside>
          </label>
        </div>
        <div className='speed-input with-armor'>
          <label className='actual'>
            <NumberInput value={speed.withArmor} onChange={setSpeedWithArmor} />
            <aside>{t('speed.actualUnit')}</aside>
          </label>
          <label className='squares'>
            <NumberInput value={speedInSquares.withArmor} disabled readOnly />
            <aside>{t('speed.squaresUnit')}</aside>
          </label>
        </div>
        <div className='speed-input fly'>
          <label className='actual'>
            <NumberInput value={speed.fly} onChange={setFlySpeed} />
            <aside>{t('speed.actualUnit')}</aside>
          </label>
          <label className='squares'>
            <NumberInput value={speedInSquares.fly} disabled readOnly />
            <aside>{t('speed.squaresUnit')}</aside>
          </label>
        </div>
        <div className='speed-input swim'>
          <label className='actual'>
            <NumberInput value={speed.swim} onChange={setSwimSpeed} />
            <aside>{t('speed.actualUnit')}</aside>
          </label>
          <label className='squares'>
            <NumberInput value={speedInSquares.swim} disabled readOnly />
            <aside>{t('speed.squaresUnit')}</aside>
          </label>
        </div>
        <div className='speed-input climb'>
          <label className='actual'>
            <NumberInput value={speed.climb} onChange={setClimbSpeed} />
            <aside>{t('speed.actualUnit')}</aside>
          </label>
          <label className='squares'>
            <NumberInput value={speedInSquares.climb} disabled readOnly />
            <aside>{t('speed.squaresUnit')}</aside>
          </label>
        </div>
        <div className='speed-input burrow'>
          <label className='actual'>
            <NumberInput value={speed.burrow} onChange={setBurrowSpeed} />
            <aside>{t('speed.actualUnit')}</aside>
          </label>
          <label className='squares'>
            <NumberInput value={speedInSquares.burrow} disabled readOnly />
            <aside>{t('speed.squaresUnit')}</aside>
          </label>
        </div>
        <ModifiersInput
          className={'modifiers'}
          value={speed.tempModifiers}
          onChange={onChangeModifiers}
          type={'temp'}
        />
      </div>
    )
  },
)
