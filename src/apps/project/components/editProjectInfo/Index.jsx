import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { storeDataToLocal } from '../../../../utilities/helper';
import useValidator from '../../../../utilities/hooks/useValidator';
import { renderButton, renderInput } from '../../../../utilities/uiElements';
import createProjectSchema from '../createProject/createProject.schema';

function Index({ setDisplayModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const fields = useMemo(() => [{ name: 'name' }, { name: 'description' }], []);
  const projectDetail = useSelector((state) => state.entities.projects.myProjects.detail);
  const [data, setData] = useState(storeDataToLocal(projectDetail, fields));

  const [errors, validateForm, validateProperty] = useValidator(data, createProjectSchema);
  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const error = validateForm();
    if (error) return;
    toast.warning(
      <span className="toast-msg">Project cannot be edited.Contact administrator</span>
    );
    setIsLoading(false);
    setDisplayModal(false);
  };
  useEffect(() => {
    setData((prevData) => ({ ...prevData, ...storeDataToLocal(projectDetail, fields) }));
  }, [projectDetail, fields]);
  const handleBlur = ({ target: input }) => {
    validateProperty(input.name);
  };
  return (
    <form onSubmit={handleSubmit} className="create-project flex flex--column full-height">
      <div className="flex-item-grow flex flex--column gap--10px">
        {renderInput({
          name: 'name',
          data,
          label: 'name',
          handleChange,
          onBlur: handleBlur,
          errors,
          autoComplete: 'off'
        })}
        {renderInput({
          name: 'description',
          data,
          label: 'description',
          handleChange,
          onBlur: handleBlur,
          errors,
          autoComplete: 'off'
        })}
      </div>
      <div className="btn-container-grow">
        {renderButton({
          content: 'Submit',
          className: 'btn--md btn--matte-black',
          type: 'submit',
          loading: isLoading ? 1 : 0
        })}
        {renderButton({
          content: 'Back',
          onClick: () => setDisplayModal(false),
          className: 'btn--md btn--matte-black-outline',
          type: 'button'
        })}
      </div>
    </form>
  );
}

export default Index;
