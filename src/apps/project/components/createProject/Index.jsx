import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { renderButton, renderInput } from "../../../../utilities/uiElements";
import useValidator from "../../../../utilities/hooks/useValidator";
import { MY_PROJECTS_URL } from "../../apiConstants";
import { createMyProject } from "../../store/projects";
import createProjectSchema from "./createProject.schema";
import { toast } from "react-toastify";
import "./createProject.scss";

function Index({ setDisplayModal }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: "", description: "" });

  const handleChange = ({ target: input }) =>
    setData({ ...data, [input.name]: input.value });

  const [errors, setErrors, validateForm, validateProperty] = useValidator(
    data,
    createProjectSchema
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const error = validateForm();
    if (error) return;
    try {
      await dispatch(createMyProject(MY_PROJECTS_URL, data));
      toast.success(
        <span className="toast-msg">{`Project ${data.name} added successfully`}</span>
      );
    } catch (err) {}
    setIsLoading(false);
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
      <div className="flex-item-grow flex flex--column gap--10px">
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
      <div className="btn-container-grow">
        {renderButton({
          content: "Submit",
          className: "btn--md btn--matte-black",
          type: "submit",
          loading: isLoading,
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
