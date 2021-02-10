import React, { useState } from 'react';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './components/sidebar'
import Library from './pages/library'
import AddSong from './pages/addsong'
import { getStreamingUrl } from './api/manager'


import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const playSong = (song) => {
    setCurrentSong(song);
    getStreamingUrl(song.id).then(response => {
      if (response.status === 200) {
        const streamUrl = response.data.result;
        setCurrentStreamingUrl(streamUrl)
      }
    });
  }

  const libraryPage = (<Library handleSongClick={playSong} />)

  const [currentSong, setCurrentSong] = useState({
    id: -1,
    art: "",
    name: "No song selected",
    artist: "Play from your library"
  });

  const [currentStreamingUrl, setCurrentStreamingUrl] = useState(null);

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
      <Row className="m-0 p-0">
        <Col sm="auto" className="m-0 p-0">
          <Sidebar
            changeScreen={changeScreen}
            currentSong={currentSong}
            streamUrl={currentStreamingUrl} />
        </Col>
        <Col className="page-container">
          {currentPage}
        </Col>
      </Row>
      <div className="align_bottom">
      </div>
    </div>
  );
}

export default App;
