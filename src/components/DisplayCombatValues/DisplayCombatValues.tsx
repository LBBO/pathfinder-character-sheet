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
import { BoxNumberInput } from '../BoxInput/BoxNumberInput'
import { InvertedBorderRadius } from '../InvertedBorderRadius/InvertedBorderRadius'
import './DisplayCombatValues.scss'
import { BlackBox } from '../BlackBox/BlackBox'

const callIfDefined: <T>(
  callback: (param: T) => void,
) => (param?: T) => void = (callback) => {
  return (param) => {
    if (param !== undefined) {
      callback(param)
    }
  }
}

const mapStateToProps = (state: RootState) => ({
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
})
const mapDispatchToProps = CombatValueActions
const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const DisplayCombatValues = connector(
  ({
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
        useCallback(
          (newValue?: number) => {
            if (newValue !== undefined) {
              setter(newValue, savingThrowName)
            }
          },
          [savingThrowName, setter],
        ),
      [],
    )

    return (
      <div className={'combat-values-wrapper'}>
        <div className={'initiative'} data-testid={'initiative-container'}>
          <BlackBox>
            Initiative
            <aside>Modifier</aside>
          </BlackBox>
          <BoxNumberInput
            value={totalInitiativeBonus}
            label={'total'}
            testId={'initiative-total-bonus'}
          />
          =
          <BoxNumberInput
            value={abilityModifiers.dexterity}
            label={'dexterity modifier'}
            testId={'initiative-dexterity-modifier'}
          />
          +
          <BoxNumberInput
            onChange={callIfDefined(setInitiativeMiscModifier)}
            value={combatValues.initiative.miscModifier}
            label={'misc modifier'}
            testId={'initiative-misc-modifier'}
          />
        </div>
        <div className={'armor-class'}>
          <BlackBox>
            AC
            <aside>Armor Class</aside>
          </BlackBox>
          <BoxNumberInput
            value={totalArmorClass}
            testId={'total-armor-class'}
          />
          =
          <BoxNumberInput
            value={10}
            testId={'armor-class-general-bonus'}
            hideBox={true}
          />
          +
          <BoxNumberInput
            onChange={callIfDefined(setArmorBonus)}
            value={combatValues.armorClass.armorBonus}
            label={'armor class'}
            testId={'armor-class-armor-bonus'}
          />
          +
          <BoxNumberInput
            onChange={callIfDefined(setShieldBonus)}
            value={combatValues.armorClass.shieldBonus}
            label={'shield bonus'}
            testId={'armor-class-shield-bonus'}
          />
          +
          <BoxNumberInput
            value={abilityModifiers.dexterity}
            label={'dexterity modifier'}
            testId={'armor-class-dexterity-mod'}
          />
          +
          <BoxNumberInput
            value={sizeModifier}
            label={'size modifier'}
            testId={'armor-class-size-modifier'}
          />
          +
          <BoxNumberInput
            onChange={callIfDefined(setNaturalArmor)}
            value={combatValues.armorClass.naturalArmor}
            label={'natural armor'}
            testId={'armor-class-natural-armor'}
          />
          +
          <BoxNumberInput
            onChange={callIfDefined(setDeflectionModifier)}
            value={combatValues.armorClass.deflectionModifier}
            label={'deflection mod'}
            testId={'armor-class-deflection-modifier'}
          />
          +
          <BoxNumberInput
            onChange={callIfDefined(setMiscArmorModifier)}
            value={combatValues.armorClass.miscModifier}
            label={'misc mod'}
            testId={'armor-class-misc-modifier'}
          />
        </div>
        <div className={'touch-armor-class'}>
          <BlackBox>
            Touch
            <aside>Armor Class</aside>
          </BlackBox>
          <BoxNumberInput
            value={touchArmorClass}
            testId={'touch-armor-class'}
          />
        </div>
        <div className={'flat-footed-armor-class'}>
          <BlackBox>
            Flat-Footed
            <aside>Armor Class</aside>
          </BlackBox>
          <BoxNumberInput
            value={flatFootedArmorClass}
            testId={'flat-footed-class'}
          />
        </div>
        <div className={'saving-throws'}>
          {(Object.keys(combatValues.savingThrows) as Array<
            keyof SavingThrowsState
          >).map((savingThrowName, index) => {
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

            return (
              <React.Fragment key={index}>
                <BlackBox>
                  {savingThrowName}
                  <aside>({baseAbilityName})</aside>
                </BlackBox>
                <BoxNumberInput value={savingThrowBonus} />
                =
                <BoxNumberInput
                  value={savingThrow.baseSave}
                  onChange={setForCertainSavingThrow(
                    savingThrowName,
                    setBaseSave,
                  )}
                />
                +
                <BoxNumberInput value={abilityModifier} />
                +
                <BoxNumberInput
                  value={savingThrow.magicModifier}
                  onChange={setForCertainSavingThrow(
                    savingThrowName,
                    setSavingThrowMagicModifier,
                  )}
                />
                +
                <BoxNumberInput
                  value={savingThrow.miscModifier}
                  onChange={setForCertainSavingThrow(
                    savingThrowName,
                    setMiscSavingThrowModifier,
                  )}
                />
                +
                <BoxNumberInput
                  value={savingThrow.temporaryModifier}
                  onChange={setForCertainSavingThrow(
                    savingThrowName,
                    setTemporarySavingThrowModifier,
                  )}
                />
              </React.Fragment>
            )
          })}
        </div>
        <label className={'base-attack-bonus'}>
          <InvertedBorderRadius>Base Attack Bonus</InvertedBorderRadius>
          <BoxNumberInput
            value={combatValues.attackBonuses.baseAttackBonus}
            onChange={callIfDefined(setBaseAttackBonus)}
          />
        </label>
        <label className={'spell-resistance'}>
          <BlackBox>Spell Resistance</BlackBox>
          <BoxNumberInput
            value={combatValues.attackBonuses.spellResistance}
            onChange={callIfDefined(setSpellResistance)}
          />
        </label>
        <div className={'combat-values'}>
          <div className={'combat-bonus'}>
            <InvertedBorderRadius>Combat Maneuver Bonus</InvertedBorderRadius>
            <BoxNumberInput value={combatManeuverBonus} label={'total'} />
            =
            <BoxNumberInput
              value={combatValues.attackBonuses.baseAttackBonus}
              label={'base attack bonus'}
            />
            +
            <BoxNumberInput
              value={abilityModifiers.strength}
              label={'strength modifier'}
            />
            +
            <BoxNumberInput value={-sizeModifier} label={'size modifier'} />
          </div>
          <div className={'combat-defense'}>
            <InvertedBorderRadius>Combat Maneuver Defense</InvertedBorderRadius>
            <BoxNumberInput value={combatManeuverDefense} label={'total'} />
            =
            <BoxNumberInput
              value={combatValues.attackBonuses.baseAttackBonus}
              label={'base attack bonus'}
            />
            +
            <BoxNumberInput
              value={abilityModifiers.strength}
              label={'strength modifier'}
            />
            +
            <BoxNumberInput
              value={abilityModifiers.dexterity}
              label={'dexterity modifier'}
            />
            +
            <BoxNumberInput value={-sizeModifier} label={'size modifier'} />
            +
            <BoxNumberInput value={10} hideBox={true} />
          </div>
        </div>
      </div>
    )
  },
)
