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
