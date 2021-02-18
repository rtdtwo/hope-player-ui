import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { editSong } from '../api/manager'

let songName = "";
let songArtist = "";
let tags = "";

const callEditSong = (hideAddModalFun, originalSong) => {
    if (songName === "" || songArtist === "") {
        alert("Song name, artist and YouTube link are required")
    } else if (songName === originalSong.name && songArtist === originalSong.artist && tags === originalSong.tags.join()) {
        alert("Nothing changed!")
    } else {
        editSong(originalSong.id, songName, songArtist, tags).then(response => {
            if (response.status === 200) {
                hideAddModalFun()
                alert("Song Edited!")
            }
        });
    }
}

const EditSong = (props) => {
    const song = props.song;

    songName = song.name;
    songArtist = song.artist;
    tags = song.tags.join();

    if (song === null || song === undefined) {
        props.hideAddModal()
        return (<div />)
    }

    return (
        <div className="m-3">
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control defaultValue={song.name} type="text" placeholder="eg. Hey Jude" onChange={(e) => {
                    songName = e.target.value;
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Artist</Form.Label>
                <Form.Control defaultValue={song.artist} type="text" placeholder="eg. The Beatles" onChange={(e) => {
                    songArtist = e.target.value;
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>YouTube Link</Form.Label>
                <Form.Control defaultValue={song.url} type="text" disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control defaultValue={song.tags.join()} type="text" placeholder="Add comma separated tags" onChange={(e) => {
                    tags = e.target.value;
                }} />
            </Form.Group>
            <Button variant="dark" onClick={() => {
                callEditSong(props.hideAddModal, song)
            }}>Save</Button>{' '}
        </div>

    );
}

export default EditSong;