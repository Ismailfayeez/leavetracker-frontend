import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import InfoDisplayList from "../../../../../ui-kit/info-display-list/InfoDisplayList";
import { loadData } from "../../../../../store/common/dispatchMethods";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import { leaveTrackerModalNames } from "../../../leaveTracker.constants";
import { ABSENTEES_URL } from "../../../apiConstants";
import "./absentees.scss";
function AbsenteeDetail(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [{ globalVal }] = useModalNav(ModalNavContext);
  const { date, employeeId } =
    globalVal[leaveTrackerModalNames.absenteeDetail] || {};
  const columns = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    {
      name: "team_list",
      label: "Groups",
      getBodyContent: (absentee) => {
        const { team_list = [] } = absentee;
        return <div>{team_list.join(", ")}</div>;
      },
    },
    {
      name: "upcoming_leaves",
      label: "Upcoming Leaves",
      getBodyContent: (absentee) => {
        const { upcoming_leaves = [] } = absentee;
        return upcoming_leaves.length > 0 ? (
          <div className="leave-dates__body">
            {upcoming_leaves.map((leave) => (
              <span
                key={leave}
                className="leave-dates__item badge badge--primary sub-text text-overflow--ellipsis"
              >
                {leave}
              </span>
            ))}
          </div>
        ) : (
          "none"
        );
      },
    },
  ];
  const fetchData = async () => {
    const url = ABSENTEES_URL + `?date=${date}&emp=${employeeId}`;
    try {
      const response = await dispatch(loadData(url));
      setData(response.data);
    } catch (err) {}
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <InfoDisplayList
          data={[data]}
          columns={columns}
          className="flex flex--column gap--10px"
        />
      )}
    </>
  );
}

export default AbsenteeDetail;
