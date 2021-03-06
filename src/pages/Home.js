import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getLibrary } from '../api/manager';
import SongList from '../components/SongList';

const Home = () => {
    const [library, setLibrary] = useState([]);
    const [popularArtists, setPopularArtists] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);

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

    return (
        <Row className="page-root m-0">
            <Col className="library-container p-0 m-0 pr-5" md={6}>
                <h3 className="page-headline mb-3">Your Library</h3>
                <div className="song-list-container">
                    <SongList playlist={library}/>
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