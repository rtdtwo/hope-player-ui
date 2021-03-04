import React from 'react';

import { isMobile } from '../../utils/utils';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ExportLibrary = (props) => {
    return (
        <Card bg="dark" className="p-4 mt-3">
            <Row>
                <Col xs={12} md={10}>
                    <h6 className="page-headline">Export Library</h6>
                    <p className="text-light m-0">Export your music library as a JSON file. It can then be shared with other Hope Player users.</p>
                </Col>
                <Col xs={12} md={2} className={isMobile ? "text-right pt-4" : "text-right"}>
                    <Button variant="outline-warning">Export</Button>
                </Col>
            </Row>
        </Card>
    );
}

export default ExportLibrary;