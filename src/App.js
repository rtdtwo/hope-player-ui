import React, { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './components/sidebar'
import Library from './pages/library'
import AddSong from './pages/addsong'
import GlobalState from './contexts/GlobalState'
import 'bootstrap/dist/css/bootstrap.min.css';
import Controller from './components/controller';
import Navbar from './components/navbar';

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

  const mobilePageStyle = {
    height: window.innerHeight - 64 - 64,
    background: "#353b48",
    overflowX: "hidden",
    overflowY: "scroll",
}

return (
  <div className="App">
    <GlobalState.Provider value={[state, setState]}>
      <BrowserView>
        <Row className="m-0 p-0">
          <Col sm="auto" className="m-0 p-0">
            <Sidebar
              changeScreen={changeScreen} />
          </Col>
          <Col className="page m-0 p-3">
            {currentPage}
          </Col>
        </Row>
      </BrowserView>
      <MobileView>
        <div class="mobile-view">
          <Navbar />
          <div className="p-3" style={mobilePageStyle}>
            {currentPage}
          </div>
          <Controller mobile="true" className="align_bottom" />
        </div>
      </MobileView>
    </GlobalState.Provider>
  </div>
);
}

export default App;
