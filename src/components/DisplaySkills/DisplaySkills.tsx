import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React, { ChangeEvent } from 'react'
import {
  quickSkillDefinitions,
  Skill,
  SkillName,
} from '../../store/Skills/types'
import * as UpdateSkillsActions from '../../store/Skills/actions'

import './DisplaySkills.scss'
import { StyledCheckbox } from '../util/StyledCheckbox/StyledCheckbox'
import { getAbilityModifiers } from '../../store/Abilities/selectors'
import { getTotalSkillBonuses } from '../../store/Skills/selectors'
import { useTranslation } from 'react-i18next'
import { InvertedBorderRadius } from '../InvertedBorderRadius/InvertedBorderRadius'

const mapState = (state: RootState) => ({
  skills: state.skills,
  abilityModifiers: getAbilityModifiers(state),
  totalSkillBonuses: getTotalSkillBonuses(state),
})

const mapDispatchToProps = UpdateSkillsActions

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplaySkills = connector(
  ({
    skills,
    setIsSkillClassSkill,
    setSkillMiscMod,
    setSkillRanks,
    abilityModifiers,
    totalSkillBonuses,
  }: Props) => {
    const { t } = useTranslation()
    const onSkillRanksChange = (skillName: SkillName) => (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      setSkillRanks(skillName, parseInt(event.target.value))
    }

    const onSkillMiscModChange = (skillName: SkillName) => (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      setSkillMiscMod(skillName, parseInt(event.target.value))
    }

    return (
      <div className={'skills'}>
        <InvertedBorderRadius className={'title'}>
          {t('skillsTable.title')}
        </InvertedBorderRadius>
        <div className={'skills-table'}>
          <span className={'header skill-name'}>
            {t('skillsTable.skillName')}
          </span>
          <span className={'header'}>
            {t('general.total')} {t('general.bonus')}
          </span>
          <span className={'header'}> {/* Base ability name */} </span>
          <span className={'header'}>
            {t('general.ability.short')}.-{t('general.modifier.short')}.
          </span>
          <span className={'header'}> {/* + */} </span>
          <span className={'header'}>{t('skillsTable.ranks')}</span>
          <span className={'header'}> {/* + */} </span>
          <span className={'header'}>
            {t('general.misc.short')}. {t('general.modifier.short')}.
          </span>
          {(Object.entries(skills) as Array<[SkillName, Skill]>)
            .sort(([skillA], [skillB]) =>
              t(`skills.${skillA}`).localeCompare(t(`skills.${skillB}`)),
            )
            .map(([skillName, skill], index) => {
              const {
                baseAbility: abilityName,
                isTrainedOnly,
              } = quickSkillDefinitions[skillName]
              return (
                <React.Fragment key={index}>
                  <label className={'skill-name'}>
                    <StyledCheckbox
                      checked={skill.isClassSkill}
                      onChange={() =>
                        setIsSkillClassSkill(skillName, !skill.isClassSkill)
                      }
                    />
                    {t(`skills.${skillName}`)}
                    {isTrainedOnly ? ' *' : ''}
                  </label>
                  <span>{totalSkillBonuses[skillName]}</span>
                  <span className={'base-ability-name'}>
                    ={t(`abilities.${abilityName}.short`)}
                  </span>
                  <span>{abilityModifiers[abilityName]}</span>
                  <span>+</span>
                  <input
                    type={'number'}
                    value={skill.ranks}
                    onChange={onSkillRanksChange(skillName)}
                  />
                  <span>+</span>
                  <input
                    type={'number'}
                    value={skill.miscModifier}
                    onChange={onSkillMiscModChange(skillName)}
                  />
                </React.Fragment>
              )
            })}
          <div className={'legend'}>
            <StyledCheckbox checked={true} disabled />
            {t('skillsTable.classSkill')} &nbsp; &nbsp; *{' '}
            {t('skillsTable.trainedOnly')}
          </div>
        </div>
      </div>
    )
  },
)
