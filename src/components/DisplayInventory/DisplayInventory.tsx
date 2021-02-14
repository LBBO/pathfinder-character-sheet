import React, { useCallback } from 'react'
import { RootState } from '../../store/root-reducer'
import * as InventoryActions from '../../store/Inventory/actions'
import { connect, ConnectedProps } from 'react-redux'
import { getWeapons } from '../../store/Inventory/getters'
import { useTranslation } from 'react-i18next'
import { generateEmptyWeapon, Weapon } from '../../store/Inventory/reducers'
import './DisplayInventory.scss'
import { InvertedBorderRadius } from '../InvertedBorderRadius/InvertedBorderRadius'
import { NumberInput } from '../util/NumberInput'
import { StyledCheckbox } from '../util/StyledCheckbox/StyledCheckbox'
import { DisplayGear } from './DisplayGear'
import { DisplayArmorItems } from './DisplayArmorItems'

const mapStateToProps = (state: RootState) => ({
  weapons: getWeapons(state),
})

const mapDispatchToProps = InventoryActions
const connector = connect(mapStateToProps, mapDispatchToProps)

export const DisplayInventory = connector(
  ({
    weapons,
    addWeapon,
    editWeapon,
    deleteWeapon,
  }: ConnectedProps<typeof connector>) => {
    const { t } = useTranslation()

    const onCreateNewWeapon = useCallback(() => {
      addWeapon(generateEmptyWeapon())
    }, [addWeapon])

    return (
      <div className={'inventory'}>
        <div className={'weapons'}>
          {weapons.map((weapon, weaponIndex) => (
            <div className={'weapon'} key={weaponIndex}>
              <div className={'header-container'}>
                <InvertedBorderRadius
                  className={'header'}
                  fillCorners={{
                    'bottom-right': true,
                  }}
                  enableHalfHeightBorders
                >
                  {t('inventory.weapons.title')}
                  <span
                    className={'delete-weapon'}
                    onClick={() => deleteWeapon(weaponIndex)}
                  >
                    ❌
                  </span>
                </InvertedBorderRadius>
              </div>
              <input
                className={'input name-input'}
                value={weapon.name}
                onChange={(e) =>
                  editWeapon({
                    oldWeaponIndex: weaponIndex,
                    newWeapon: { ...weapon, name: e.target.value },
                  })
                }
              />
              <span className={'title attack-bonus-title'}>
                {t('inventory.weapons.attackBonus')}
              </span>
              <input
                className={'input attack-bonus-input'}
                value={weapon.attackBonus}
                onChange={(e) =>
                  editWeapon({
                    oldWeaponIndex: weaponIndex,
                    newWeapon: {
                      ...weapon,
                      attackBonus: e.target.value,
                    },
                  })
                }
              />
              <span className={'title critical-hit-title'}>
                {t('inventory.weapons.criticalHit')}
              </span>
              <div className="input critical-hit-input">
                <label>
                  <span style={{ textTransform: 'lowercase' }}>x</span>
                  <NumberInput
                    value={weapon.criticalAttackProperties.multiplier}
                    onChange={(value) =>
                      editWeapon({
                        oldWeaponIndex: weaponIndex,
                        newWeapon: {
                          ...weapon,
                          criticalAttackProperties: {
                            ...weapon.criticalAttackProperties,
                            multiplier: value,
                          },
                        },
                      })
                    }
                  />
                </label>
                &nbsp;/ &nbsp;
                <label>
                  <NumberInput
                    value={weapon.criticalAttackProperties.minDieValue}
                    onChange={(value) =>
                      editWeapon({
                        oldWeaponIndex: weaponIndex,
                        newWeapon: {
                          ...weapon,
                          criticalAttackProperties: {
                            ...weapon.criticalAttackProperties,
                            minDieValue: value,
                          },
                        },
                      })
                    }
                  />
                  - 20
                </label>
              </div>
              <span className={'title type-title'}>
                {t('inventory.weapons.type.title')}
              </span>
              <div className="input type-input">
                {(['bludgeoning', 'slashing', 'piercing'] as Array<
                  keyof Weapon['type']
                >)
                  .sort((a, b) =>
                    t(`inventory.weapons.type.${a}.short`).localeCompare(
                      t(`inventory.weapons.type.${b}.short`),
                    ),
                  )
                  .map((key) => (
                    <label
                      key={key}
                      title={t(`inventory.weapons.type.${key}.long`)}
                    >
                      {t(`inventory.weapons.type.${key}.short`)}&nbsp;
                      <StyledCheckbox
                        checked={weapon.type[key]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          editWeapon({
                            oldWeaponIndex: weaponIndex,
                            newWeapon: {
                              ...weapon,
                              type: {
                                ...weapon.type,
                                [key]: e.target.checked,
                              },
                            },
                          })
                        }
                      />
                    </label>
                  ))}
              </div>
              <span className={'title range-title'}>
                {t('inventory.weapons.range')}
              </span>
              <NumberInput
                className={'input range-input'}
                value={weapon.range}
                onChange={(value) =>
                  editWeapon({
                    oldWeaponIndex: weaponIndex,
                    newWeapon: {
                      ...weapon,
                      range: value,
                    },
                  })
                }
              />
              <span className={'title ammunition-title'}>
                {t('inventory.weapons.ammunition')}
              </span>
              <input
                className={'input ammunition-input'}
                value={weapon.ammunition}
                onChange={(e) =>
                  editWeapon({
                    oldWeaponIndex: weaponIndex,
                    newWeapon: { ...weapon, ammunition: e.target.value },
                  })
                }
              />
              <span className={'title damage-title'}>
                {t('inventory.weapons.damage')}
              </span>
              <input
                className={'input damage-input'}
                value={weapon.damage}
                onChange={(e) =>
                  editWeapon({
                    oldWeaponIndex: weaponIndex,
                    newWeapon: { ...weapon, damage: e.target.value },
                  })
                }
              />
            </div>
          ))}
          <button onClick={onCreateNewWeapon}>Neue Waffe</button>
        </div>
        <DisplayArmorItems />
        <DisplayGear />
      </div>
    )
  },
)
