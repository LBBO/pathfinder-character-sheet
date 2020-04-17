export type InitiativeState = {
  miscModifier: number,
}

export type ArmorClassState = {
  armorBonus: number, // aus ruestung tabelle
  shieldBonus: number, // aus ruestung tabelle
  sizeModifier: number, // von groesse
  naturalArmor: number, // talente / volk
  deflectionModifier: number, // zauber?
  miscModifier: number,
  otherModifiers: string,
}

export type SavingThrowValues = {
  baseSave: number, // tabellen
  magicModifier: number, // zauber
  miscModifier: number, // talente
  temporaryModifier: number,
}

export type SavingThrowsState = {
  fortitude: SavingThrowValues,
  reflex: SavingThrowValues,
  will: SavingThrowValues,
}

export type AttackBonusesState = {
  baseAttackBonus: number,
  spellResistance: number, // gegenstaende, klassen, voelker
}

export type CombatValuesState = {
  initiative: InitiativeState,
  armorClass: ArmorClassState,
  savingThrows: SavingThrowsState,
  attackBonuses: AttackBonusesState,
}
