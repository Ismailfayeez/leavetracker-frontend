import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { renderButton, renderInput } from "../../../../utilities/uiElements";
import useValidator from "../../../../utilities/useValidator";
import { MY_PROJECTS_URL } from "../../apiConstants";
import { createMyProject } from "../../store/projects";
import createProjectSchema from "./createProject.schema";
import { toast } from "react-toastify";
import "./createProject.scss";

function Index({ setDisplayModal }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", description: "" });

  const handleChange = ({ target: input }) =>
    setData({ ...data, [input.name]: input.value });

  const [errors, setErrors, validateForm, validateProperty] = useValidator(
    data,
    createProjectSchema
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return;
    try {
      await dispatch(createMyProject(MY_PROJECTS_URL, data));
      toast.success(`Project ${data.name} added successfully`);
    } catch (err) {}
    setDisplayModal(false);
  };
  const handleBlur = ({ target: input }) => {
    validateProperty(input.name);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="create-project flex flex--column full-height"
    >
      <div className="flex-grow flex flex--column gap--1rem">
        {renderInput({
          name: "name",
          data,
          label: "name",
          handleChange,
          onBlur: handleBlur,
          errors,
          autoComplete: "off",
        })}
        {renderInput({
          name: "description",
          data,
          label: "description",
          handleChange,
          onBlur: handleBlur,
          errors,
          autoComplete: "off",
        })}
      </div>
      <div className="flex flex--center flex-wrap btn-container btn-items-grow">
        {renderButton({
          content: "Submit",
          onClick: handleSubmit,
          className: "btn--md btn--matte-black",
          type: "submit",
        })}
        {renderButton({
          content: "Back",
          onClick: () => setDisplayModal(false),
          className: "btn--md btn--matte-black-outline",
          type: "button",
        })}
      </div>
    </form>
  );
}

export default Index;
