import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactDOM from "react-dom";
import { motion as m, AnimatePresence } from "framer-motion";
import "./modal.scss";
import { modalVariant, overlayVariant } from "../../utilities/AnimateVariants";

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
      <AnimatePresence onExitComplete={handleClose}>
        <m.div
          className={`modal__overlay`}
          variants={overlayVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <m.div
            className="modal__container"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <header className="modal__header">
              <div className=" flex-item-grow overflow--auto">
                <h4 className="margin-bottom--0 text-overflow--ellipsis">
                  {title}
                </h4>
              </div>
              {!disableClose && (
                <span className="modal__close" onClick={handleClose}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              )}
            </header>
            <div className="modal__body">{children}</div>
          </m.div>
        </m.div>
      </AnimatePresence>
    </div>,
    modalRoot
  );
}

export default Modal;
