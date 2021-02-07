import React from 'react'

import { Provider } from 'react-redux'
import { store } from './store'
import { CharacterSheet } from './components/CharacterSheet/CharacterSheet'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

const App: React.FC = () => {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <CharacterSheet />
      </Provider>
    </PersistGate>
  )
}

export default App
