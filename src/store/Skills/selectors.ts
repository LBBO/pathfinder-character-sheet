import { quickSkillDefinitions, Skill, SkillState } from './types'
import { createSelector } from 'reselect'
import { getAbilityModifiers } from '../Abilities/selectors'
import { abilityName } from '../Abilities/types'
import { RootState } from '../root-reducer'

export const getSkills = (state: RootState) => state.skills
export type TotalSkillBonuses = {
  [k in keyof SkillState]: number
}

export const computeTotalSkillBonus = (
  skill: Skill,
  abilityModifier: number,
): number => {
  return (
    abilityModifier +
    skill.ranks +
    skill.miscModifier +
    (skill.isClassSkill && skill.ranks >= 1 ? 3 : 0)
  )
}

export const getTotalSkillBonuses = createSelector(
  [getSkills, getAbilityModifiers],
  (skills, abilityModifiers) => {
    const skillNames = Object.keys(skills) as Array<keyof SkillState>
    return skillNames.reduce((totalSkillsBonuses, currSkillName) => {
      const baseAbilityName = quickSkillDefinitions[currSkillName]
        .baseAbility as abilityName

      return {
        ...totalSkillsBonuses,
        [currSkillName]: computeTotalSkillBonus(
          skills[currSkillName],
          abilityModifiers[baseAbilityName],
        ),
      }
    }, {} as TotalSkillBonuses)
  },
)
