import React, { useEffect } from "react";
import InfoDisplayList from "../../../../../ui-kit/info-display-list/InfoDisplayList";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
import {
  announcementDetailCleared,
  loadAnnouncementDetail,
} from "../../../store/announcements";
import { useSelector, useDispatch } from "react-redux";
import { leaveTrackerModalNames } from "../../../leaveTracker.constants";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
function AnnouncementDetail(props) {
  const dispatch = useDispatch();
  const [{ globalVal }] = useModalNav(ModalNavContext);
  const announcementsDetail = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.announcements.detail
  );
  const isLoading = announcementsDetail.isLoading;
  const announcementDetailVal =
    globalVal[leaveTrackerModalNames.announcementDetail] || {};
  const data = announcementsDetail.data;
  console.log(data);
  const columns = [
    { name: "title", label: "Title" },
    { name: "message", label: "Message" },
    {
      name: "teams",
      label: "Groups",
      getBodyContent: (data) => (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "rgb(232, 238, 240)",
            borderRadius: "1rem",
          }}
          className="flex flex-wrap gap--10px"
        >
          {data.teams.map((group) => (
            <span className="badge badge badge--black-outline sub-text">
              {group.name}
            </span>
          ))}
        </div>
      ),
    },
  ];
  useEffect(() => {
    dispatch(loadAnnouncementDetail(announcementDetailVal.id));
    return () => {
      dispatch(announcementDetailCleared());
    };
  }, []);
  return (
    <div className="full-height ">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <InfoDisplayList columns={columns} data={[data]} />
      )}
    </div>
  );
}

export default AnnouncementDetail;
