import {
  quickSkillDefinitions,
  Skill,
  SkillState,
  UPDATE_SKILL_IS_CLASS_SKILL,
  UPDATE_SKILL_MISC_MODIFIER,
  UPDATE_SKILL_RANKS,
} from './types'
import { abilityName } from '../Abilities/types'
import { getAbilityModifiers } from '../Abilities/selectors'
import { RootActionTypes, RootState } from '../root-reducer'
import { createSelector } from 'reselect'

export const computeTotalSkillBonus = (skill: Skill, abilityModifier: number): number => {
  return abilityModifier + skill.ranks + skill.miscModifier + (
    skill.isClassSkill && skill.ranks >= 1 ? 3 : 0
  )
}

export const getSkills = (state: RootState) => state.skills

export type TotalSkillBonuses = {
  [k in keyof SkillState]: number
}

export const getTotalSkillBonuses = createSelector([getSkills, getAbilityModifiers], (skills, abilityModifiers) => {
  const skillNames = Object.keys(skills) as Array<keyof SkillState>
  return skillNames.reduce((totalSkillsBonuses, currSkillName) => {
    const baseAbilityName = quickSkillDefinitions[currSkillName].baseAbility as abilityName

    return {
      ...totalSkillsBonuses,
      [currSkillName]: computeTotalSkillBonus(skills[currSkillName], abilityModifiers[baseAbilityName]),
    }
  }, {} as TotalSkillBonuses)
})

export const createInitialState = () => {
  const result = {} as SkillState

  (
    Object.keys(quickSkillDefinitions) as Array<keyof SkillState>
  )
    .forEach((skillName: keyof SkillState) => {
      result[skillName] = {
        name: skillName,
        isClassSkill: false,
        miscModifier: 0,
        ranks: 0,
      }
    })

  return result
}

export const SkillsReducer = (
  state?: SkillState,
  action?: RootActionTypes,
): SkillState => {
  if (!state) {
    return createInitialState()
  } else if (
    action?.type === UPDATE_SKILL_MISC_MODIFIER ||
    action?.type === UPDATE_SKILL_RANKS ||
    action?.type === UPDATE_SKILL_IS_CLASS_SKILL
  ) {
    const skillCopy = {
      ...state[action?.payload.skillName],
    }

    switch (action?.type) {
      case UPDATE_SKILL_MISC_MODIFIER:
        skillCopy.miscModifier = action?.payload.miscModifier
        break

      case UPDATE_SKILL_RANKS:
        if (action?.payload.ranks < 0) {
          // TODO: don't accept ranks > character level
          console.warn('Ranks must be >= 0')
        } else {
          skillCopy.ranks = action?.payload.ranks
        }
        break

      case UPDATE_SKILL_IS_CLASS_SKILL:
        skillCopy.isClassSkill = action?.payload.isClassSkill

        break
    }

    return {
      ...state,
      [action?.payload.skillName]: skillCopy,
    }
  } else {
    return state
  }
}
