import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { renderButton } from '../../../utilities/uiElements';

function EditButton({ content, ...otherProps }) {
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
          <div className="add-button flex flex--center gap--5px">
            <FontAwesomeIcon icon={faPencil} className="add-icon color--black" />
            <span className="display--tablet">{content}</span>
          </div>
        ),
        className: `btn--md ${
          screenSize.width > 480 ? 'btn--matte-black-outline' : 'btn--transparent'
        }`,

        ...otherProps
      })}
    </>
  );
}

export default EditButton;
