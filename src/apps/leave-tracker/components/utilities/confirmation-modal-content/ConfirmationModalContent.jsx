import React from "react";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
import { renderButton } from "../../../../../utilities/uiElements";
import { leaveTrackerModalNames } from "../../../leaveTracker.constants";

function ConfirmationModalContent({ props }) {
  const [{ globalVal }] = useModalNav(ModalNavContext);
  const { confirmationText, handleConfirm, handleCancel } =
    globalVal[leaveTrackerModalNames.confirmation] || {};

  return (
    <div className="flex flex--column full-height">
      <p className="flex-item-grow-1 flex--center">
        {confirmationText || "Are you sure want to proceed"}
      </p>
      <div className="btn-container flex flex--center">
        {renderButton({
          content: "confirm",
          className: "btn--md btn--matte-black margin-1",
          onClick: handleConfirm,
        })}
        {renderButton({
          content: "cancel",
          className: "btn--md btn--matte-black-outline margin-1",
          onClick: handleCancel,
        })}
      </div>
    </div>
  );
}

export default ConfirmationModalContent;
