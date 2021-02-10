import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SongList from '../components/songlist';
import { getLibrary } from '../api/manager';

class Library extends Component {
    state = {
        library: []
    }

    getSongs = () => {
        getLibrary().then(response => {
            if (response.status === 200) {
                const data = response.data;
                this.setState({ library: data })
            }
        });
    };

    componentDidMount() {
        this.getSongs()
    }

    render() {
        return (
            <div>
                <Row className="m-3">
                    <Col sm={12}>
                        <h2 className="page-headline">Library</h2>
                    </Col>
                    <Col sm={12}>
                        <SongList data={this.state.library} handleSongClick={this.props.handleSongClick} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Library;