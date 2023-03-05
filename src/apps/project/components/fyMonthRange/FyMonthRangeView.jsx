import moment from "moment";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { usePageNav } from "../../../../utilities/hooks/usePageNav";
import { PageNavContext } from "../../../../utilities/context/PageNavContext";
import InfoDisplay from "../../../../ui-kit/info-display/InfoDisplay";
function FyMonthRangeView(props) {
  const fyMonthNumber = useSelector(
    (state) => state.entities.projects.core.fyMonth.month
  );
  const [{ moveToNextPage }] = usePageNav(PageNavContext);
  const fyMonth = moment(fyMonthNumber, "M").format("MMMM");
  return (
    <div className="flex flex--column height-100-percent">
      <div className="flex-item-grow-1">
        <InfoDisplay item={{ fyMonth }} name="fyMonth" label="start month" />
      </div>
      <div className="flex flex--center flex-wrap btn-container btn-items-grow">
        <button
          className="btn btn--md btn--matte-black"
          onClick={() => moveToNextPage("edit")}
        >
          edit
        </button>
      </div>
    </div>
  );
}

export default FyMonthRangeView;
