import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const Settings = (props) => {

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
                            <Form.Control as="select">
                                <option value="low">Low</option>
                                <option value="med">Medium</option>
                                <option value="high" selected>High</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default Settings;