import React, { useState } from 'react';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './components/sidebar'
import Library from './pages/library'
import AddSong from './pages/addsong'

import GlobalState from './contexts/GlobalState'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [state, setState] = useState({
    queue: [],
    currentSong: null
  });  

  const libraryPage = (<Library />)

  const [currentPage, setCurrentPage] = useState((libraryPage))

  const changeScreen = (screenIndex) => {
    switch (screenIndex) {
      case 0:
        setCurrentPage(libraryPage);
        break;
      case 3:
        setCurrentPage((<AddSong />));
        break;
      default:
        setCurrentPage((<div></div>));
        break;
    }
  }

  return (
    <div className="App">
      <GlobalState.Provider value={[state, setState]}>
        <Row className="m-0 p-0">
          <Col sm="auto" className="m-0 p-0">
            <Sidebar
              changeScreen={changeScreen} />
          </Col>
          <Col className="page-container">
            {currentPage}
          </Col>
        </Row>
        <div className="align_bottom">
        </div>
      </GlobalState.Provider>
    </div>
  );
}

export default App;
