import React from "react";
import { renderInput } from "../../../../../utilities/uiElements";
import { useProjectSectionEdit } from "./useProjectSectionEdit";
function ProjectSectionEdit({ sectionConstants, sectionId, fields, schema }) {
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
  return (
    <div className="project-section-edit">
      <div className="flex-item-grow-1 flex flex--column gap--1rem">
        {fields.map(({ displayContent, ...otherProps }) => {
          return (
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
          );
        })}
      </div>
      <div className="flex flex--center flex-wrap btn-container btn-items-grow">
        <button className="btn btn--md btn--matte-black" onClick={handleSubmit}>
          Submit
        </button>
        {sectionId != "new" && (
          <button
            className="btn btn--md btn--matte-black-outline"
            onClick={moveToPrevPage}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectSectionEdit;
