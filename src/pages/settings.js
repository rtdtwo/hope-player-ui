import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { getStreamQuality, setStreamQuality } from '../utils/storage'

const Settings = (props) => {

    const onQualityChange = (event) => {
        setStreamQuality(event.target.value);
    }

    return (
        <div className="ml-2 mr-2">
            <Row>
                <Col sm={12}>
                    <h3 className="page-headline mb-4">Settings</h3>
                </Col>
            </Row>
            <Card bg="dark" className="p-4">
                <Row>
                    <Col xs={12} md={10}>
                        <h6 className="page-headline">Audio Quality</h6>
                        <p className="text-light m-0">Setting a lower quality conserves data, but offers inferior listening experience.</p>
                    </Col>
                    <Col xs={12} md={2}>
                        <Form.Group>
                            <Form.Control as="select" defaultValue={getStreamQuality()} onChange={onQualityChange.bind(this)}>
                                <option defaultValue="low">Low</option>
                                <option defaultValue="med">Medium</option>
                                <option defaultValue="high">High</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

            </Card>

            <Card bg="dark" className="p-4 mt-3">
                <Row>
                    <Col xs={12} md={10}>
                        <h6 className="page-headline">Default Library Sort</h6>
                        <p className="text-light m-0">Control how you wish to see your music ordered.</p>
                    </Col>
                    <Col xs={12} md={2}>
                        <Form.Group>
                            <Form.Control as="select">
                                <option value="low">Song A-Z</option>
                                <option value="med">Artist A-Z</option>
                                <option value="high" selected>Date added</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Card>

        </div>
    )
}

export default Settings;