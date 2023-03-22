import React, { useEffect, useState } from "react";
import SearchList from "../../utilities/search-list/SearchList";
import AnnouncementForm from "../announcement-form/AnnouncementForm";
import Modal from "../../../../../ui-kit/modal/Modal";
import { useDispatch } from "react-redux";
import { loadData } from "../../../../../store/common/dispatchMethods";
import { AddQueryParamToUrl } from "../../../../../utilities/queryParamGenerator";
import { MY_TEAM_URL } from "../../../apiConstants";
import useValidator from "../../../../../utilities/hooks/useValidator";
import createAnnouncementSchema from "../announcement-form/createAnnouncement.schema";
import { createAnnouncement } from "../../../store/announcements";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
import { toast } from "react-toastify";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
function CreateAnnouncement(props) {
  const dispatch = useDispatch();
  const [{ closeModal }] = useModalNav(ModalNavContext);
  const [displaySearchGroups, setDisplaySearchGroups] = useState(false);
  const handleDisplaySearchGroups = () =>
    setDisplaySearchGroups(!displaySearchGroups);

  const handleSelected = (teams) => {
    const newTeamList = [...data.teams, ...teams];
    setData({ ...data, teams: newTeamList });
    handleBlur({ currentTarget: { name: "teams", value: newTeamList } });
    handleDisplaySearchGroups();
  };
  const onSearch = async (input) =>
    await dispatch(
      loadData(AddQueryParamToUrl(MY_TEAM_URL, { search: input.value }))
    );
  const initialState = {
    title: "",
    message: "",
    teams: [],
    expiryDate: "",
    priority: "",
  };
  const [data, setData] = useState(initialState);
  const handleChange = ({ target: input }) =>
    setData({ ...data, [input.name]: input.value });
  const handleBlur = ({ currentTarget: input }) => {
    console.log(input);
    validateProperty(input.name);
  };
  const handleRemoveTeam = (id) => {
    const removedTeamData = data.teams.filter((team) => team.id != id);
    setData({ ...data, teams: removedTeamData });
    handleBlur({ currentTarget: { name: "teams", value: removedTeamData } });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return;
    try {
      const { title, message, priority, expiryDate, teams } = data;
      const postData = {
        title,
        message,
        priority,
        expiry_date: expiryDate,
        team_list: teams.map((team) => team.id),
      };
      await dispatch(createAnnouncement(postData));
      closeModal();
      toast.success(
        <span className="toast-msg">Announcement created successfully</span>
      );
    } catch (err) {}
    console.log(data);
  };
  const [errors, setErrors, validateForm, validateProperty] = useValidator(
    data,
    createAnnouncementSchema
  );
  useEffect(() => {
    handleBlur({ currentTarget: { name: "teams" } });
  }, [data.teams]);
  useEffect(() => {
    setErrors({});
  }, []);
  console.log(data.teams);
  return (
    <>
      {displaySearchGroups && (
        <Modal
          open={displaySearchGroups}
          handleClose={handleDisplaySearchGroups}
          height="lg"
          width="sm"
          title="Search Groups"
        >
          <SearchList
            onSearch={onSearch}
            handleSelected={handleSelected}
            existingList={data.teams}
            idField="id"
            titleField="name"
            subTitleField="description"
          />
        </Modal>
      )}
      <AnnouncementForm
        data={data}
        errors={errors}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleDisplaySearchGroups={handleDisplaySearchGroups}
        handleRemoveTeam={handleRemoveTeam}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default CreateAnnouncement;
