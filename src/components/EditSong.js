import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { editSong } from '../api/manager';

const EditSong = (props) => {

    const [addOrEditSongDetails, setAddOrEditSongDetails] = useState(props.song)

    const callEditSong = () => {
        if (addOrEditSongDetails.name === "" || addOrEditSongDetails.artist === "") {
            alert("Song name and artist are required")
        } else {
            editSong(addOrEditSongDetails).then(response => {
                if (response.status === 200) {
                    props.setShowEditModal(false);
                    props.callback(addOrEditSongDetails);
                }
            });
        }
    }

    return (
        <Modal show={props.showEditModal} onHide={() => props.setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={props.song?.name} type="text" placeholder="eg. Hey Jude" onChange={(e) => {
                        setAddOrEditSongDetails({ ...addOrEditSongDetails, name: e.target.value })
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Artist</Form.Label>
                    <Form.Control defaultValue={props.song?.artist} type="text" placeholder="eg. The Beatles" onChange={(e) => {
                        setAddOrEditSongDetails({ ...addOrEditSongDetails, artist: e.target.value })
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>YouTube Link</Form.Label>
                    <Form.Control defaultValue={props.song?.url} type="text" disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tags</Form.Label>
                    <Form.Control defaultValue={props.song?.tags} type="text" placeholder="Add comma separated tags" onChange={(e) => {
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
    );
}

export default EditSong;