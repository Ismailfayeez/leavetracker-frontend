import React from 'react';
import ConfirmationModalContent from '../confirmation-modal-content/ConfirmationModalContent';
import Modal from '../modal/Modal';
import './confirmatonModal.scss';

function ConfirmationModal({
  confirmationText,
  handleConfirm = () => {},
  handleCancel = () => {},
  showModal,
  handleClose,
  ...otherProps
}) {
  return (
    <Modal open={showModal} handleClose={handleClose} {...otherProps}>
      <ConfirmationModalContent
        confirmationText={confirmationText}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </Modal>
  );
}

export default ConfirmationModal;
