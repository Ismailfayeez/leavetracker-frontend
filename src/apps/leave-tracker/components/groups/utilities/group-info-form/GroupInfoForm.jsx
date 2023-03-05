import React from "react";
import {
  renderButton,
  renderInput,
} from "../../../../../../utilities/uiElements";

function GroupInfoForm({
  handleSubmit,
  data,
  handleChange,
  handleBlur,
  errors,
  id,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex--column full-height">
      <div className="flex-item-grow-1">
        {renderInput({
          name: "name",
          label: "Name",
          type: "text",
          className: "mb-1",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
        })}

        {renderInput({
          name: "description",
          label: "description",
          type: "text",
          className: "mb-1",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
        })}
      </div>
      <div className="flex flex--center flex-wrap btn-container btn-items-grow">
        {renderButton({
          type: "submit",
          content: id == "new" ? "next" : "submit",
          className: " btn--md btn--matte-black",
        })}
      </div>
    </form>
  );
}

export default GroupInfoForm;
