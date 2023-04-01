import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeErrorModal } from '../../store/error';
import { renderErrorData } from '../../utilities/helper';
import Modal from '../modal/Modal';
import './apiErrorModal.scss';

function ApiErrorModal() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.entities.error);
  const { errorResponse, displayErrorModal } = error;
  const handleCloseErrorModal = () => dispatch(closeErrorModal());
  return (
    <Modal
      handleClose={handleCloseErrorModal}
      open={displayErrorModal}
      height="auto"
      width="md"
      title={
        <span>
          <FontAwesomeIcon icon={faCircleXmark} className="error-txt" /> Error
        </span>
      }>
      {renderErrorData(errorResponse.data || {})}
    </Modal>
  );
}

export default ApiErrorModal;
