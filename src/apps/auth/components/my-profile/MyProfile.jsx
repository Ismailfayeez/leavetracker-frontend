import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InfoDisplayList from "../../../../ui-kit/info-display-list/InfoDisplayList";
import InfoDisplay from "../../../../ui-kit/info-display/InfoDisplay";
import Modal from "../../../../ui-kit/modal/Modal";
import { renderButton } from "../../../../utilities/uiElements";
import { COUNTRY_URL, TIMEZONE_URL } from "../../apiConstants";
import { loadUtils } from "../../store/userProfile";
import EditProfile from "../edit-profile/EditProfile";
import "./myProfile.scss";
import { toast } from "react-toastify";
function MyProfile({ handleLogoutUser }) {
  const [displayEditProfileModal, setdisplayEditProfileModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data
  );
  const userLtData = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data.leaveTracker
  );
  const utils = useSelector((state) => state.entities.auth.userProfile.utils);

  const columns = [
    { name: "username", label: "Name" },
    { name: "email", label: "Email" },
  ];

  useEffect(() => {
    if (!utils["countries"]["lastFetch"]) {
      dispatch(loadUtils({ url: COUNTRY_URL, name: "countries" }));
    }
  }, []);
  useEffect(() => {
    if (!utils["timeZone"]["lastFetch"]) {
      dispatch(loadUtils({ url: TIMEZONE_URL, name: "timeZone" }));
    }
  }, []);
  const handleEditSuccess = () => {
    setdisplayEditProfileModal(false);
    toast.success("your profile edited successfully");
  };

  return (
    <section className="my-profile-content-layout">
      <div className="app-content__display-area">
        <div className="app-content__body">
          <Modal
            title="Edit Profile"
            open={displayEditProfileModal}
            handleClose={() => setdisplayEditProfileModal(false)}
            height="md"
            width="sm"
          >
            <EditProfile handleEditSuccess={handleEditSuccess} />
          </Modal>
          <header>
            <h3>My Profile</h3>{" "}
          </header>
          <div className="flex flex--column gap--1rem">
            <InfoDisplayList
              data={[user]}
              columns={columns}
              className="flex flex--column gap--1rem"
            />
            {userLtData.currentProject && (
              <InfoDisplay
                item={{ name: userLtData.currentProject.name }}
                name="name"
                label="Current Project"
              />
            )}

            <Link to="/switch-accounts">switch accounts</Link>
            <div className="flex gap--1rem">
              {renderButton({
                content: "edit profile",
                className: "btn--md btn--brown",
                onClick: () => setdisplayEditProfileModal(true),
              })}
              {renderButton({
                content: "logout",
                className: "btn--md btn--matte-black",
                onClick: handleLogoutUser,
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProfile;
