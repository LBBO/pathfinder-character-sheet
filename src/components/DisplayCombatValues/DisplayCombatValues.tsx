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
import { useTranslation } from 'react-i18next'
import { getTotalArmorItemBonus } from '../../store/Inventory/getters'

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
  armorBonus: getTotalArmorItemBonus(state),
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
    armorBonus,
    combatManeuverBonus,
    combatManeuverDefense,
    setBaseSave,
    setSavingThrowMagicModifier,
    setMiscSavingThrowModifier,
    setTemporarySavingThrowModifier,
    setBaseAttackBonus,
    setSpellResistance,
  }: Props) => {
    const { t } = useTranslation()
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
      <>
        <div className={'initiative'} data-testid={'initiative-container'}>
          <BlackBox>
            {t('combatValues.initiative.long')}
            <aside>{t('general.modifier.long')}</aside>
          </BlackBox>
          <BoxNumberInput
            value={totalInitiativeBonus}
            label={t('general.total')}
            testId={'initiative-total-bonus'}
          />
          =
          <BoxNumberInput
            value={abilityModifiers.dexterity}
            label={`${t('abilities.dexterity.short')}. ${t(
              'general.modifier.short',
            )}.`}
            testId={'initiative-dexterity-modifier'}
          />
          +
          <BoxNumberInput
            onChange={callIfDefined(setInitiativeMiscModifier)}
            value={combatValues.initiative.miscModifier}
            label={`${t('general.misc.short')}. ${t(
              'general.modifier.short',
            )}.`}
            testId={'initiative-misc-modifier'}
          />
        </div>
        <div className={'combat-values-wrapper'}>
          <div className={'armor-class'}>
            <BlackBox>
              {t('combatValues.armorClass.short')}
              <aside>{t('combatValues.armorClass.long')}</aside>
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
              readOnly
            />
            +
            <BoxNumberInput
              value={armorBonus}
              readOnly
              label={`${t('combatValues.armorBonus')}-${t('general.bonus')}`}
              testId={'armor-class-armor-bonus'}
            />
            +
            <BoxNumberInput
              onChange={callIfDefined(setShieldBonus)}
              value={combatValues.armorClass.shieldBonus}
              label={`${t('combatValues.shield')}-${t('general.bonus')}`}
              testId={'armor-class-shield-bonus'}
            />
            +
            <BoxNumberInput
              value={abilityModifiers.dexterity}
              label={`${t('abilities.dexterity.short')}-${t(
                'general.modifier.short',
              )}.`}
              testId={'armor-class-dexterity-mod'}
            />
            +
            <BoxNumberInput
              value={sizeModifier}
              label={`${t('combatValues.sizeModifier')}-${t(
                'general.modifier.short',
              )}.`}
              testId={'armor-class-size-modifier'}
            />
            +
            <BoxNumberInput
              onChange={callIfDefined(setNaturalArmor)}
              value={combatValues.armorClass.naturalArmor}
              label={t('combatValues.naturalArmor')}
              testId={'armor-class-natural-armor'}
            />
            +
            <BoxNumberInput
              onChange={callIfDefined(setDeflectionModifier)}
              value={combatValues.armorClass.deflectionModifier}
              label={`${t('combatValues.deflectionModifier')}.-${t(
                'general.modifier.short',
              )}.`}
              testId={'armor-class-deflection-modifier'}
            />
            +
            <BoxNumberInput
              onChange={callIfDefined(setMiscArmorModifier)}
              value={combatValues.armorClass.miscModifier}
              label={`${t('general.misc.short')}.-${t(
                'general.modifier.short',
              )}.`}
              testId={'armor-class-misc-modifier'}
            />
          </div>
          <div className={'touch-armor-class'}>
            <BlackBox>
              {t('combatValues.touch')}
              <aside>{t('combatValues.armorClass.long')}</aside>
            </BlackBox>
            <BoxNumberInput
              value={touchArmorClass}
              testId={'touch-armor-class'}
            />
          </div>
          <div className={'flat-footed-armor-class'}>
            <BlackBox>
              {t('combatValues.flatFooted')}
              <aside>{t('combatValues.armorClass.long')}</aside>
            </BlackBox>
            <BoxNumberInput
              value={flatFootedArmorClass}
              testId={'flat-footed-class'}
            />
          </div>
          <div className={'saving-throws'}>
            {(Object.keys(combatValues.savingThrows) as Array<
              keyof SavingThrowsState
            >)
              .sort((nameA, nameB) =>
                t(`combatValues.savingThrows.${nameA}`).localeCompare(
                  t(`combatValues.savingThrows.${nameB}`),
                ),
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

                return (
                  <React.Fragment key={index}>
                    <BlackBox>
                      {t(`combatValues.savingThrows.${savingThrowName}`)}
                      <aside>({t(`abilities.${baseAbilityName}.long`)})</aside>
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
            <InvertedBorderRadius>
              {t('combatValues.baseAttackBonus.long')}
            </InvertedBorderRadius>
            <BoxNumberInput
              value={combatValues.attackBonuses.baseAttackBonus}
              onChange={callIfDefined(setBaseAttackBonus)}
            />
          </label>
          <label className={'spell-resistance'}>
            <BlackBox>{t('combatValues.spellResistance')}</BlackBox>
            <BoxNumberInput
              value={combatValues.attackBonuses.spellResistance}
              onChange={callIfDefined(setSpellResistance)}
            />
          </label>
          <div className={'combat-values'}>
            <div className={'combat-bonus'}>
              <InvertedBorderRadius>
                {t('combatValues.combatManeuverBonus.short')}
              </InvertedBorderRadius>
              <BoxNumberInput
                value={combatManeuverBonus}
                label={t('general.total')}
              />
              =
              <BoxNumberInput
                value={combatValues.attackBonuses.baseAttackBonus}
                label={t('combatValues.baseAttackBonus.short')}
              />
              +
              <BoxNumberInput
                value={abilityModifiers.strength}
                label={`${t('abilities.strength.short')}.-${t(
                  'general.modifier.short',
                )}.`}
              />
              +
              <BoxNumberInput
                value={-sizeModifier}
                label={`${t('combatValues.sizeModifier')}-${t(
                  'general.modifier.short',
                )}.`}
              />
            </div>
            <div className={'combat-defense'}>
              <InvertedBorderRadius>
                {t('combatValues.combatManeuverDefense.short')}
              </InvertedBorderRadius>
              <BoxNumberInput
                value={combatManeuverDefense}
                label={t('general.total')}
              />
              =
              <BoxNumberInput
                value={combatValues.attackBonuses.baseAttackBonus}
                label={t('combatValues.baseAttackBonus.short')}
              />
              +
              <BoxNumberInput
                value={abilityModifiers.strength}
                label={`${t('abilities.strength.short')}.-${t(
                  'general.modifier.short',
                )}.`}
              />
              +
              <BoxNumberInput
                value={abilityModifiers.dexterity}
                label={`${t('abilities.dexterity.short')}.-${t(
                  'general.modifier.short',
                )}.`}
              />
              +
              <BoxNumberInput
                value={-sizeModifier}
                label={`${t('combatValues.sizeModifier')}-${t(
                  'general.modifier.short',
                )}.`}
              />
              +
              <BoxNumberInput value={10} hideBox={true} />
            </div>
          </div>
        </div>
      </>
    )
  },
)
