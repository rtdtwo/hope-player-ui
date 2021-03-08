import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const DefaultSort = (props) => {

    return (
        <Row className="pl-5 pr-5 pt-5 m-0">
            <Col xs={12} md={10} className="p-0 m-0">
                <h5 className="bold-text">Default Library Sort</h5>
                <p className="text-light m-0">Control how you wish to see your music ordered.</p>
            </Col>
            <Col xs={12} md={2} className="p-0 m-0">
                <Form.Group>
                    <Form.Control className="bg-dark text-light" as="select">
                        <option value="song-asc">Song A-Z</option>
                        <option value="song-desc">Artist A-Z</option>
                        <option value="added-desc">Recently added</option>
                        <option value="added-asc">Earliest added</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    );
}

export default DefaultSort;