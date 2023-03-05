import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { usePageNav } from "../../../../../utilities/hooks/usePageNav";
import { PageNavContext } from "../../../../../utilities/context/PageNavContext";
import "./manageAccessView.scss";
import { renderButton } from "../../../../../utilities/uiElements";
function ManageAccessView({ sectionConstants, handleBack }) {
  const { name } = sectionConstants;
  const sectionDataDetail = useSelector(
    (state) => state.entities.projects.core[name].detail
  );

  const [{ moveToNextPage }] = usePageNav(PageNavContext);
  const accessList = sectionDataDetail.access;
  return (
    <div className="manage-access-view">
      <div className="flex-item-grow-1">
        <label className="">Current Access list:</label>
        <div className="flex flex-wrap">
          {accessList.map((item) => (
            <span className="badge badge--bluish-white">{item.name}</span>
          ))}
        </div>
      </div>
      <div className="flex flex--center flex-wrap btn-container btn-items-grow">
        {renderButton({
          content: "edit",
          className: "btn--md btn--matte-black",
          onClick: () => moveToNextPage("manageAccessEdit"),
        })}
        {renderButton({
          content: "back",
          className: "btn--md btn--matte-black-outline",
          onClick: handleBack,
        })}
      </div>
    </div>
  );
}

export default ManageAccessView;
