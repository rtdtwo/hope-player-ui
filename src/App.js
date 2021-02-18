import React, { useState } from 'react';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Sidebar from './components/sidebar'
import Library from './pages/library'
import AddSong from './components/addsong'
import EditSong from './components/editsong'
import AboutModal from './components/about'
import GlobalState from './contexts/GlobalState'
import 'bootstrap/dist/css/bootstrap.min.css';
import Controller from './components/controller';
import Navbar from './components/navbar';
import { isMobile } from './utils/utils';
import config from './config.json'
import blackTextLogo from './assets/logo-black.svg';

const App = () => {

  const [state, setState] = useState({
    queue: [],
    currentSong: null
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);
  const [songToEdit, setSongToEdit] = useState(null);

  const showEditModal = (song) => {
    setCurrentPage(<div/>);
    setModalEdit(true);
    setSongToEdit(song);
    setShowAddModal(true);
  }

  const libraryPage = <Library showEditModal={showEditModal} />;
  const [currentPage, setCurrentPage] = useState(libraryPage);

  const openAddModal = () => {
    setCurrentPage(<div/>);
    setModalEdit(false);
    setSongToEdit(null);
    setShowAddModal(true);
  }

  const hideAddModal = () => {
    setCurrentPage(libraryPage)
    setModalEdit(false);
    setSongToEdit(null);
    setShowAddModal(false);
  }

  const openAboutModal = () => {
    setShowAboutModal(true);
  }

  const closeAboutModal = () => {
    setShowAboutModal(false);
  }

  const changeScreen = (screenIndex) => {
    switch (screenIndex) {
      case 0:
        if (currentPage !== libraryPage) {
          setCurrentPage(libraryPage);
        }
        break;
      case 2:
        config.editAccess ? openAddModal() : alert('Disabled')
        break;
      case 3:
        openAboutModal();
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

  const addSongModal = config.editAccess ? (
    <Modal show={showAddModal} onHide={() => hideAddModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{isModalEdit ? 'Edit Song' : 'Add Song'}</Modal.Title>
      </Modal.Header>
      {
        isModalEdit
          ? <EditSong song={songToEdit} hideAddModal={hideAddModal} />
          : <AddSong hideAddModal={hideAddModal} />
      }
    </Modal>
  ) : (<div />)

  const aboutModal = (
    <Modal show={showAboutModal} onHide={() => closeAboutModal()}>
      <Modal.Header closeButton>
        <img src={blackTextLogo} alt="" width="180px" />
      </Modal.Header>
      <AboutModal />
    </Modal>
  )

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

      {addSongModal}
      {aboutModal}

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
