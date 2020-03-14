import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React, { ChangeEvent } from 'react'
import { quickSkillDefinitions, Skill, SkillName } from '../../store/Skills/types'
import * as UpdateSkillsActions from '../../store/Skills/actions'

import './DisplaySkills.scss'
import { StyledCheckbox } from '../StyledCheckbox/StyledCheckbox'

const mapState = (state: RootState) => (
  {
    skills: state.skills,
  }
)

const mapDispatchToProps = UpdateSkillsActions

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplaySkills = connector((
  {
    skills,
    setIsSkillClassSkill,
    setSkillMiscMod,
    setSkillRanks,
  }: Props,
) => {
  const onSkillRanksChange = (skillName: SkillName) => (event: ChangeEvent<HTMLInputElement>) => {
    setSkillRanks(skillName, parseInt(event.target.value))
  }

  const onSkillMiscModChange = (skillName: SkillName) => (event: ChangeEvent<HTMLInputElement>) => {
    setSkillMiscMod(skillName, parseInt(event.target.value))
  }

  return <div className={'skills'}>
    <table>
      <thead>
        <tr>
          <th> {/* Checkbox */} </th>
          <th>Skill Names</th>
          <th>Total Bonus</th>
          <th> {/* Base ability name */} </th>
          <th>Ability Mod.</th>
          <th> {/* + */} </th>
          <th>Ranks</th>
          <th> {/* + */} </th>
          <th>Misc. Mod.</th>
        </tr>
      </thead>
      <tbody>
        {(
          Object.entries(skills) as Array<[SkillName, Skill]>
        )
          .map(([skillName, skill], index) => {
            const { baseAbility: abilityName, isTrainedOnly } = quickSkillDefinitions[skillName]
            return <tr
              key={index}
            >
              <td>
                <StyledCheckbox
                  checked={skill.isClassSkill}
                  onChange={() => setIsSkillClassSkill(skillName, !skill.isClassSkill)}
                />
                {/*<input onChange={() => setIsSkillClassSkill(skillName, !skill.isClassSkill)} />*/}
              </td>
              <td>{skillName}{isTrainedOnly ? '*' : ''}</td>
              <td>{skill.totalBonus}</td>
              <td>={abilityName}</td>
              <td>{skill.abilityModifier}</td>
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
          })}
        <tr className={'legend'}>
          <td>
            <StyledCheckbox checked={true} />
          </td>
          <td>Class Skill &nbsp; &nbsp; * Trained Only</td>
        </tr>
      </tbody>
    </table>
  </div>
})
