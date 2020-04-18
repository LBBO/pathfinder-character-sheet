import React, { useCallback } from 'react'
import { RootState } from '../../store/root-reducer'
import * as CombatValueActions from '../../store/CombatValues/actions'
import { connect, ConnectedProps } from 'react-redux'
import {
  getArmorClass,
  getCombatManeuverBonus,
  getCombatManeuverDefense,
  getCombatValues,
  getFlatFootedArmorClass,
  getFortitudeBonus,
  getReflexBonus,
  getTotalInitiativeBonus,
  getTouchArmorClass,
  getWillBonus,
} from '../../store/CombatValues/selectors'
import { getAbilityModifiers } from '../../store/Abilities/selectors'
import { getSizeModifier } from '../../store/CharacterMetaData/selectors'
import { SavingThrowsState } from '../../store/CombatValues/types'
import { abilityName } from '../../store/Abilities/types'

const NumberInput = ({
  value,
  onChange,
  label,
  testId,
}: {
  value: number,
  onChange?: (n: number) => void,
  label?: string,
  testId?: string
}) => {
  const onChangeHandler = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(parseInt(evt.target.value))
  }, [onChange])
  return <label>
    <input
      type={'number'}
      value={value}
      onChange={onChangeHandler}
      disabled={!Boolean(onChange)}
      data-testid={testId}
    />
    {label ? `(${label})` : null}
  </label>

}

