import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LEAVETRACKER_SECTION_NAMES,
  LEAVETRACKER_PATH_NAMES,
} from "../../../leaveTracker.constants";
import { loadGroups, subscribeGroup } from "../../../store/groups";
import { ALL_TEAM_URL } from "../../../apiConstants";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import GroupCard from "../../../../../ui-kit/cards/apps/leavetracker/group-card/GroupCard";
import { ReactComponent as EmptyImg } from "../../../../../assets/images/empty.svg";
import "../groups.scss";
function AllGroups(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allGroups: allGroupsSectionName } = LEAVETRACKER_SECTION_NAMES;
  const { allGroups: allGroupsPathName } = LEAVETRACKER_PATH_NAMES;
  const groups = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.groups[
        allGroupsSectionName
      ]
  );

  const handleSubscribe = (id) =>
    dispatch(subscribeGroup({ url: ALL_TEAM_URL, id }));
  useEffect(() => {
    dispatch(loadGroups({ url: ALL_TEAM_URL, name: allGroupsSectionName }));
  }, []);

  if (groups.isLoading) return <LoadingScreen />;
  if (groups.list.length <= 0)
    return (
      <div className="flex flex--column flex--center gap--1rem">
        <EmptyImg className="illustration base-size" />
        <p>No groups found</p>
      </div>
    );

  return (
    <div>
      <div className="all-groups">
        <div className="flex--space-between-align-center mb-1">
          <p>{`Total group(s) :${groups.list.length}`}</p>
        </div>
        <div className="grid group-items-container">
          {groups.list.map((group, index) => (
            <GroupCard
              className="card--orange"
              group={group}
              handleGroupName={() =>
                navigate(`${allGroupsPathName}/${group.id}`)
              }
              enableSubscribeBtn={group.enable_subscription}
              handleSubscribe={() => handleSubscribe(group.id)}
              handleUnSubscribe={() => handleSubscribe(group.id)}
              subscribed={group.subscribed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllGroups;
