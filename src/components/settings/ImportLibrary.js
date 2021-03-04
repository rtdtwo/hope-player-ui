import React, { useState } from 'react';

import { isMobile } from '../../utils/utils';
import { importLibrary } from '../../api/manager';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


let importFile = null;

const ImportLibrary = (props) => {
    const [showImportModal, setShowImportModal] = useState(false);

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
        <div>
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

            {importModal}

        </div>
    );
}

export default ImportLibrary;