const mapStateToProps = (state: RootState) => (
  {
    combatValues: getCombatValues(state),
    totalInitiativeBonus: getTotalInitiativeBonus(state),
    abilityModifiers: getAbilityModifiers(state),
    totalArmorClass: getArmorClass(state),
    sizeModifier: getSizeModifier(state),
    touchArmorClass: getTouchArmorClass(state),
    flatFootedArmorClass: getFlatFootedArmorClass(state),
    fortitudeBonus: getFortitudeBonus(state),
    reflexBonus: getReflexBonus(state),
    willBonus: getWillBonus(state),
    combatManeuverBonus: getCombatManeuverBonus(state),
    combatManeuverDefense: getCombatManeuverDefense(state),
  }
)
const mapDispatchToProps = CombatValueActions
const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplayCombatValues = connector(({
  combatValues,
  setInitiativeMiscModifier,
  totalInitiativeBonus,
  abilityModifiers,
  totalArmorClass,
  setArmorBonus,
  setShieldBonus,
  setNaturalArmor,
  setDeflectionModifier,
  setMiscArmorModifier,
  sizeModifier,
  touchArmorClass,
  flatFootedArmorClass,
  fortitudeBonus,
  reflexBonus,
  willBonus,
  combatManeuverBonus,
  combatManeuverDefense,
  setBaseSave,
  setSavingThrowMagicModifier,
  setMiscSavingThrowModifier,
  setTemporarySavingThrowModifier,
  setBaseAttackBonus,
  setSpellResistance,
}: Props) => {
  const setForCertainSavingThrow = useCallback(
    (
      savingThrowName: keyof SavingThrowsState,
      setter: (val: number, savingThrowName: keyof SavingThrowsState) => void,
    ) =>
      useCallback((newValue: number) => {
        setter(newValue, savingThrowName)
      }, [savingThrowName, setter]),
    [],
  )

  return <div className={'combat-values'}>
    <div className={'initiative'} data-testid={'initiative-container'}>
      Initiative Modifier:
      <NumberInput
        value={totalInitiativeBonus}
        label={'total'}
        testId={'initiative-total-bonus'}
      /> =
      <NumberInput
        value={abilityModifiers.dexterity}
        label={'dex mod'}
        testId={'initiative-dexterity-modifier'}
      />+
      <NumberInput
        onChange={setInitiativeMiscModifier}
        value={combatValues.initiative.miscModifier}
        label={'misc mod'}
        testId={'initiative-misc-modifier'}
      />
    </div>
    <div className={'armor-class'}>
      AC Armor Class:
      <NumberInput
        value={totalArmorClass}
        testId={'total-armor-class'}
      />=
      <NumberInput
        onChange={setArmorBonus}
        value={combatValues.armorClass.armorBonus}
        label={'armor class'}
        testId={'armor-class-armor-bonus'}
      /> +
      <NumberInput
        onChange={setShieldBonus}
        value={combatValues.armorClass.shieldBonus}
        label={'shield bonus'}
        testId={'armor-class-shield-bonus'}
      /> +
      <NumberInput
        value={abilityModifiers.dexterity}
        label={'dexterity mod'}
        testId={'armor-class-dexterity-mod'}
      /> +
      <NumberInput
        value={sizeModifier}
        label={'size mod'}
        testId={'armor-class-size-modifier'}
      /> +
      <NumberInput
        onChange={setNaturalArmor}
        value={combatValues.armorClass.naturalArmor}
        label={'natural armor'}
        testId={'armor-class-natural-armor'}
      /> +
      <NumberInput
        onChange={setDeflectionModifier}
        value={combatValues.armorClass.deflectionModifier}
        label={'deflection mod'}
        testId={'armor-class-deflection-modifier'}
      /> +
      <NumberInput
        onChange={setMiscArmorModifier}
        value={combatValues.armorClass.miscModifier}
        label={'misc mod'}
        testId={'armor-class-misc-modifier'}
      />
    </div>
    <div className={'touch-armor-class'}>
      Touch Armor Class:
      <NumberInput
        value={touchArmorClass}
        testId={'touch-armor-class'}
      />
    </div>
    <div className={'flat-footed-armor-class'}>
      Flat-Footed Armor Class:
      <NumberInput
        value={flatFootedArmorClass}
        testId={'flat-footed-class'}
      />
    </div>
    <div className={'saving-throws'}>
      {(
        Object.keys(combatValues.savingThrows) as Array<keyof SavingThrowsState>
      )
        .map((savingThrowName, index) => {
          const savingThrow = combatValues.savingThrows[savingThrowName]
          let baseAbilityName: abilityName
          let savingThrowBonus: number

          switch (savingThrowName) {
            case 'fortitude':
              baseAbilityName = 'constitution'
              savingThrowBonus = fortitudeBonus
              break
            case 'reflex':
              baseAbilityName = 'dexterity'
              savingThrowBonus = reflexBonus
              break
            case 'will':
              savingThrowBonus = willBonus
              baseAbilityName = 'wisdom'
              break
          }

          const abilityModifier = abilityModifiers[baseAbilityName]

          return <div
            key={index}
          >
            {savingThrowName} ({baseAbilityName})
            <NumberInput
              value={savingThrowBonus}
            /> =
            <NumberInput
              value={savingThrow.baseSave}
              onChange={setForCertainSavingThrow(savingThrowName, setBaseSave)}
            /> +
            <NumberInput
              value={abilityModifier}
            /> +
            <NumberInput
              value={savingThrow.magicModifier}
              onChange={setForCertainSavingThrow(savingThrowName, setSavingThrowMagicModifier)}
            /> +
            <NumberInput
              value={savingThrow.miscModifier}
              onChange={setForCertainSavingThrow(savingThrowName, setMiscSavingThrowModifier)}
            /> +
            <NumberInput
              value={savingThrow.temporaryModifier}
              onChange={setForCertainSavingThrow(savingThrowName, setTemporarySavingThrowModifier)}
            /> +
          </div>
        })}
    </div>
    <div className={'base-attack-bonus'}>
      Base Attack Bonus: <NumberInput
      value={combatValues.attackBonuses.baseAttackBonus}
      onChange={setBaseAttackBonus}
    />
    </div>
    <div className={'spell-resistance'}>
      Spell Resistance:
      <NumberInput
        value={combatValues.attackBonuses.spellResistance}
        onChange={setSpellResistance}
      />
    </div>
    <div className={'combat-values'}>
      <div>
        Combat Maneuver Bonus:
        <NumberInput
          value={combatManeuverBonus}
          label={'total'}
        /> =
        <NumberInput
          value={combatValues.attackBonuses.baseAttackBonus}
          label={'base attack bonus'}
        /> +
        <NumberInput
          value={abilityModifiers.strength}
          label={'strength modifier'}
        /> +
        <NumberInput
          value={-sizeModifier}
          label={'size modifier'}
        />
      </div>
      <div>
        Combat Maneuver Defense:
        <NumberInput
          value={combatManeuverDefense}
          label={'total'}
        /> =
        <NumberInput
          value={combatValues.attackBonuses.baseAttackBonus}
          label={'base attack bonus'}
        /> +
        <NumberInput
          value={abilityModifiers.strength}
          label={'strength modifier'}
        /> +
        <NumberInput
          value={abilityModifiers.dexterity}
          label={'dexterity modifier'}
        /> +
        <NumberInput
          value={-sizeModifier}
          label={'size modifier'}
        /> +
        <NumberInput
          value={10}
        />
      </div>
    </div>
  </div>
})
