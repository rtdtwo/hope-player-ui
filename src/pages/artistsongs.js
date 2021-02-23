import React, { useEffect, useState } from 'react';
import { getArtists } from '../api/manager'
import { isMobile } from '../utils/utils'
import { serverUrl } from '../config.json'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SongList from '../components/songlist';

const Artists = (props) => {

    const [artistSongs, setArtistSongs] = useState([])

    const callGetArtistSongs = () => {
        getArtistSongs().then(response => {
            if (response.status === 200) {
                const data = response.data.results;
                setArtists(data);
            }
        });
    };

    useEffect(() => {
        callGetArtistSongs()
    },
        // eslint-disable-next-line
        []);

    const artistList = artists.map(artist => {
        return (
            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                <Card bg="dark" className="mt-4">
                    <Card.Img
                        variant="top" src={serverUrl + artist.imagePath}
                    />
                    <Card.Body>
                        <h6 className="text-light artist-card-name" title={artist.name}>{artist.name}</h6>
                    </Card.Body>
                </Card>
            </Col>
        )
    });

    return (
        <div className="ml-2 mr-2">
            <Row>
                <Col xs={12} className="text-center">
                    <Image roundedCircle src={props.artist.image} className="artist-page-image" />
                    <h3>{props.artist.name}</h3>
                </Col>

                <Col xs={12} className="text-center">
                    <SongList playlist={artistSongs} />
                </Col>

            </Row>
        </div>
    )
}

export default Artists;