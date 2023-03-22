import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddButton from "../../../../ui-kit/button/add-button/AddButton";
import AnnouncementCard from "../../../../ui-kit/cards/apps/leavetracker/announcement-card/AnnouncementCard";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import { leaveTrackerModalNames } from "../../leaveTracker.constants";
import { loadAnnouncements } from "../../store/announcements";
import NoResult from "../../../../ui-kit/no-result/NoResult";
import "./announcements.scss";
import LoadingScreen from "../../../../ui-kit/loading/loadingScreen/LoadingScreen";

function Announcements(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const announcementsList = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.announcements.list
  );
  const data = announcementsList.data;

  const fetchData = async () => {
    if (!isLoading) setIsLoading(true);
    if (!announcementsList.lastFetch) {
      await dispatch(loadAnnouncements());
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleTitle = (id) => {
    console.log("swewedw");
    openModal();
    moveToNextNav({ id }, leaveTrackerModalNames.announcementDetail);
  };
  const handleAdd = () => {
    openModal();
    moveToNextNav({}, leaveTrackerModalNames.createAnnouncement);
  };
  if (isLoading) return <LoadingScreen />;
  return (
    <div className="announcements page-layout flex flex--column gap--20px">
      <header className="page-layout__header flex flex-justify--space-between flex-align--center">
        <h3 className="margin-bottom--0">Announcements</h3>
        <AddButton
          content="new announcement"
          iconOnMobileScreen
          onClick={handleAdd}
        />
      </header>

      <main className="page-layout__main grid gap--20px grid--1x2 grid--tablet">
        {data.length > 0 ? (
          data.map((item) => (
            <AnnouncementCard data={item} handleTitle={handleTitle} />
          ))
        ) : (
          <NoResult statement="No Announcement found" />
        )}
      </main>
    </div>
  );
}

export default Announcements;
