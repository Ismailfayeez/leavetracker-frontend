import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFyMonth } from "../../store/projects";
import { useParams } from "react-router-dom";
import { MY_PROJECTS_URL } from "../../apiConstants";
import LoadingScreen from "../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import PageNavigation from "../utilities/page-navigation/PageNavigation";
import FyMonthRangeView from "./FyMonthRangeView";
import FyMonthRangeEdit from "./FyMonthRangeEdit";
function FyMonth(props) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/fy-month/`;

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await dispatch(loadFyMonth({ baseUrl }));
    } catch (err) {}
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const pages = [
    {
      name: "view",
      component: <FyMonthRangeView />,
    },
    {
      name: "edit",
      component: <FyMonthRangeEdit />,
    },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="project-section-detail full-height">
          <PageNavigation pages={pages} defaultPage="view" />
        </div>
      )}
    </>
  );
}

export default FyMonth;
