import React from 'react'
import { BlackBox } from '../BlackBox/BlackBox'
import './DisplaySpeed.scss'
import { useTranslation } from 'react-i18next'
import { NumberInput } from '../util/NumberInput'

export const DisplaySpeed = () => {
  const { t } = useTranslation()
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
          <NumberInput value={0} />
          <aside>{t('speed.actualUnit')}</aside>
        </label>
        <label className='squares'>
          <NumberInput value={0} />
          <aside>{t('speed.squaresUnit')}</aside>
        </label>
      </div>
      <div className='speed-input with-armor'>
        <label className='actual'>
          <NumberInput value={0} />
          <aside>{t('speed.actualUnit')}</aside>
        </label>
        <label className='squares'>
          <NumberInput value={0} />
          <aside>{t('speed.squaresUnit')}</aside>
        </label>
      </div>
      <div className='speed-input fly'>
        <label className='actual'>
          <NumberInput value={0} />
          <aside>{t('speed.actualUnit')}</aside>
        </label>
        <label className='squares'>
          <NumberInput value={0} />
          <aside>{t('speed.squaresUnit')}</aside>
        </label>
      </div>
      <div className='speed-input swim'>
        <label className='actual'>
          <NumberInput value={0} />
          <aside>{t('speed.actualUnit')}</aside>
        </label>
        <label className='squares'>
          <NumberInput value={0} />
          <aside>{t('speed.squaresUnit')}</aside>
        </label>
      </div>
      <div className='speed-input climb'>
        <label className='actual'>
          <NumberInput value={22} />
          <aside>{t('speed.actualUnit')}</aside>
        </label>
        <label className='squares'>
          <NumberInput value={0} />
          <aside>{t('speed.squaresUnit')}</aside>
        </label>
      </div>
      <div className='speed-input burrow'>
        <label className='actual'>
          <NumberInput value={0} />
          <aside>{t('speed.actualUnit')}</aside>
        </label>
        <label className='squares'>
          <NumberInput value={0} />
          <aside>{t('speed.squaresUnit')}</aside>
        </label>
      </div>
      <textarea className={'modifiers'} />
    </div>
  )
}
