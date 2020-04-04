import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { DisplayCharacterMetaData } from './DisplayCharacterMetaData'
import React from 'react'
import { rootReducer } from '../../store/root-reducer'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()
export const createMockMetadataForm = () => {
  const store = mockStore(rootReducer())
  return render(
    <Provider store={store}>
      <DisplayCharacterMetaData />
    </Provider>,
  )
}
