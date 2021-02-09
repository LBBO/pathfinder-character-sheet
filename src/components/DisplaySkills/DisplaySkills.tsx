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
        <table>
          <thead>
            <tr>
              <th>{t('skillsTable.skillName')}</th>
              <th>
                {t('general.total')} {t('general.bonus')}
              </th>
              <th> {/* Base ability name */} </th>
              <th>
                {t('general.ability.short')}.-{t('general.modifier.short')}.
              </th>
              <th> {/* + */} </th>
              <th>{t('skillsTable.ranks')}</th>
              <th> {/* + */} </th>
              <th>
                {t('general.misc.short')}. {t('general.modifier.short')}.
              </th>
            </tr>
          </thead>
          <tbody>
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
                  <tr key={index}>
                    <td>
                      <label>
                        <StyledCheckbox
                          checked={skill.isClassSkill}
                          onChange={() =>
                            setIsSkillClassSkill(skillName, !skill.isClassSkill)
                          }
                        />
                        {t(`skills.${skillName}`)}
                        {isTrainedOnly ? ' *' : ''}
                      </label>
                    </td>
                    <td>{totalSkillBonuses[skillName]}</td>
                    <td>={t(`abilities.${abilityName}.short`)}</td>
                    <td>{abilityModifiers[abilityName]}</td>
                    <td>+</td>
                    <td>
                      <input
                        type={'number'}
                        value={skill.ranks}
                        onChange={onSkillRanksChange(skillName)}
                      />
                    </td>
                    <td>+</td>
                    <td>
                      <input
                        type={'number'}
                        value={skill.miscModifier}
                        onChange={onSkillMiscModChange(skillName)}
                      />
                    </td>
                  </tr>
                )
              })}
            <tr className={'legend'}>
              <td>
                <StyledCheckbox checked={true} disabled />
                {t('skillsTable.classSkill')} &nbsp; &nbsp; *{' '}
                {t('skillsTable.trainedOnly')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },
)
