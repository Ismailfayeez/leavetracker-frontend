import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { MY_TEAM_URL } from '../../../apiConstants';
import {
  leaveTrackerModalNames,
  LEAVETRACKER_PATH_NAMES,
  LEAVETRACKER_SECTION_NAMES
} from '../../../leaveTracker.constants';
import { loadGroups } from '../../../store/groups';
import LoadingScreen from '../../../../../ui-kit/loading/loadingScreen/LoadingScreen';
import GroupCard from '../../../../../ui-kit/cards/apps/leavetracker/group-card/GroupCard';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import '../groups.scss';
import AddButton from '../../../../../ui-kit/button/add-button/AddButton';
import { ReactComponent as AddTasksImg } from '../../../../../assets/images/add-tasks.svg';
import { listVariant } from '../../../../../utilities/AnimateVariants';

function MyGroups() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myGroups: myGroupsPathName } = LEAVETRACKER_PATH_NAMES;
  const { myGroups: myGroupsSectionName } = LEAVETRACKER_SECTION_NAMES;
  const [
    {
      openModal,

      moveToNextNav
    }
  ] = useModalNav(ModalNavContext);
  const groups = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups[myGroupsSectionName]
  );
  const handleOpenNewGroup = () => {
    openModal();
    moveToNextNav({}, leaveTrackerModalNames.addNewGroup);
  };
  useEffect(() => {
    dispatch(loadGroups({ name: myGroupsSectionName, url: MY_TEAM_URL }));
  }, [dispatch, myGroupsSectionName]);

  if (groups.isLoading) return <LoadingScreen />;
  if (groups.list.length <= 0)
    return (
      <div className="flex flex--column flex--center gap--10px">
        <AddTasksImg className="illustration base-size" />
        <AddButton onClick={handleOpenNewGroup} content="Add group" />
      </div>
    );
  return (
    <div className="my-groups flex flex--column gap--10px">
      <div className="flex flex-justify--space-between flex-align--center margin-bottom--1">
        <p>{`Total group(s) :${groups.list.length}`}</p>
        <AddButton onClick={handleOpenNewGroup} content="Add group" iconOnMobileScreen />
      </div>
      <div className="group-items-container">
        {groups.list.map((group) => (
          <m.div
            key={group.id}
            variants={listVariant}
            layout
            initial="hidden"
            animate="visible"
            className="overflow--hidden">
            <GroupCard
              className="card--grey-paste"
              group={group}
              handleGroupName={() => navigate(`${myGroupsPathName}/${group.id}`)}
            />
          </m.div>
        ))}
      </div>
    </div>
  );
}

export default MyGroups;
