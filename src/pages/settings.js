import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { isMobile } from '../utils/utils';
import { getStreamQuality, setStreamQuality } from '../utils/storage';
import { importLibrary } from '../api/manager';
import { editAccess } from '../config.json';

const Settings = (props) => {

    const [showImportModal, setShowImportModal] = useState(false);
    let importFile = null;

    const onQualityChange = (event) => {
        setStreamQuality(event.target.value);
    }

    const onImportFileSelected = (event) => {
        const files = event.target.files;
        importFile = files[0];
    }

    const callImportLibrary = () => {
        if (importFile != null) {
            importLibrary(importFile).then(response => {
                if (response.status === 200) {
                    alert("Import process complete");
                    setShowImportModal(false);
                }
            })
        }
    }

    const importModal = <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Import Library</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Select the JSON file from your device to import songs.</p>
            <Form.File
                onChange={onImportFileSelected.bind(this)}
                id="import-library-file"
                label="Import File"
            />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="warning" onClick={() => callImportLibrary()}>
                Import</Button>
        </Modal.Footer>
    </Modal>

    return (
        <div className="m-4">
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

            {editAccess ?
                <Card bg="dark" className="p-4 mt-3">
                    <Row>
                        <Col xs={12} md={10}>
                            <h6 className="page-headline">Import Library</h6>
                            <p className="text-light m-0">Import a valid Hope Player JSON playlist file into your library.</p>
                        </Col>
                        <Col xs={12} md={2} className={isMobile ? "text-right pt-4" : "text-right"}>
                            <Button variant="outline-warning" onClick={() => setShowImportModal(true)}>Import</Button>
                        </Col>
                    </Row>
                </Card>
                : ''
            }

            {editAccess ? importModal : ''}

        </div>
    )
}

export default Settings;