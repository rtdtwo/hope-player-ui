import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { editSong } from '../api/manager'

let songName = "";
let songArtist = "";
let songUrl = "";
let tags = "";

const callEditSong = (originalSong) => {
    if(songName === "" || songArtist === "" || songUrl === "") {
        alert("Song name, artist and YouTube link are required")
    } else if (songName === originalSong.name && songArtist === originalSong.artist && songUrl === originalSong.url && tags === originalSong.tags) {
        alert("Nothing changed!")
    } else {
        editSong(songName, songArtist, songUrl, tags).then(response => {
            if (response.status === 201) {
                alert("Song Edited!")
            }
        });
    }
}

const EditSong = (props) => {
    const song = props.song;

    if(song === null || song === undefined) {
        props.hideAddModal()
        return(<div />)
    }

    return (
        <div className="m-3">
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control value={song.name} type="text" placeholder="eg. Hey Jude" onChange={(e) => {
                    songName = e.target.value;
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Artist</Form.Label>
                <Form.Control value={song.artist} type="text" placeholder="eg. The Beatles" onChange={(e) => {
                    songArtist = e.target.value;
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>YouTube Link</Form.Label>
                <Form.Control value={song.url} type="text" placeholder="Full link required" onChange={(e) => {
                    songUrl = e.target.value;
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control value={song.tags} type="text" placeholder="Add comma separated tags" onChange={(e) => {
                    tags = e.target.value;
                }} />
            </Form.Group>
            <Button variant="dark" onClick={() => {
                callEditSong(song)
                props.hideAddModal()
            }}>Save</Button>{' '}
        </div>

    );
}

export default EditSong;