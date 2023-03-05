import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCoreAccessList } from "../../../store/projects";
import { usePageNav } from "../../../../../utilities/hooks/usePageNav";
import { PageNavContext } from "../../../../../utilities/context/PageNavContext";
import { renderButton } from "../../../../../utilities/uiElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import "./manageAccessEdit.scss";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
function ManageAccessEdit({ sectionConstants }) {
  const dispatch = useDispatch();
  const { name, totalAccessName, baseUrl, id } = sectionConstants;
  const [{ moveToPrevPage }] = usePageNav(PageNavContext);
  const [{ closeModal }] = useModalNav(ModalNavContext);
  const sectionDataDetail = useSelector(
    (state) => state.entities.projects.core[name].detail
  );
  const currentList = sectionDataDetail.access;
  const totalList = useSelector(
    (state) => state.entities.projects.accessList[totalAccessName]
  );
  const currentCode = currentList.map((item) => item.code);
  const initialState = {
    currentList,
    availableList: totalList.filter((item) => !currentCode.includes(item.code)),
  };
  const [data, setData] = useState({ ...initialState });

  const [selected, setSelected] = useState([]);
  useEffect(() => {
    setData({ ...initialState }, [currentList, totalList]);
  }, []);

  const handleSelect = (code) => {
    console.log(code);
    const data = [...selected];
    let index = data.findIndex((item) => item === code);
    if (index != -1) {
      data.splice(index, 1);
      setSelected(data);
    } else {
      setSelected([...selected, code]);
    }
  };
  const moveSelected = (source, target) => {
    const result = { source: [], target: [] };
    const selectedItems = source.filter((item) => selected.includes(item.code));
    result["source"] = source.filter((item) => !selected.includes(item.code));
    result["target"] = [...target, ...selectedItems];
    const selectedCodes = selectedItems.map((item) => item.code);
    setSelected(selected.filter((item) => !selectedCodes.includes(item)));
    return result;
  };

  const addToCurrentList = () => {
    const result = moveSelected(data.availableList, data.currentList);
    setData({
      availableList: result.source,
      currentList: result.target,
    });
  };
  const removeFromCurrentList = () => {
    const result = moveSelected(data.currentList, data.availableList);
    setData({
      currentList: result.source,
      availableList: result.target,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        access_code_list: [...data.currentList.map((item) => item.code)],
      };

      await dispatch(
        updateCoreAccessList({ baseUrl, name, id, data: postData })
      );
      closeModal();
    } catch (err) {}
  };
  return (
    <div className="manage-access-edit">
      <header>
        <p className="mb-0 bold">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="back-arrow"
            onClick={moveToPrevPage}
          />
          Edit
        </p>
      </header>
      <div className="content-grow">
        current list:
        <div className="flex flex-wrap">
          {data.currentList.map((item) => (
            <span
              className={`badge ${
                selected.includes(item.code)
                  ? "badge--black"
                  : "badge--bluish-white"
              }`}
              onClick={() => handleSelect(item.code)}
            >
              {item.name}
            </span>
          ))}
        </div>
        available list:
        <div className="flex flex-wrap">
          {data.availableList.map((item) => (
            <span
              className={`badge ${
                selected.includes(item.code)
                  ? "badge--black"
                  : "badge--bluish-white"
              }`}
              onClick={() => handleSelect(item.code)}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex--center flex-wrap btn-container btn-items-grow">
        {renderButton({
          content: "add",
          className: "btn--md btn--matte-black",
          onClick: addToCurrentList,
        })}

        {renderButton({
          content: "remove",
          className: "btn--md btn--brown",
          onClick: removeFromCurrentList,
        })}
        {renderButton({
          content: "submit",
          className: "btn--md btn--matte-black",
          onClick: handleSubmit,
        })}
      </div>
    </div>
  );
}

export default ManageAccessEdit;
