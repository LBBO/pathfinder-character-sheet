import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { DisplayCharacterMetaData } from './DisplayCharacterMetaData'
import React from 'react'
import { EmptyAction, RootReducer } from '../../store/root-reducer'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()
export const createMockMetadataForm = () => {
  const store = mockStore(RootReducer(undefined, EmptyAction))
  return render(
    <Provider store={store}>
      <DisplayCharacterMetaData />
    </Provider>,
  )
}
