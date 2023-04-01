import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import './requestSuccess.scss';

function RequestSuccess() {
  const [{ globalVal }] = useModalNav(ModalNavContext);
  const data = globalVal.requestSuccess;
  return (
    <section className="request-success">
      <div>
        <span className="success-tick">
          <FontAwesomeIcon icon={faCheckCircle} />
        </span>
        Leave request placed successfully
      </div>
      <div>Req No:{data.request_number}</div>
    </section>
  );
}

export default RequestSuccess;
