import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import UserProfileImageHolder from "../../ui-kit/user-profile-image-holder/UserProfileImageHolder";
import logo from "../../assets/images/logo3.png";
import "./navContent.scss";

function NavContent(props) {
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data
  );
  const userLtData = currentUser.leaveTracker;
  const [displayUserDropdown, setDisplayUserDropDown] = useState(false);
  const userInfoDropDownRef = useRef(null);

  const handleDisplayUserDropDown = (e) => {
    e.stopPropagation();
    setDisplayUserDropDown(!displayUserDropdown);
  };

  const handleClickOutside = useCallback((event) => {
    if (
      userInfoDropDownRef.current &&
      !userInfoDropDownRef.current.contains(event.target)
    ) {
      setDisplayUserDropDown(false);
    }
  }, []);

  useEffect(() => {
    if (displayUserDropdown) {
      document.addEventListener("click", handleClickOutside);
    }
    if (!displayUserDropdown) {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [displayUserDropdown]);

  return (
    <div
      className={`nav-content ${
        currentUser.email ? "flex-justify--space-between" : "flex--center"
      }`}
    >
      <Link className="nav-content__brand link-style-disable" to="/">
        <img src={logo} />
      </Link>
      {currentUser.email && (
        <section className="nav-user flex flex--center">
          {userLtData.currentProject && (
            <div className="nav-content__item nav-user__project-name">
              {userLtData.currentProject.name}
            </div>
          )}

          <div className="nav-content__item nav-user__img-holder display--desktop">
            <UserProfileImageHolder
              sentence={currentUser.username}
              onClick={handleDisplayUserDropDown}
            />
            {displayUserDropdown && (
              <div ref={userInfoDropDownRef} className="nav-dropdown-container">
                <FontAwesomeIcon icon={faCaretUp} className="caret" />
                <ul className="nav-dropdown">
                  <li className="nav-dropdown__item">
                    <div
                      className="nav-user__info"
                      onClick={() => {
                        setDisplayUserDropDown(false);
                        navigate("/my-profile");
                      }}
                    >
                      <div className="nav-user__name">
                        {currentUser.username}
                      </div>
                      <div className="nav-user__email">{currentUser.email}</div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="nav-content__item bars-container">
            <FontAwesomeIcon
              icon={faBars}
              className="bars"
              onClick={(e) => {
                e.stopPropagation();
                props.handleDisplayFloatingSideBar();
              }}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default NavContent;
