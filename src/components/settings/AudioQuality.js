import React from 'react';

import { isMobile } from '../../utils/utils';
import { getStreamQuality, setStreamQuality } from '../../utils/storage';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const AudioQuality = (props) => {

    const onQualityChange = (event) => {
        setStreamQuality(event.target.value);
    }

    return (
        <Card bg="dark" className="p-4">
            <Row>
                <Col xs={12} md={10}>
                    <h6 className="page-headline">Audio Quality</h6>
                    <p className="text-light m-0">Setting a lower quality conserves data, but offers inferior listening experience.</p>
                </Col>
                <Col xs={12} md={2} className={isMobile ? "pt-4" : ""}>
                    <Form.Group>
                        <Form.Control className="bg-dark text-light" as="select" defaultValue={getStreamQuality()} onChange={onQualityChange.bind(this)}>
                            <option value="low">Low</option>
                            <option value="med">Medium</option>
                            <option value="high">High</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Card>
    );
}

export default AudioQuality;