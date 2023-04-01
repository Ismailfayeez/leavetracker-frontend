import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddButton from '../../../../ui-kit/button/add-button/AddButton';
import AnnouncementCard from '../../../../ui-kit/cards/apps/leavetracker/announcement-card/AnnouncementCard';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../utilities/hooks/useModalNav';
import { leaveTrackerModalNames } from '../../leaveTracker.constants';
import { loadAnnouncements, updateAnnouncementViewedStatus } from '../../store/announcements';
import NoResult from '../../../../ui-kit/no-result/NoResult';
import './announcements.scss';
import LoadingScreen from '../../../../ui-kit/loading/loadingScreen/LoadingScreen';

function Announcements() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const announcements = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.announcements.list.data
  );
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    await dispatch(loadAnnouncements());
    setIsLoading(false);
  }, [dispatch]);

  const handleTitle = (id) => {
    openModal();
    moveToNextNav({ id }, leaveTrackerModalNames.announcementDetail);
  };
  const handleAdd = () => {
    openModal();
    moveToNextNav({}, leaveTrackerModalNames.createAnnouncement);
  };
  useEffect(() => {
    fetchData();
    return () => {
      dispatch(updateAnnouncementViewedStatus());
    };
  }, [dispatch, fetchData]);
  if (isLoading) return <LoadingScreen />;
  return (
    <div className="announcements page-layout flex flex--column gap--20px">
      <header className="page-layout__header flex flex-justify--space-between flex-align--center">
        <h3 className="margin-bottom--0">Announcements</h3>
        <AddButton content="new announcement" iconOnMobileScreen onClick={handleAdd} />
      </header>

      <main className="page-layout__main ">
        {announcements.length > 0 ? (
          <div className="grid gap--20px grid--1x2 grid--tablet">
            {announcements.map((item) => (
              <AnnouncementCard key={item.id} data={item} handleTitle={handleTitle} />
            ))}
          </div>
        ) : (
          <NoResult statement="No Announcement found" />
        )}
      </main>
    </div>
  );
}

export default Announcements;
