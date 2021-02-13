import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addToLibrary } from '../api/manager'

let songName = "";
let songArtist = "";
let songUrl = "";
let tags = "";

const addSong = () => {
    if(songName === "" || songArtist === "" || songUrl === "") {
        alert("Song name, artist and YouTube link are required")
    } else {
        addToLibrary(songName, songArtist, songUrl, tags).then(response => {
            if (response.status === 201) {
                alert('Added')
            }
        });
    }
}

const AddSong = (props) => {
    return (
        <div className="m-3">
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
            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Add comma separated tags" onChange={(e) => {
                    tags = e.target.value;
                }} />
            </Form.Group>
            <Button variant="dark" onClick={() => {
                addSong()
                props.setShowAddModal(false)
            }}>Save</Button>{' '}
        </div>

    );
}

export default AddSong;