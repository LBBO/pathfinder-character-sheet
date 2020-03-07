import { RootState } from '../../store/root-reducer'
import { connect, ConnectedProps } from 'react-redux'
import React from 'react'
import { quickSkillDefinitions, SkillState } from '../../store/Skills/types'

const mapState = (state: RootState) => (
  {
    skills: state.skills
  }
)

const mapDispatchToProps = {

}

const connector = connect(mapState, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplaySkills = connector((
  { skills }: Props,
) => {
  return <div>
    {Object.entries(skills).map(([skillName, skill], index) => {
      const abilityName = quickSkillDefinitions[skillName as keyof SkillState].baseAbility
      return <div
        key={index}
      >
        {skillName} : {skill.totalBonus} = {abilityName} {skill.abilityModifier} + {skill.ranks} + {skill.miscModifier}
      </div>
    })}
  </div>
})
