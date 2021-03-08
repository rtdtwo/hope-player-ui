import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Modal, Button } from 'react-bootstrap';
import { getLibrary, addToLibrary } from '../api/manager';
import SongList from '../components/SongList';
import { blankSong } from '../utils/constants';
import { editAccess } from '../config.json';
import AddIcon from '../assets/add.svg';

const Home = () => {
    const [library, setLibrary] = useState([]);
    const [popularArtists, setPopularArtists] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [addOrEditSongDetails, setAddOrEditSongDetails] = useState(blankSong);

    const getSongs = () => {
        getLibrary().then(response => {
            if (response.status === 200) {
                const data = response.data.results;
                setLibrary(data);
            }
        });
    };

    const popularArtistsList = popularArtists.map(artist => {
        return '';
    });

    const recentlyPlayedList = recentlyPlayed.map(song => {
        return '';
    });

    useEffect(() => {
        getSongs()
    },
        // eslint-disable-next-line
        []);

    const callAddSong = () => {
        if (addOrEditSongDetails.name === "" || addOrEditSongDetails.artist === "" || addOrEditSongDetails.url === "") {
            alert("Song name, artist and YouTube link are required");
        } else {
            addToLibrary(addOrEditSongDetails).then(response => {
                if (response.status === 201) {
                    setShowAddModal(false);
                    getSongs();
                }
            });
        }
    }

    const addSongModal = <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Add Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="eg. Hey Jude" onChange={(e) => {
                    setAddOrEditSongDetails({ ...addOrEditSongDetails, name: e.target.value })
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Artist</Form.Label>
                <Form.Control type="text" placeholder="eg. The Beatles" onChange={(e) => {
                    setAddOrEditSongDetails({ ...addOrEditSongDetails, artist: e.target.value })
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>YouTube Link</Form.Label>
                <Form.Control type="text" placeholder="Full link required" onChange={(e) => {
                    setAddOrEditSongDetails({ ...addOrEditSongDetails, url: e.target.value })
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Add comma separated tags" onChange={(e) => {
                    setAddOrEditSongDetails({ ...addOrEditSongDetails, tags: e.target.value })
                }} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="warning" onClick={() => {
                callAddSong()
            }}>Add</Button>
        </Modal.Footer>
    </Modal>

    return (
        <Row className="page-root m-0 lp-30 rp-30 tp-40">
            {addSongModal}
            <Col className="library-container p-0 m-0 pr-5" md={6}>
                <Row className="pb-3 ml-3 mr-0 bottom-border">
                    <Col className="m-0 p-0">
                        <h3 className="page-headline">Your Library</h3>
                    </Col>
                    {editAccess ?
                        <Col className="m-0 p-0 align-self-center" md="auto">
                            <img className="pointer-cursor mr-2" src={AddIcon} width="16px" onClick={() => setShowAddModal(true)} />
                        </Col>
                        : ""}
                </Row>
                <div className="song-list-container">
                    <SongList playlist={library} />
                </div>
            </Col>
            <Col className="p-0 m-0" md={6}>
                <h3 className="page-headline">Popular Artists</h3>
                <div className="popular-artists-container">
                    {popularArtistsList}
                </div>
                <h3 className="page-headline">Recently Played</h3>
                <div className="song-list-container">
                    {recentlyPlayedList}
                </div>
            </Col>
        </Row>
    );
}

export default Home;