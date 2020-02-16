import React from 'react';

import { Provider } from 'react-redux'
import { store } from './store'
import { CharacterSheet } from './components/CharacterSheet/CharacterSheet'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CharacterSheet/>
    </Provider>
  );
}

export default App;
