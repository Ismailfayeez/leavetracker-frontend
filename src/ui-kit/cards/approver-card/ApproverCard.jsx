import React from "react";
import { renderButton } from "../../../utilities/uiElements";
import "./approverCard.scss";

function ApproverCard({
  name,
  email,
  enableRemoveBtn,
  handleRemove,
  className,
}) {
  return (
    <div className={`approverCard ${className || ""}`}>
      <div className="approverCardContent">
        <div className="approverCard__name">{name}</div>
        <div className="approverCard__email">{email}</div>
      </div>
      {enableRemoveBtn && (
        <div>
          {renderButton({
            content: "remove",
            className: "btn--md btn--matte-black",
            onClick: handleRemove,
          })}
        </div>
      )}
    </div>
  );
}

export default ApproverCard;
