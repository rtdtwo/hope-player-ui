import React, { useState } from 'react';

import { importLibrary } from '../../api/manager';

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
            <Row className="pl-5 pr-5 pt-5 m-0">
                <Col xs={12} md={10} className="p-0 m-0">
                <h5 className="bold-text">Import Library</h5>
                    <p className="text-light m-0">Import a valid Hope Player JSON playlist file into your library.</p>
                </Col>
                <Col xs={12} md={2} className="text-right p-0 m-0">
                    <Button variant="outline-warning" onClick={() => setShowImportModal(true)}>Import</Button>
                </Col>
            </Row>

            {importModal}

        </div>
    );
}

export default ImportLibrary;