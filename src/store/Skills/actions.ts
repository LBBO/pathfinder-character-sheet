import {
  SkillName,
  UPDATE_SKILL_IS_CLASS_SKILL,
  UPDATE_SKILL_MISC_MODIFIER,
  UPDATE_SKILL_RANKS,
  UpdateSkillActionTypes,
} from './types'

export const setSkillRanks = (skillName: SkillName, ranks: number): UpdateSkillActionTypes => {
  return {
    type: UPDATE_SKILL_RANKS,
    payload: {
      skillName,
      ranks,
    },
  }
}

export const setSkillMiscMod = (skillName: SkillName, miscModifier: number): UpdateSkillActionTypes => {
  return {
    type: UPDATE_SKILL_MISC_MODIFIER,
    payload: {
      skillName,
      miscModifier,
    },
  }
}

export const setIsSkillClassSkill = (skillName: SkillName, isClassSkill: boolean): UpdateSkillActionTypes => {
  return {
    type: UPDATE_SKILL_IS_CLASS_SKILL,
    payload: {
      skillName,
      isClassSkill,
    }
  }
}
