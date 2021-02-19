import React, { useState } from 'react';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './components/sidebar'
import Library from './pages/library'
import About from './pages/about'
import GlobalState from './contexts/GlobalState'
import 'bootstrap/dist/css/bootstrap.min.css';
import Controller from './components/controller';
import Navbar from './components/navbar';
import { isMobile } from './utils/utils';

const App = () => {

  const [state, setState] = useState({
    queue: [],
    currentSong: null
  });

  const libraryPage = <Library />;
  const aboutPage = <About />;
  const [currentPage, setCurrentPage] = useState(libraryPage);

  const changeScreen = (screenIndex) => {
    switch (screenIndex) {
      case 0:
        if (currentPage !== libraryPage) {
          setCurrentPage(libraryPage);
        }
        break;
      case 2:
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
        <Col className="page m-0 p-3">
          {currentPage}
        </Col>
      </Row>

    </div>
  )

  const mobileView = (
    <div class="mobile-view">
      <Navbar />
      <div className="p-3" style={mobilePageStyle}>
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
