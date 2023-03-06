import React, { useCallback, useEffect } from "react";
import SideBarNav from "../side-bar-nav/SideBarNav";
import UserMedia from "../user-media/UserMedia";
import { motion as m, AnimatePresence } from "framer-motion";
import "./floatingSideBar.scss";
import {
  floatingSideBarVariant,
  overlayVariant,
} from "../../utilities/AnimateVariants";

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
          <m.div
            variants={overlayVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="floating-side-bar-overlay"
          ></m.div>
          <m.div
            variants={floatingSideBarVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="floating-side-bar-container"
            onClick={(e) => e.stopPropagation()}
          >
            <UserMedia />
            <SideBarNav appNavData={appNavData} />
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default FloatingSideBar;
