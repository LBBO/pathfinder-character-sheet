import React, { useCallback } from 'react'
import { RootState } from '../../store/root-reducer'
import {
  getArmor,
  getTotalArmorCheckPenalty,
  getTotalArmorItemBonus,
  getTotalArmorSpellFailure,
  getTotalArmorWeight,
} from '../../store/Inventory/getters'
import { armorActions } from '../../store/Inventory/actions'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { NumberInput } from '../util/NumberInput'
import { Armor } from '../../store/Inventory/reducers'
import { InvertedBorderRadius } from '../InvertedBorderRadius/InvertedBorderRadius'
import './DisplayArmorItems.scss'

const DisplayArmorItem = ({
  index,
  armorItem,
  onChange,
}: {
  index: number
  armorItem: Armor
  onChange: (index: number, newArmorItem: Armor) => void
}) => {
  const useStringPropertyChangeHandler = (propertyName: keyof Armor) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(index, {
      ...armorItem,
      [propertyName]: event.target.value,
    })
  }
  const useNumberPropertyChangeHandler = (propertyName: keyof Armor) => (
    newValue: number | undefined,
  ) => {
    onChange(index, {
      ...armorItem,
      [propertyName]: newValue,
    })
  }

  return (
    <>
      <input
        className={'input name'}
        value={armorItem.name ?? ''}
        onChange={useStringPropertyChangeHandler('name')}
      />
      <NumberInput
        className={'input bonus'}
        onChange={useNumberPropertyChangeHandler('armorBonus')}
        value={armorItem.armorBonus}
      />
      <input
        className={'input type'}
        value={armorItem.type ?? ''}
        onChange={useStringPropertyChangeHandler('type')}
      />
      <NumberInput
        className={'input check-penalty'}
        onChange={useNumberPropertyChangeHandler('checkPenalty')}
        value={armorItem.checkPenalty}
      />
      <NumberInput
        className={'input spell-failure'}
        onChange={useNumberPropertyChangeHandler('spellFailure')}
        value={armorItem.spellFailure}
      />
      <NumberInput
        className={'input weight'}
        onChange={useNumberPropertyChangeHandler('weight')}
        value={armorItem.weight}
      />
      <input
        className={'input properties'}
        value={armorItem.properties ?? ''}
        onChange={useStringPropertyChangeHandler('properties')}
      />
    </>
  )
}

const emptyArmorItem: Armor = {
  name: '',
  properties: '',
  type: '',
}

const mapStateToProps = (state: RootState) => ({
  armor: getArmor(state),
  totalArmorBonus: getTotalArmorItemBonus(state),
  totalCheckPenalty: getTotalArmorCheckPenalty(state),
  totalSpellFailure: getTotalArmorSpellFailure(state),
  totalWeight: getTotalArmorWeight(state),
})
const connector = connect(mapStateToProps, armorActions)

export const DisplayArmorItems = connector(
  ({
    armor,
    addArmorItem,
    editArmorItem,
    deleteArmorItem,
    insertArmorItemAtIndex,
    totalArmorBonus,
    totalCheckPenalty,
    totalSpellFailure,
    totalWeight,
  }: ConnectedProps<typeof connector>) => {
    const { t } = useTranslation()
    const onChangeGearItem = useCallback(
      (index: number, newArmorItem: Armor) => {
        if (index === armor.length) {
          addArmorItem(newArmorItem)
        } else if (
          index === armor.length - 1 &&
          newArmorItem.name === '' &&
          newArmorItem.armorBonus === undefined &&
          newArmorItem.type === '' &&
          newArmorItem.checkPenalty === undefined &&
          newArmorItem.spellFailure === undefined &&
          newArmorItem.weight === undefined &&
          newArmorItem.properties === ''
        ) {
          deleteArmorItem(index)
        } else {
          editArmorItem({ newArmorItem, oldArmorItemIndex: index })
        }
      },
      [addArmorItem, armor.length, deleteArmorItem, editArmorItem],
    )

    return (
      <div className={'armor-items'}>
        <div className={'spacer'} />
        <InvertedBorderRadius
          className={'title'}
          enableHalfHeightBorders
          fillCorners={{ 'bottom-right': true }}
        >
          {t('inventory.armor.title')}
        </InvertedBorderRadius>
        <span className={'header bonus'}>{t('inventory.armor.bonus')}</span>
        <span className={'header type'}>{t('inventory.armor.type')}</span>
        <span className={'header check-penalty'}>
          {t('inventory.armor.checkPenalty')}
        </span>
        <span className={'header spell-failure'}>
          {t('inventory.armor.spellFailure')}
        </span>
        <span className={'header weight'}>{t('inventory.armor.weight')}</span>
        <span className={'header properties'}>
          {t('inventory.armor.properties')}
        </span>
        {[...armor, emptyArmorItem].map((armorItem, index) => (
          <DisplayArmorItem
            key={index}
            index={index}
            armorItem={armorItem}
            onChange={onChangeGearItem}
          />
        ))}
        <span className={'header total'}>{t('general.total')}</span>
        <NumberInput
          className={'input armor-bonus'}
          value={totalArmorBonus}
          readOnly
          disabled
        />
        <input className={'input type'} value={''} readOnly disabled />
        <NumberInput
          className={'input check-penalty'}
          value={totalCheckPenalty}
          readOnly
          disabled
        />
        <NumberInput
          className={'input spell-failure'}
          value={totalSpellFailure}
          readOnly
          disabled
        />
        <NumberInput
          className={'input weight'}
          value={totalWeight}
          readOnly
          disabled
        />
        <input className={'input properties'} value={''} readOnly disabled />
      </div>
    )
  },
)
