import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ExportLibrary = (props) => {
    return (
        <Row className="p-0 ml-0 mr-0 tm-40">
            <Col xs={12} md={10} className="p-0 m-0">
                <h5 className="bold-text">Export Library</h5>
                <p className="text-light m-0">Export your music library as a JSON file. It can then be shared with other Hope Player users.</p>
            </Col>
            <Col xs={12} md={2} className="text-right p-0 m-0">
                <Button variant="outline-warning">Export</Button>
            </Col>
        </Row>
    );
}

export default ExportLibrary;