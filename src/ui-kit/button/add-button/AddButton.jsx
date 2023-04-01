import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { renderButton } from '../../../utilities/uiElements';
import './addButton.scss';

function AddButton({ content, iconOnMobileScreen, ...otherProps }) {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {renderButton({
        content: (
          <div className="add-button">
            {iconOnMobileScreen && (
              <span className="display--mobile-only mobile">
                <FontAwesomeIcon icon={faPlus} className="add-icon color--black mobile" />
              </span>
            )}
            <span
              className={`flex flex--center gap--5px ${
                iconOnMobileScreen ? 'display--tablet' : ''
              }`}>
              <FontAwesomeIcon icon={faPlus} className="add-icon color--black" />
              {content}
            </span>
          </div>
        ),
        className: `btn--md ${
          screenSize.width > 480 || !iconOnMobileScreen
            ? 'btn--matte-black-outline'
            : 'btn--transparent'
        }`,
        ...otherProps
      })}
    </>
  );
}

export default AddButton;
