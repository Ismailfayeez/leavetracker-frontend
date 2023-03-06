import React, { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import "../../styles/scss/utilities.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import UserProfileImageHolder from "../user-profile-image-holder/UserProfileImageHolder";
import { useCallback } from "react";

function NavBar(props) {
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data
  );
  const userLtData = currentUser.leaveTracker;
  const [displayUserDropdown, setDisplayUserDropDown] = useState(false);
  const userInfoDropDownRef = useRef(null);
  const handleDisplayUserDropDown = (e) => {
    e.stopPropagation();
    console.log("handle");
    setDisplayUserDropDown(!displayUserDropdown);
  };

  const handleClickOutside = useCallback((event) => {
    console.log("calledd||||");
    if (
      userInfoDropDownRef.current &&
      !userInfoDropDownRef.current.contains(event.target)
    ) {
      setDisplayUserDropDown(false);
    }
  }, []);

  useEffect(() => {
    console.log("displayUserDropdown", displayUserDropdown);
    if (displayUserDropdown) {
      document.addEventListener("click", handleClickOutside);
    }
    if (!displayUserDropdown) {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [displayUserDropdown]);
  useEffect(() => {
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <nav className={`navbar ${currentUser.email ? "" : "flex--center"}`}>
      <Link className="navbar__brand link-style-disable" to="/">
        Track it
      </Link>

      {currentUser.email && (
        <section className="flex flex--center user">
          {userLtData.currentProject && (
            <div className="navbar__item  user__project-name">
              {userLtData.currentProject.name}
            </div>
          )}

          <div className="navbar__item user__img-holder">
            <UserProfileImageHolder
              sentence={currentUser.username}
              onClick={handleDisplayUserDropDown}
            />
            {displayUserDropdown && (
              <div
                ref={userInfoDropDownRef}
                className={`dropdown-menu-container`}
              >
                <FontAwesomeIcon icon={faCaretUp} className="caret" />
                <ul className="dropdown-menu">
                  <li className="dropdown-menu__item">
                    <div
                      className="user__info"
                      onClick={() => {
                        setDisplayUserDropDown(false);
                        navigate("/my-profile");
                      }}
                    >
                      <div className="user__name">{currentUser.username}</div>
                      <div className="user__email">{currentUser.email}</div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="navbar__item navbar__bars-container">
            <FontAwesomeIcon
              icon={faBars}
              className="navbar__bars"
              onClick={(e) => {
                e.stopPropagation();
                props.handleDisplayFloatingSideBar();
              }}
            />
          </div>
        </section>
      )}
    </nav>
  );
}

export default NavBar;
