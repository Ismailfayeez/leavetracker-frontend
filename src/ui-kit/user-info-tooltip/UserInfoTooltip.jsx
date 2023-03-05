import React from "react";

function UserInfoTooltip(props) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef]);
  return (
    <div>
      <div onClick={() => setIsVisible(!isVisible)}>{children}</div>
      {!isVisible && (
        <div
          className={`dropdown-menu-container`}
          id="user-short-info"
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon icon={faCaretUp} className="caret" />
          <ul className="dropdown-menu">
            <li className="dropdown-menu__item">
              <div
                className="user__info"
                onClick={() => {
                  handleDisplayUserDropDown();
                  navigate("/my-profile");
                }}
                id="user-short-info1"
              >
                <div className="user__name">{userData.username}</div>
                <div className="user__email">{userData.email}</div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserInfoTooltip;
