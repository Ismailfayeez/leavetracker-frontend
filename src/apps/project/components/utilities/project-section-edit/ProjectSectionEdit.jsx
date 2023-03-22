import React, { useState } from "react";
import { renderButton, renderInput } from "../../../../../utilities/uiElements";
import { useProjectSectionEdit } from "./useProjectSectionEdit";
function ProjectSectionEdit({ sectionConstants, sectionId, fields, schema }) {
  const [isLoading, setIsLoading] = useState(false);
  const [
    {
      sectionDetail,
      data,
      handleChange,
      handleSubmit,
      handleBlur,
      moveToPrevPage,
      errors,
    },
  ] = useProjectSectionEdit(sectionConstants, sectionId, fields, schema);
  if (!fields)
    fields = Object.keys(sectionDetail).map((key) => ({
      name: key,
      label: key,
    }));
  console.log(data);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleSubmit();
    setIsLoading(false);
  };
  return (
    <form className="project-section-edit" onSubmit={onSubmit}>
      <div className="flex-item-grow flex flex--column gap--10px">
        {fields.map(({ displayContent, ...otherProps }) => (
          <div>
            {displayContent
              ? displayContent({
                  data,
                  handleChange,
                  handleBlur,
                  errors,
                  ...otherProps,
                })
              : renderInput({
                  data,
                  handleChange,
                  onBlur: handleBlur,
                  errors,
                  ...otherProps,
                })}
          </div>
        ))}
      </div>
      <div className="btn-container-grow">
        {renderButton({
          content: "Submit",
          type: "submit",
          className: "btn btn--md btn--matte-black",
          loading: isLoading,
        })}
        {sectionId != "new" &&
          renderButton({
            content: "Back",
            className: "btn btn--md btn--matte-black-outline",
            onClick: moveToPrevPage,
            type: "button",
          })}
      </div>
    </form>
  );
}

export default ProjectSectionEdit;
