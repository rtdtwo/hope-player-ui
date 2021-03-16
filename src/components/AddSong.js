import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { blankSong } from '../utils/constants';
import { addToLibrary } from '../api/manager';

const AddSong = (props) => {
    const [addOrEditSongDetails, setAddOrEditSongDetails] = useState(blankSong);

    const callAddSong = () => {
        if (addOrEditSongDetails.name === "" || addOrEditSongDetails.artist === "" || addOrEditSongDetails.url === "") {
            alert("Song name, artist and YouTube link are required");
        } else {
            addToLibrary(addOrEditSongDetails).then(response => {
                if (response.status === 201) {
                    props.setShowAddModal(false);
                    props.getSongs();
                }
            });
        }
    }

    return (
        <Modal show={props.showAddModal} onHide={() => props.setShowAddModal(false)}>
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
    );
}

export default AddSong;