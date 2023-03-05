import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { sliceFirstLettersOfSentence } from "../../../../../utilities/helper";
import { renderButton } from "../../../../../utilities/uiElements";
import { MY_TEAM_URL } from "../../../apiConstants";
import {
  leaveTrackerModalNames,
  LEAVETRACKER_PATH_NAMES,
  LEAVETRACKER_SECTION_NAMES,
} from "../../../leaveTracker.constants";
import { loadGroups } from "../../../store/groups";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import GroupCard from "../../../../../ui-kit/cards/apps/leavetracker/group-card/GroupCard";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import "../groups.scss";
import AddButton from "../../../../../ui-kit/button/add-button/AddButton";
import { ReactComponent as AddTasksImg } from "../../../../../assets/images/add-tasks.svg";
function MyGroups(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myGroups: myGroupsPathName } = LEAVETRACKER_PATH_NAMES;
  const { myGroups: myGroupsSectionName } = LEAVETRACKER_SECTION_NAMES;
  const [
    {
      openModal,

      moveToNextNav,
    },
  ] = useModalNav(ModalNavContext);
  const groups = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.groups[
        myGroupsSectionName
      ]
  );

  useEffect(() => {
    dispatch(loadGroups({ name: myGroupsSectionName, url: MY_TEAM_URL }));
  }, []);

  const handleOpenNewGroup = () => {
    openModal();
    moveToNextNav({}, leaveTrackerModalNames.addNewGroup);
  };
  if (groups.isLoading) return <LoadingScreen />;
  if (groups.list.length <= 0)
    return (
      <div className="flex flex--column flex--center gap--1rem">
        <AddTasksImg className="illustration base-size" />
        <AddButton onClick={handleOpenNewGroup} content="Add group" />
      </div>
    );
  return (
    <div className="my-groups">
      <div className="flex--space-between-align-center mb-1">
        <p>{`Total group(s) :${groups.list.length}`}</p>
        <AddButton
          onClick={handleOpenNewGroup}
          content="Add group"
          iconOnMobileScreen
        />
      </div>
      <div className="group-items-container">
        {groups.list.map((group, index) => (
          <GroupCard
            className="card--grey-paste"
            group={group}
            handleGroupName={() => navigate(`${myGroupsPathName}/${group.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default MyGroups;
