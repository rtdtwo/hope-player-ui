import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getLibrary } from '../api/manager';
import SongList from '../components/SongList';
import { editAccess } from '../config.json';
import AddIcon from '../assets/add.svg';
import AddSongModal from '../components/AddSong';
import EditSongModal from '../components/EditSong';

const Library = () => {
    const [library, setLibrary] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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

    return (
        <div className="page-root library-container">
            <AddSongModal
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                getSongs={getSongs} />

            <EditSongModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                getSongs={getSongs} />

            <Row className="mt-5 ml-5 mr-5 mb-0 bottom-border">
                <Col className="m-0 p-0 align-self-center">
                    <h3 className="page-headline">Your Library</h3>
                </Col>
                {editAccess ?
                    <Col className="m-0 p-0 align-self-center" md="auto">
                        <img alt="" className="pointer-cursor mr-2" src={AddIcon} width="20px" onClick={() => setShowAddModal(true)} />
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