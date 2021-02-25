import React, { useState } from 'react';
import './App.css';
import GlobalState from './contexts/GlobalState'

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { isMobile } from './utils/utils';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Controller from './components/controller';

import Library from './pages/library';
import About from './pages/about';
import Artists from './pages/artists';
import Settings from './pages/settings';

const App = () => {

  const [state, setState] = useState({
    queue: [],
    currentSong: null,
    originalQueue: [],
    shuffleOn: false
  });

  const libraryPage = <Library />;
  const aboutPage = <About />;
  const artistsPage = <Artists />;
  const settingsPage = <Settings />;
  const [currentPage, setCurrentPage] = useState(libraryPage);

  const changeScreen = (screenIndex) => {
    switch (screenIndex) {
      case 0:
        if (currentPage !== libraryPage) {
          setCurrentPage(libraryPage);
        }
        break;
      case 1:
        if (currentPage !== artistsPage) {
          setCurrentPage(artistsPage);
        }
        break;
      case 2:
        if (currentPage !== settingsPage) {
          setCurrentPage(settingsPage);
        }
        break;
      case 3:
        if (currentPage !== aboutPage) {
          setCurrentPage(aboutPage);
        }
        break;
      default:
        setCurrentPage((<div></div>));
        break;
    };
  };

  const mobilePageStyle = {
    height: window.innerHeight - 64 - 64,
    background: "#353b48",
    overflowX: "hidden",
    overflowY: "scroll",
  };

  const browserView = (
    <div>
      <Row className="m-0 p-0">
        <Col sm="auto" className="m-0 p-0">
          <Sidebar
            changeScreen={changeScreen} />
        </Col>
        <Col className="page m-0 p-0">
          {currentPage}
        </Col>
      </Row>

    </div>
  )

  const mobileView = (
    <div class="mobile-view">
      <Navbar changeScreen={changeScreen} />
      <div style={mobilePageStyle}>
        {currentPage}
      </div>
      <Controller mobile="true" className="align_bottom" />
    </div>
  )

  return (
    <div className="App">
      <GlobalState.Provider value={[state, setState]}>
        {isMobile ? mobileView : browserView}
      </GlobalState.Provider>
    </div>
  );
}

export default App;
