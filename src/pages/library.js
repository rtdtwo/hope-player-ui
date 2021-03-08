import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Modal, Button } from 'react-bootstrap';
import { getLibrary, addToLibrary } from '../api/manager';
import SongList from '../components/SongList';
import { blankSong } from '../utils/constants';
import { editAccess } from '../config.json';
import AddIcon from '../assets/add.svg';

const Library = () => {
    const [library, setLibrary] = useState([]);
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
        <div className="page-root library-container">
            {addSongModal}
            <Row className="mt-5 ml-5 mr-5 mb-0 bottom-border">
                <Col className="m-0 p-0 align-self-center">
                    <h3 className="page-headline">Your Library</h3>
                </Col>
                {editAccess ?
                    <Col className="m-0 p-0 align-self-center" md="auto">
                        <img className="pointer-cursor mr-2" src={AddIcon} width="20px" onClick={() => setShowAddModal(true)} />
                    </Col>
                    : ""}
            </Row>
            <div className="song-list-container pl-4">
                <SongList playlist={library} />
            </div>
        </div>
    );
}

export default Library;