import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import { LEAVETRACKER_PATH_NAMES } from "../../../leaveTracker.constants";
import {
  groupDetailReceived,
  loadGroupDetail,
  loadGroupMembers,
  removeGroupMember,
  updateGroupMember,
} from "../../../store/groups";
import { ALL_TEAM_URL, MY_TEAM_URL } from "../../../apiConstants";
import "./groupDetail.scss";
import GroupView from "../group-view/GroupView";

function GroupDetail(props) {
  const { myGroups: myGroupsPathName, allGroups: allGroupsPathName } =
    LEAVETRACKER_PATH_NAMES;
  const allowedPathNames = [myGroupsPathName, allGroupsPathName];
  const { groupsPathName, groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const groupDetail = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups.detail
  );
  const { isLoading } = groupDetail;
  let baseUrl;
  if (groupsPathName == myGroupsPathName) baseUrl = MY_TEAM_URL;
  else if (groupsPathName == allGroupsPathName) baseUrl = ALL_TEAM_URL;

  const fetchData = async () => {
    try {
      await dispatch(loadGroupDetail({ baseUrl, id: groupId }));
      return;
    } catch (err) {
      navigate("/lt/not-found");
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await dispatch(removeGroupMember({ baseUrl, memberId, groupId }));
      await dispatch(loadGroupMembers({ baseUrl, groupId }));
    } catch (err) {}
  };

  const handleDismissAsAdmin = async (memberId) => {
    try {
      await dispatch(
        updateGroupMember({ baseUrl, memberId, groupId, data: { role: "P" } })
      );
      await dispatch(loadGroupMembers({ baseUrl, groupId }));
    } catch (err) {}
  };

  const handleMakeAsAdmin = async (memberId) => {
    try {
      await dispatch(
        updateGroupMember({ baseUrl, memberId, groupId, data: { role: "A" } })
      );
      await dispatch(loadGroupMembers({ baseUrl, groupId }));
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(
        groupDetailReceived({
          data: { name: "", description: "", team_members: [] },
        })
      );
    };
  }, []);

  if (!allowedPathNames.includes(groupsPathName)) navigate("/lt/not-found");

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="group-detail">
      <GroupView
        access={{
          edit: groupsPathName == myGroupsPathName ? true : false,
          delete: groupsPathName == myGroupsPathName ? true : false,
        }}
        handleRemoveMember={handleRemoveMember}
        handleMakeAsAdmin={handleMakeAsAdmin}
        handleDismissAsAdmin={handleDismissAsAdmin}
      />
    </div>
  );
}

export default GroupDetail;
