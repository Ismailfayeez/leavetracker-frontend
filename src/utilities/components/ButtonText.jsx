import React from "react";

function ButtonText({ mobile, tablet, desktop }) {
  return (
    <div>
      {mobile && <span className="display--mobile-only">{mobile}</span>}
      {tablet && <span className="display--tablet">{tablet}</span>}
      {desktop && <span className="display--desktop"> {desktop}</span>}
    </div>
  );
}

export default ButtonText;
