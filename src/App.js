import React, { useState } from 'react';
import './App.css';
import GlobalState from './contexts/GlobalState'

import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './components/Root';
import { REPEAT_MODE } from './utils/constants'

const App = () => {

  const [state, setState] = useState({
    queue: [],
    currentSong: null,
    originalQueue: [],
    shuffleOn: false,
    repeatMode: REPEAT_MODE.NONE
  });

  return (
    <div className="App">
      <GlobalState.Provider value={[state, setState]}>
        <Root />
      </GlobalState.Provider>
    </div>
  );
}

export default App;
