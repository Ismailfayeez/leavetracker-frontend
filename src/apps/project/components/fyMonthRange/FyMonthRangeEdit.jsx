import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFyMonth } from "../../store/projects";
import {
  MY_PROJECTS_URL,
  PROJECT_SECTION_URL_PATHNAMES,
} from "../../apiConstants";
import { PageNavContext } from "../../../../utilities/context/PageNavContext";
import { usePageNav } from "../../../../utilities/hooks/usePageNav";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import { renderButton, renderSelect } from "../../../../utilities/uiElements";
function FyMonthRangeEdit(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams();
  const baseUrl =
    MY_PROJECTS_URL + projectId + "/" + PROJECT_SECTION_URL_PATHNAMES.fyMonth;
  const dispatch = useDispatch();
  const [{ moveToPrevPage }] = usePageNav(PageNavContext);
  const [navProps] = useModalNav(ModalNavContext);
  const fyMonth = useSelector(
    (state) => state.entities.projects.core.fyMonth.month
  );
  const [data, setData] = useState({ monthId: fyMonth });

  useEffect(() => {
    setData({ ...data, monthId: fyMonth });
  }, [fyMonth]);

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: Number(input.value) });
  };
  const options = [
    { value: 1, name: "jan" },
    { value: 2, name: "feb" },
    { value: 3, name: "mar" },
    { value: 4, name: "apr" },
    { value: 5, name: "may" },
    { value: 6, name: "jun" },
    { value: 7, name: "jul" },
    { value: 8, name: "aug" },
    { value: 9, name: "sep" },
    { value: 10, name: "oct" },
    { value: 11, name: "nov" },
    { value: 12, name: "dec" },
  ];
  const optionKeys = { value: "value", name: "name" };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      dispatch(updateFyMonth({ baseUrl, data: { month_id: data.monthId } }));
      console.log(data);
      navProps.closeModal();
      toast.success(
        <span className="toast-msg">
          Fy month updated to {options[data.monthId - 1].name}
        </span>
      );
    } catch (er) {}
    setIsLoading(false);
  };

  return (
    <div className="flex flex--column full-height">
      <div className="flex-item-grow">
        {renderSelect({
          label: "select month",
          name: "monthId",
          data,
          handleChange,
          options,
          optionKeys,
        })}
      </div>
      <div className="btn-container-grow">
        {renderButton({
          content: "submit",
          className: "btn--md btn--matte-black",
          onClick: handleSubmit,
          loading: isLoading,
        })}
        {renderButton({
          content: "back",
          className: "btn btn--md btn--matte-black-outline",
          onClick: moveToPrevPage,
        })}
      </div>
    </div>
  );
}

export default FyMonthRangeEdit;
