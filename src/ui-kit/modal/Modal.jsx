import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

function Modal({
  children,
  open,
  handleClose,
  height,
  width,
  disableClose = false,
  title,
}) {
  const modalRoot = document.getElementById("modal-root");
  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      className={`modal modal-height--${height || "md"} modal-width--${
        width || "md"
      }`}
    >
      <div className={`modal__overlay`}>
        <div className="modal__container">
          <header className="modal__header">
            <div className=" flex-grow overflow-auto">
              <h4 className="mb-0 text-overflow-ellipsis">{title}</h4>
            </div>
            {!disableClose && (
              <span className="modal__close" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            )}
          </header>
          <div className="modal__body">{children}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
