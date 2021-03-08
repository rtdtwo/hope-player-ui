import React, { useState, useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { getArtists } from '../api/manager';
import { serverUrl } from '../config.json'


const Artists = () => {
    const [artists, setArtists] = useState([]);

    const callGetArtists = () => {
        getArtists().then(response => {
            if (response.status === 200) {
                const data = response.data.results;
                setArtists(data);
            }
        });
    };

    useEffect(() => {
        callGetArtists()
    },
        // eslint-disable-next-line
        []);

    const getArtistList = () => {
        return artists.map(artist => {
            return <Col md={3} lg={2} key={artist.name} className="p-3 m-0 artist-list-item">
                <Image roundedCircle src={serverUrl + '/artists/image?name=' + artist.name} className="artist-list-image" />
                <p className="m-0 p-0 text-center artist-list-name">{artist.name}</p>
            </Col>
        })
    }

    return (
        <div className="page-root artists-container">
            <h3 className="page-headline mb-0 lm-40 tm-40 rm-40 bottom-border">Artists</h3>
            <Row className="m-0 artists-list-container">
                {getArtistList()}
            </Row>
        </div>
    );
}

export default Artists;