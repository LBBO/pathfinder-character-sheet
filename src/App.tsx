import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import { store } from './store'
import { DisplayCharacterMetaData } from './components/DisplayCharacterMetaData'
import {DisplayAbilities} from './components/DisplayAbilities'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <DisplayCharacterMetaData/>
        <br/>
        <DisplayAbilities/>
      </div>
    </Provider>
  );
}

export default App;
