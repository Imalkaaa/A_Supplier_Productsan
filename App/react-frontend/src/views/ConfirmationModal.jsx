import React from 'react';
import './ConfirmationModal.css'; // Import styles for the modal

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this supplier?</p>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirm}>Yes, Delete</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
