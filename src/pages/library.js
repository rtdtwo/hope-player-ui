import React, { useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SongList from '../components/songlist';
import { getLibrary } from '../api/manager';

import GlobalState from '../contexts/GlobalState';

const Library = (props) => {
    const [state, setState] = useContext(GlobalState);

    const getSongs = () => {
        getLibrary().then(response => {
            if (response.status === 200) {
                const data = response.data;
                setState(state => ({...state, queue: data}));
            }
        });
    };

    useEffect(() => {
        getSongs()
    }, []);

    
    return (
        <div>
            <Row className="m-3">
                <Col sm={12}>
                    <h2 className="page-headline">Library</h2>
                </Col>
                <Col sm={12}>
                    <SongList />
                </Col>
            </Row>
        </div>
    )

}

export default Library;