import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AlertCircle } from 'lucide-react';

export default function ConfirmationModal({
  show,
  onHide,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this operation?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  loading = false,
}) {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="h6 fw-bold d-flex align-items-center gap-2 m-0 text-dark">
          <AlertCircle size={18} className="text-warning" />
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-4">
        <p className="mb-0 text-secondary" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer className="border-top bg-light">
        <Button variant="outline-secondary" size="sm" onClick={onHide} disabled={loading}>
          {cancelText}
        </Button>
        <Button variant={confirmVariant} size="sm" onClick={onConfirm} disabled={loading}>
          {loading ? 'Processing...' : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

