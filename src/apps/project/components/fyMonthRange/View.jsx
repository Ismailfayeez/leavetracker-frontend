import moment from "moment";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { LocationContext } from "../../../leave-tracker/common/context/LocationContext";
import { useGlobalNavPages } from "../utilities/useGlobalNavPages";
import InfoDisplay from "../../../../ui-kit/info-display/InfoDisplay";
function View(props) {
  const fyMonthNumber = useSelector(
    (state) => state.entities.projects.core.fyMonth.month
  );
  const [{ handleForward }] = useGlobalNavPages(LocationContext);
  const fyMonth = moment(fyMonthNumber, "M").format("MMMM");
  return (
    <div className="flex flex--column full-height">
      <div className="flex-item-grow">
        <InfoDisplay item={{ fyMonth }} name="fyMonth" label="start month" />
      </div>
      <div className="btn-container-grow">
        <button
          className="btn btn--md btn--matte-black"
          onClick={() => handleForward("edit")}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default View;
