import React, { useCallback, useRef } from 'react'
import { RootState } from '../../store/root-reducer'
import { getGear } from '../../store/Inventory/getters'
import { gearActions } from '../../store/Inventory/actions'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { NumberInput } from '../util/NumberInput'
import { GearItem } from '../../store/Inventory/reducers'
import { InvertedBorderRadius } from '../InvertedBorderRadius/InvertedBorderRadius'
import './DisplayGear.scss'

export const gearNameInputTestID = 'gear-name-input'
export const gearWeightInputTestID = 'gear-weight-input'

const DisplayGearItem = ({
  index,
  gearItem,
  onChange,
  onPressEnter,
}: {
  index: number
  gearItem: GearItem
  onChange: (index: number, newGearItem: GearItem) => void
  onPressEnter?: (index: number) => void
}) => {
  const onChangeWeight = useCallback(
    (newWeight: number | undefined) => {
      onChange(index, {
        ...gearItem,
        weight: newWeight,
      })
    },
    [gearItem, index, onChange],
  )
  const onChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(index, {
        ...gearItem,
        name: event.target.value,
      })
    },
    [gearItem, index, onChange],
  )

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onPressEnter?.(index)
      }
    },
    [index, onPressEnter],
  )

  return (
    <>
      <input
        className={'name-input'}
        value={gearItem.name}
        onChange={onChangeName}
        data-testid={gearNameInputTestID}
        onKeyPress={onKeyPress}
      />
      <NumberInput
        className={'weight-input'}
        onChange={onChangeWeight}
        value={gearItem.weight}
        data-testid={gearWeightInputTestID}
        onKeyPress={onKeyPress}
      />
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  gear: getGear(state),
})
const connector = connect(mapStateToProps, gearActions)

export const DisplayGear = connector(
  ({
    addGearItem,
    insertGearItemAtIndex,
    editGearItem,
    deleteGearItem,
    gear,
  }: ConnectedProps<typeof connector>) => {
    const { t } = useTranslation()
    const onChangeGearItem = useCallback(
      (index: number, newGearItem: GearItem) => {
        if (index === gear.length) {
          addGearItem(newGearItem)
        } else if (
          index === gear.length - 1 &&
          newGearItem.name === '' &&
          newGearItem.weight === undefined
        ) {
          deleteGearItem(index)
        } else {
          editGearItem({
            oldGearItemIndex: index,
            newGearItem,
          })
        }
      },
      [addGearItem, deleteGearItem, editGearItem, gear.length],
    )

    const containerRef = useRef<HTMLDivElement>(null)
    const onPressEnter = useCallback(
      (index: number) => {
        // Insert after item, where enter was pressed
        insertGearItemAtIndex(index + 1)
        const el = containerRef.current?.querySelectorAll(`.name-input`)[
          index + 1
        ] as HTMLInputElement | undefined
        el?.focus()
      },
      [insertGearItemAtIndex],
    )

    return (
      <div ref={containerRef} className={'gear-items'}>
        <InvertedBorderRadius className={'title'} enableHalfHeightBorders>
          {t('inventory.gear.title')}
        </InvertedBorderRadius>
        <span className={'header name'}>{t('inventory.gear.item')}</span>
        <span className={'header weight'}>{t('inventory.gear.weight')}</span>
        {[...gear, { name: '' }].map((gearItem, index) => (
          <DisplayGearItem
            key={index}
            index={index}
            gearItem={gearItem}
            onChange={onChangeGearItem}
            onPressEnter={onPressEnter}
          />
        ))}
      </div>
    )
  },
)
