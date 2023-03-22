import React from "react";
import { renderButton } from "../../utilities/uiElements";
import "./confirmationModalContent.scss";
function ConfirmationModalContent({
  confirmationText,
  handleConfirm = () => {},
  handleCancel = () => {},
}) {
  console.log(confirmationText, handleConfirm, handleCancel);
  return (
    <div className="confirmation-modal-content flex flex--column">
      <div className="flex-item-grow">
        <p style={{ textAlign: "center" }}>
          {confirmationText ? confirmationText : "Are you sure want to proceed"}
        </p>
      </div>
      <div className="btn-container flex flex--center">
        {renderButton({
          content: "confirm",
          onClick: handleConfirm,
          className: " btn--md btn--matte-black",
        })}
        {renderButton({
          content: "cancel",
          onClick: handleCancel,
          className: " btn--md btn--matte-black-outline",
        })}
      </div>
    </div>
  );
}

export default ConfirmationModalContent;
