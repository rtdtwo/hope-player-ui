import React from 'react';

import { isMobile } from '../../utils/utils';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const DefaultSort = (props) => {

    return (
        <Card bg="dark" className="p-4 mt-3">
            <Row>
                <Col xs={12} md={10}>
                    <h6 className="page-headline">Default Library Sort</h6>
                    <p className="text-light m-0">Control how you wish to see your music ordered.</p>
                </Col>
                <Col xs={12} md={2} className={isMobile ? "pt-4" : ""}>
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
        </Card>
    );
}

export default DefaultSort;