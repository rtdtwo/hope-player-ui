import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addToLibrary } from '../api/manager'

let songName = "";
let songArtist = "";
let songUrl = "";

const addSong = () => {
    addToLibrary(songName, songArtist, songUrl).then(response => {
        if (response.status === 201) {
            alert('Added')
        }
    });
}

const AddSong = () => {
    return (
        <Row className="m-3">
            <Col>
                <h2 className="page-headline">Add Song</h2>
            </Col>
            <Col sm="auto">
                <Button variant="outline-warning" onClick={() => {
                    addSong()
                }}>Save</Button>{' '}
            </Col>
            <Col sm={12} className="text-light mt-5">
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="eg. Hey Jude" onChange={(e) => {
                        songName = e.target.value;
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Artist</Form.Label>
                    <Form.Control type="text" placeholder="eg. The Beatles" onChange={(e) => {
                        songArtist = e.target.value;
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>YouTube Link</Form.Label>
                    <Form.Control type="text" placeholder="Full link required" onChange={(e) => {
                        songUrl = e.target.value;
                    }} />
                </Form.Group>
            </Col>
        </Row>
    );
}

export default AddSong;