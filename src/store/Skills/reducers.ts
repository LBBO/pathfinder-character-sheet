import {
  quickSkillDefinitions,
  Skill,
  SkillState,
  UPDATE_SKILL_IS_CLASS_SKILL,
  UPDATE_SKILL_MISC_MODIFIER,
  UPDATE_SKILL_RANKS,
  UpdateSkillActionTypes,
} from './types'
import { abilityName } from '../Abilities/types'
import { AbilityModifiers } from '../Abilities/selectors'

export const updateTotalSkillBonus = (skill: Skill) => {
  skill.totalBonus = skill.abilityModifier + skill.ranks + skill.miscModifier + (skill.isClassSkill && skill.ranks >= 1 ? 3 : 0)
}

export const createInitialState = (abilityModifiers: AbilityModifiers) => {
  const result = {} as SkillState

  (Object.keys(quickSkillDefinitions) as Array<keyof SkillState>)
    .forEach((skillName: keyof SkillState) => {
      const baseAbilityName = quickSkillDefinitions[skillName].baseAbility as abilityName
      result[skillName] = {
        name: skillName,
        isClassSkill: false,
        abilityModifier: abilityModifiers[baseAbilityName],
        miscModifier: 0,
        ranks: 0,
        totalBonus: abilityModifiers[baseAbilityName],
      }

      updateTotalSkillBonus(result[skillName])
    })

  return result
}

export const applyNewModifiers = (state: SkillState, abilities: AbilityModifiers): SkillState => {
  const copy = { ...state };

  (Object.entries(state) as Array<[keyof SkillState, Skill]>).forEach(([skillName, skill]) => {
    const baseAbilityName = quickSkillDefinitions[skillName].baseAbility as abilityName

    copy[skillName] = {
      ...skill,
      abilityModifier: abilities[baseAbilityName],
    }

    updateTotalSkillBonus(copy[skillName])
  })

  return copy
}

export const SkillsReducer = (
  state?: SkillState,
  action?: UpdateSkillActionTypes,
  abilities?: AbilityModifiers,
  abilitiesChanged = false
): SkillState => {
  if (!state) {
    return createInitialState(abilities!)
  }

  if (abilitiesChanged) {
    return applyNewModifiers(state, abilities!)
  }

  let updatedSkill: Skill
  switch (action?.type) {
    case UPDATE_SKILL_MISC_MODIFIER:
      updatedSkill = {
        ...state[action?.payload.skillName],
        miscModifier: action?.payload.miscModifier,
      }
      break

    case UPDATE_SKILL_RANKS:
      if (action?.payload.ranks < 0) {
        // TODO: don't accept ranks > character level
        console.warn('Ranks must be >= 0')
      } else {
        updatedSkill = {
          ...state[action?.payload.skillName],
          ranks: action?.payload.ranks,
        }
      }

      break

    case UPDATE_SKILL_IS_CLASS_SKILL:
      updatedSkill = {
        ...state[action?.payload.skillName],
        isClassSkill: action?.payload.isClassSkill,
      }

      break
  }

  // @ts-ignore updatedSkill is used before it is assigned
  if (updatedSkill && action) {
    updateTotalSkillBonus(updatedSkill)

    return {
      ...state,
      [action?.payload.skillName]: updatedSkill,
    }
  } else {
    return state
  }
}
