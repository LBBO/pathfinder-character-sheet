export const quickSkillDefinitions = {
  acrobatics: {
    baseAbility: "dexterity",
    isTrainedOnly: false
  },
  appraise: {
    baseAbility: "intelligence",
    isTrainedOnly: false
  },
  bluff: {
    baseAbility: "charisma",
    isTrainedOnly: false
  },
  climb: {
    baseAbility: "strength",
    isTrainedOnly: false
  },
  craft: {
    baseAbility: "intelligence",
    isTrainedOnly: false
  },
  diplomacy: {
    baseAbility: "charisma",
    isTrainedOnly: false
  },
  disableDevice: {
    baseAbility: "dexterity",
    isTrainedOnly: true
  },
  disguise: {
    baseAbility: "charisma",
    isTrainedOnly: false
  },
  escapeArtist: {
    baseAbility: "dexterity",
    isTrainedOnly: false
  },
  fly: {
    baseAbility: "dexterity",
    isTrainedOnly: false
  },
  handleAnimal: {
    baseAbility: "charisma",
    isTrainedOnly: true
  },
  heal: {
    baseAbility: "wisdom",
    isTrainedOnly: false
  },
  intimidate: {
    baseAbility: "charisma",
    isTrainedOnly: false
  },
  knowledgeArcana: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  knowledgeDungeoneering: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  knowledgeEngineering: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  knowledgeGeography: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  knowledgeHistory: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  knowledgeLocal: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  knowledgeNature: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  knowledgeNobility: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  knowledgePlanes: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  knowledgeReligion: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  linguistics: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  perception: {
    baseAbility: "wisdom",
    isTrainedOnly: false
  },
  perform: {
    baseAbility: "charisma",
    isTrainedOnly: false
  },
  profession: {
    baseAbility: "wisdom",
    isTrainedOnly: true
  },
  ride: {
    baseAbility: "dexterity",
    isTrainedOnly: false
  },
  senseMotive: {
    baseAbility: "wisdom",
    isTrainedOnly: false
  },
  sleightOfHand: {
    baseAbility: "dexterity",
    isTrainedOnly: true
  },
  spellcraft: {
    baseAbility: "intelligence",
    isTrainedOnly: true
  },
  stealth: {
    baseAbility: "dexterity",
    isTrainedOnly: false
  },
  survival: {
    baseAbility: "wisdom",
    isTrainedOnly: false
  },
  swim: {
    baseAbility: "strength",
    isTrainedOnly: false
  },
  useMagicDevice: {
    baseAbility: "charisma",
    isTrainedOnly: true
  }
}

export type Skill = {
  name: string,
  abilityModifier: number,
  ranks: number,
  miscModifier: number,
  totalBonus: number,
  isClassSkill: boolean
}

export type SkillState = {
  [k in keyof typeof quickSkillDefinitions]: Skill
}

export const UPDATE_SKILL_RANKS = 'UPDATE_SKILL_RANKS'
export const UPDATE_SKILL_MISC_MODIFIER = 'UPDATE_SKILL_MISC_MODIFIER'

export type UpdateSkillRankAction = {
  type: typeof UPDATE_SKILL_RANKS,
  payload: {
    skillName: keyof typeof quickSkillDefinitions,
    ranks: number,
  }
}

export type UpdateSkillMiscModifierAction = {
  type: typeof UPDATE_SKILL_MISC_MODIFIER,
  payload: {
    skillName: keyof typeof quickSkillDefinitions,
    miscModifier: number,
  }
}

export type UpdateSkillActionTypes = UpdateSkillRankAction | UpdateSkillMiscModifierAction
