import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserProfileImageHolder from "../user-profile-image-holder/UserProfileImageHolder";
import "./userMedia.scss";
function UserMedia({}) {
  const userData = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data
  );
  return (
    userData.email && (
      <div className="media-container user-media user-media--bluish user">
        <div className="media-img user__img">
          <UserProfileImageHolder sentence={userData.username} />
        </div>
        <div className="media-content">
          <div className="user__name label">
            <Link className="link-style-disable" to="/my-profile">
              {userData.username}
            </Link>
          </div>
          <div className="user__email sub-text">{userData.email}</div>
        </div>
      </div>
    )
  );
}

export default UserMedia;
