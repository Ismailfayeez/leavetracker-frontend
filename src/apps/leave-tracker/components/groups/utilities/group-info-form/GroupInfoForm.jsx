import React, { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleSubmit();
    setIsLoading(false);
  };
  return (
    <form onSubmit={onSubmit} className="flex flex--column full-height">
      <div className="flex-item-grow flex flex--column gap--10px">
        {renderInput({
          name: "name",
          label: "Name",
          type: "text",
          className: "margin-bottom--1",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
        })}

        {renderInput({
          name: "description",
          label: "description",
          type: "text",
          className: "margin-bottom--1",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
        })}
      </div>
      <div className="btn-container-grow">
        {renderButton({
          type: "submit",
          content: id == "new" ? "next" : "submit",
          className: " btn--md btn--matte-black",
          loading: isLoading,
        })}
      </div>
    </form>
  );
}

export default GroupInfoForm;
