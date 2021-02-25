import React, { useEffect, useState } from 'react';
import { getArtists } from '../api/manager'
import { isMobile } from '../utils/utils'
import { serverUrl } from '../config.json'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const Artists = (props) => {

    const [artists, setArtists] = useState([]);
    const [artistsLoading, setArtistsLoading] = useState(false);

    const callGetArtists = () => {
        setArtistsLoading(true);
        getArtists().then(response => {
            if (response.status === 200) {
                const data = response.data.results;
                setArtists(data);
                setArtistsLoading(false);
            }
        });
    };

    useEffect(() => {
        callGetArtists()
    },
        // eslint-disable-next-line
        []);

    const artistList = artists.map(artist => {
        return (
            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                <Card bg="dark" className="mt-4">
                    <Card.Img
                        variant="top" src={serverUrl + '/artists/image?name=' + artist.name}
                    />
                    <Card.Body>
                        <h6 className="text-light artist-card-name" title={artist.name}>{artist.name}</h6>
                    </Card.Body>
                </Card>
            </Col>
        )
    });

    return (
        <div className="pl-4 pr-4 pb-4">
            <Row className={isMobile ? "mb-5" : ""}>
                {
                    artistsLoading ?
                        <Col xs={12} className="text-center mt-3">
                            <Spinner animation="border" variant="warning" />
                            <h5 className="page-headline mt-3">Loading artists</h5>
                        </Col>
                        : artistList
                }
                
            </Row>
        </div>
    )
}

export default Artists;