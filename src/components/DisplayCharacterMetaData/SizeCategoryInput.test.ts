import { SizeCategory } from '../../store/CharacterMetaData/Character'
import { SizeCategoryInputTestIds } from './DisplayCharacterMetaData'
import { expectClickOnNthButtonToSetValue } from './MetadataSelect/MetadataSelect.test'
import * as CharacterMetadataActions from '../../store/CharacterMetaData/actions'
import { createMockMetadataForm } from './createMockMetadataForm'

describe('Size category input field', () => {
  let characterMetadataForm = createMockMetadataForm()
  let onChangeHandler: jest.SpyInstance

  beforeEach(() => {
    onChangeHandler = jest.spyOn(
      CharacterMetadataActions,
      'setCharacterSizeCategory',
    )

    characterMetadataForm = createMockMetadataForm()
  })

  afterEach(() => {
    onChangeHandler.mockRestore()
  })

  it('should render successfully', () => {
    expect(
      characterMetadataForm.getByTestId(SizeCategoryInputTestIds.wrapper),
    ).toBeInTheDocument()
  })

  it('should render a select element with 3 children', () => {
    const select = characterMetadataForm.getByTestId(
      SizeCategoryInputTestIds.select,
    )
    expect(select).toBeInTheDocument()
    expect(select.children.length).toBe(3)
  })

  describe('should call the onChange handler', () => {
    it('with small when the first option is clicked', () => {
      expectClickOnNthButtonToSetValue(
        characterMetadataForm,
        onChangeHandler,
        0,
        SizeCategory.SMALL,
        SizeCategoryInputTestIds.select,
      )
    })

    it('with medium when the second option is clicked', () => {
      expectClickOnNthButtonToSetValue(
        characterMetadataForm,
        onChangeHandler,
        1,
        SizeCategory.MEDIUM,
        SizeCategoryInputTestIds.select,
      )
    })

    it('with large when the third option is clicked', () => {
      expectClickOnNthButtonToSetValue(
        characterMetadataForm,
        onChangeHandler,
        2,
        SizeCategory.LARGE,
        SizeCategoryInputTestIds.select,
      )
    })
  })

  it('should focus on the select when the label is clicked', () => {
    const labelTarget = characterMetadataForm.getByLabelText(/size category/gim)
    expect(labelTarget.tagName).toMatch(/select/i)
    expect(labelTarget.getAttribute('data-testid')).toBe(
      SizeCategoryInputTestIds.select,
    )
  })
})
