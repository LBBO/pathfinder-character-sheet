export enum Morality {
  GOOD,
  NEUTRAL,
  BAD,
}

export enum Ethics {
  LAW,
  NEUTRAL,
  CHAOS
}

export type Alignment = {
  morality: Morality
  ethics: Ethics
}

export const NeutralAlignment = {
  morality: Morality.NEUTRAL,
  ethics: Ethics.NEUTRAL,
}
