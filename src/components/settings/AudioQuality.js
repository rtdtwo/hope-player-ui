import React from 'react';

import { getStreamQuality, setStreamQuality } from '../../utils/storage';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const AudioQuality = (props) => {

    const onQualityChange = (event) => {
        setStreamQuality(event.target.value);
    }

    return (
        <Row className="pl-5 pr-5 pt-5 m-0">
            <Col xs={12} md={10} className="p-0 m-0">
                <h5 className="bold-text">Audio Quality</h5>
                <p className="text-light m-0">Setting a lower quality conserves data, but offers inferior listening experience.</p>
            </Col>
            <Col xs={12} md={2} className="p-0 m-0">
                <Form.Group>
                    <Form.Control className="bg-dark text-light" as="select" defaultValue={getStreamQuality()} onChange={onQualityChange.bind(this)}>
                        <option value="low">Low</option>
                        <option value="med">Medium</option>
                        <option value="high">High</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    );
}

export default AudioQuality;