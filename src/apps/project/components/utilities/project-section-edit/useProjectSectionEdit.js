import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import { PageNavContext } from '../../../../../utilities/context/PageNavContext';
import { storeDataToLocal } from '../../../../../utilities/helper';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import usePageNav from '../../../../../utilities/hooks/usePageNav';
import useValidator from '../../../../../utilities/hooks/useValidator';
import { createSectionDetail, updateSectionDetail } from '../../../store/projects';
import './useProjectSectionEdit.scss';

const useProjectSectionEdit = (sectionConstants, sectionId, fields, schema) => {
  const dispatch = useDispatch();
  const { label, baseUrl, name, updateMethod, nestedUrlPathName, primaryField } = sectionConstants;
  const [{ moveToPrevPage }] = usePageNav(PageNavContext);
  const [{ closeModal }] = useModalNav(ModalNavContext);
  const sectionDetail = useSelector((state) => state.entities.projects.core[name].detail);
  const [data, setData] = useState(storeDataToLocal(sectionDetail, fields));
  const [errors, validateForm, validateProperty] = useValidator(data, schema);
  const handleBlur = ({ target: input }) => {
    validateProperty(input.name);
  };

  useEffect(() => {
    setData((prevData) => ({ ...prevData, ...storeDataToLocal(sectionDetail, fields) }));
  }, [sectionDetail, fields]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async () => {
    let responseObj = {};
    const error = validateForm();
    if (error) return;
    if (sectionId) {
      if (sectionId === 'new') {
        try {
          const { data: responseData } = await dispatch(
            createSectionDetail({ baseUrl, name, nestedUrlPathName, data })
          );
          responseObj = responseData;
        } catch (err) {
          return;
        }
      } else {
        try {
          const { data: responseData } = await dispatch(
            updateSectionDetail({
              baseUrl,
              name,
              nestedUrlPathName,
              data,
              method: updateMethod,
              id: sectionId
            })
          );
          responseObj = responseData;
        } catch (err) {
          return;
        }
      }
      closeModal();
      const primaryFieldVal =
        primaryField && responseObj[primaryField] ? responseObj[primaryField] : '';

      const toastMessage = `${label} ${primaryFieldVal} ${
        sectionId === 'new' ? 'added' : 'edited'
      } ${' '}successfully`;

      toast.success(<span className="toast-msg">{toastMessage}</span>);
    }
  };

  return [
    {
      sectionDetail,
      data,
      handleChange,
      handleSubmit,
      handleBlur,
      moveToPrevPage,
      errors,
      setData
    }
  ];
};
export default useProjectSectionEdit;
