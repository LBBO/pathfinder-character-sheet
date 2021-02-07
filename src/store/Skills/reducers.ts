import {
  quickSkillDefinitions,
  SkillState,
  UPDATE_SKILL_IS_CLASS_SKILL,
  UPDATE_SKILL_MISC_MODIFIER,
  UPDATE_SKILL_RANKS,
} from './types'
import { RootActionTypes } from '../root-reducer'

export const createInitialState = () => {
  const result = {} as SkillState

  ;(Object.keys(quickSkillDefinitions) as Array<keyof SkillState>).forEach(
    (skillName: keyof SkillState) => {
      result[skillName] = {
        name: skillName,
        isClassSkill: false,
        miscModifier: 0,
        ranks: 0,
      }
    },
  )

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
