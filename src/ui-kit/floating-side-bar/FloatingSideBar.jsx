import React, { useCallback, useEffect } from "react";
import SideBarNav from "../side-bar-nav/SideBarNav";
import UserMedia from "../user-media/UserMedia";
import { motion as m, AnimatePresence } from "framer-motion";
import "./floatingSideBar.scss";

function FloatingSideBar({
  displayFloatingSideBar,
  setDisplayFloatingSideBar,
  appNavData,
}) {
  const handleClickOutside = useCallback(() => {
    setDisplayFloatingSideBar(false);
  }, []);

  useEffect(() => {
    if (displayFloatingSideBar) {
      document.addEventListener("click", handleClickOutside);
    }
    if (!displayFloatingSideBar) {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [displayFloatingSideBar]);

  return (
    <AnimatePresence>
      {displayFloatingSideBar && (
        <>
          <div className="floating-side-bar-overlay"></div>
          <div
            className="floating-side-bar-container"
            onClick={(e) => e.stopPropagation()}
          >
            <UserMedia />
            <SideBarNav appNavData={appNavData} />
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default FloatingSideBar;
