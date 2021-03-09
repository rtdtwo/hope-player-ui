import React from 'react';
import { Col, Row } from 'react-bootstrap';
import GuitarPlayerImage from '../assets/guitar-player.svg';

const UnderConstruction = () => {
    return (
        <Row className="p-0 m-0 pt-5 justify-content-center">
            <Col md={4} className="p-0 m-0 align-self-center">
                <img alt="" src={GuitarPlayerImage} width="100%"/>
            </Col>
            <Col className="p-0 m-0 align-self-center" md={4}>
                <h1 className="bold-text">Mi... So... Fa...</h1>
                <p className="regular-text">A good piece is being written. Check back later!</p>
            </Col>
        </Row>
    );
}

export default UnderConstruction;