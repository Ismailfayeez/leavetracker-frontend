import React, { useCallback, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import UserMedia from '../user-media/UserMedia';
import './floatingSideBar.scss';
import { floatingSideBarVariant, overlayVariant } from '../../utilities/AnimateVariants';
import SideBar from '../sidebar/SideBar';

function FloatingSideBar({ displayFloatingSideBar, setDisplayFloatingSideBar, menuSectionList }) {
  const handleClickOutside = useCallback(() => {
    setDisplayFloatingSideBar(false);
  }, [setDisplayFloatingSideBar]);

  useEffect(() => {
    if (displayFloatingSideBar) {
      document.addEventListener('click', handleClickOutside);
    }
    if (!displayFloatingSideBar) {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [displayFloatingSideBar, handleClickOutside]);

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
          />
          <m.div
            variants={floatingSideBarVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="floating-side-bar-container"
            onClick={(e) => e.stopPropagation()}>
            <UserMedia />
            <SideBar menuSectionList={menuSectionList} />
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default FloatingSideBar;
