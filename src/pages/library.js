import React, { useEffect, useState } from 'react';
import SongList from '../components/songlist';
import { getLibrary } from '../api/manager';
import { addToLibrary, editSong } from '../api/manager'
import config from '../config.json'
import { isMobile } from '../utils/utils'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Library = (props) => {
    // eslint-disable-next-line
    const blankSong = {
        id: "",
        name: "",
        artist: "",
        url: "",
        tags: ""
    };

    const [librarySongs, setLibrarySongs] = useState([])
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [addOrEditSongDetails, setAddOrEditSongDetails] = useState(blankSong);

    const callAddSong = () => {
        if (addOrEditSongDetails.name === "" || addOrEditSongDetails.artist === "" || addOrEditSongDetails.url === "") {
            alert("Song name, artist and YouTube link are required");
        } else {
            addToLibrary(addOrEditSongDetails).then(response => {
                if (response.status === 201) {
                    setShowAddModal(false);
                    getSongs();
                    alert('Added');
                }
            });
        }
    }

    const callEditSong = () => {
        if (addOrEditSongDetails.name === "" || addOrEditSongDetails.artist === "") {
            alert("Song name and artist are required")
        } else {
            editSong(addOrEditSongDetails).then(response => {
                if (response.status === 200) {
                    setShowEditModal(false);
                    getSongs();
                    alert("Song Edited");
                }
            });
        }
    }

    const getSongs = () => {
        getLibrary().then(response => {
            if (response.status === 200) {
                const data = response.data;
                setLibrarySongs(data);
            }
        });
    };

    useEffect(() => {
        getSongs()
    },
        // eslint-disable-next-line
        []);


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

    const editSongModal = <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control defaultValue={addOrEditSongDetails.name} type="text" placeholder="eg. Hey Jude" onChange={(e) => {
                    setAddOrEditSongDetails({ ...addOrEditSongDetails, name: e.target.value })
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Artist</Form.Label>
                <Form.Control defaultValue={addOrEditSongDetails.artist} type="text" placeholder="eg. The Beatles" onChange={(e) => {
                    setAddOrEditSongDetails({ ...addOrEditSongDetails, artist: e.target.value })
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>YouTube Link</Form.Label>
                <Form.Control defaultValue={addOrEditSongDetails.url} type="text" disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control defaultValue={addOrEditSongDetails.tags} type="text" placeholder="Add comma separated tags" onChange={(e) => {
                    setAddOrEditSongDetails({ ...addOrEditSongDetails, tags: e.target.value })
                }} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="warning" onClick={() => {
                callEditSong()
            }}>Update</Button>
        </Modal.Footer>
    </Modal>


    const displayEditModal = song => {
        setAddOrEditSongDetails({ ...song, tags: song.tags.join() });
        setShowEditModal(true);
    }

    const displayAddModal = () => {
        setAddOrEditSongDetails(blankSong);
        setShowAddModal(true);
    }

    return (
        <div>
            <Row>
                {!isMobile ?
                    <Col>
                        <h3 className="page-headline mb-3">Library</h3>
                    </Col>
                    : ''}
                {config.editAccess ?
                    <Col sm="auto">
                        <Button variant="outline-warning" onClick={() => {
                            displayAddModal()
                        }}>Add</Button>
                    </Col>
                    : ""}
                <Col sm={12} className={isMobile ? "m-0 pl-3 pr-3" : "m-0 p-0"}>
                    <SongList showEditModal={displayEditModal} playlist={librarySongs}/>
                </Col>
            </Row>
            {addSongModal}
            {editSongModal}
        </div>
    )

}

export default Library;