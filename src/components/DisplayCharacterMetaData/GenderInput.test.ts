import { CharacterGender } from '../../store/CharacterMetaData/Character'
import { GenderInputTestIds } from './DisplayCharacterMetaData'
import * as CharacterMetadataActions from '../../store/CharacterMetaData/actions'
import { expectClickOnNthButtonToSetValue } from './MetadataSelect/MetadataSelect.test'
import { createMockMetadataForm } from './createMockMetadataForm'

describe('Gender input field', () => {
  // Initial definition just so that the type is set correctly
  let characterMetadataForm = createMockMetadataForm()
  let onChangeHandler: jest.SpyInstance

  beforeEach(() => {
    onChangeHandler = jest.spyOn(CharacterMetadataActions, 'setCharacterGender')

    characterMetadataForm = createMockMetadataForm()
  })

  afterEach(() => {
    onChangeHandler.mockRestore()
  })

  it('should render successfully', () => {
    expect(
      characterMetadataForm.getByTestId(GenderInputTestIds.wrapper),
    ).toBeInTheDocument()
  })

  it('should render a select element with 4 children', () => {
    const select = characterMetadataForm.getByTestId(GenderInputTestIds.select)
    expect(select).toBeInTheDocument()
    expect(select.children.length).toBe(4)
  })

  describe('should call the onChange handler', () => {
    it('with undefined when the first option is clicked', () => {
      expectClickOnNthButtonToSetValue(
        characterMetadataForm,
        onChangeHandler,
        0,
        undefined,
        GenderInputTestIds.select,
      )
    })

    it('with male when the first option is clicked', () => {
      expectClickOnNthButtonToSetValue(
        characterMetadataForm,
        onChangeHandler,
        1,
        CharacterGender.MALE,
        GenderInputTestIds.select,
      )
    })

    it('with female when the second option is clicked', () => {
      expectClickOnNthButtonToSetValue(
        characterMetadataForm,
        onChangeHandler,
        2,
        CharacterGender.FEMALE,
        GenderInputTestIds.select,
      )
    })

    it('with other when the third option is clicked', () => {
      expectClickOnNthButtonToSetValue(
        characterMetadataForm,
        onChangeHandler,
        3,
        CharacterGender.OTHER,
        GenderInputTestIds.select,
      )
    })
  })

  it('should focus on the select when the label is clicked', () => {
    const labelTarget = characterMetadataForm.getByLabelText(/gender/gim)
    expect(labelTarget.tagName).toMatch(/select/i)
    expect(labelTarget.getAttribute('data-testid')).toBe(
      GenderInputTestIds.select,
    )
  })
})
