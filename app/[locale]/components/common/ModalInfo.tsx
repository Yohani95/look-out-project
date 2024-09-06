import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalInfo = ({ children, show, handleClose, content = null, t }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t.notification.edit.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
        <p>{content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t.Common.goBack}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfo;
