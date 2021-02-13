import {
  Alignment,
  Ethics,
  Morality,
} from '../../store/CharacterMetaData/Alignment'
import { AlignmentInputTestIds } from './DisplayCharacterMetaData'
import * as CharacterMetadataActions from '../../store/CharacterMetaData/actions'
import { createMockMetadataForm } from './createMockMetadataForm'
import { expectClickOnNthButtonToSetValue } from './MetadataSelect/MetadataSelect.test'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage(): Promise<Function> {
        return new Promise(() => {})
      },
    },
  }),
}))

afterAll(() => {
  jest.resetModules()
})

describe('Alignment input field', () => {
  // Initial definition just so that the type is set correctly
  let characterMetadataForm = createMockMetadataForm()
  let onChangeHandler: jest.SpyInstance
  beforeEach(() => {
    onChangeHandler = jest.spyOn(
      CharacterMetadataActions,
      'setCharacterAlignment',
    )

    characterMetadataForm = createMockMetadataForm()
  })

  afterEach(() => {
    onChangeHandler.mockRestore()
  })

  it('should render successfully', () => {
    expect(
      characterMetadataForm.getByTestId(AlignmentInputTestIds.wrapper),
    ).toBeInTheDocument()
  })

  it('should render a select element with 10 children (9 options + empty)', () => {
    const select = characterMetadataForm.getByTestId(
      AlignmentInputTestIds.select,
    )
    expect(select).toBeInTheDocument()
    expect(select.children.length).toBe(10)
  })

  describe('should call the onChange handler', () => {
    it('with undefined when the first option is clicked', () => {
      expectClickOnNthButtonToSetValue(
        characterMetadataForm,
        onChangeHandler,
        0,
        undefined,
        AlignmentInputTestIds.select,
      )
    })

    it('with law good when the second option is clicked', () => {
      const lawGood: Alignment = {
        ethics: Ethics.LAW,
        morality: Morality.GOOD,
      }

      expectClickOnNthButtonToSetValue(
        characterMetadataForm,
        onChangeHandler,
        1,
        lawGood,
        AlignmentInputTestIds.select,
      )
    })
  })

  it('should focus on the select when the label is clicked', () => {
    const labelTarget = characterMetadataForm.getByLabelText(/alignment/gim)
    expect(labelTarget.tagName).toMatch(/select/i)
    expect(labelTarget.getAttribute('data-testid')).toBe(
      AlignmentInputTestIds.select,
    )
  })
})
