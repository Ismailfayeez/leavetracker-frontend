import React from 'react';
import { useSelector } from 'react-redux';
import usePageNav from '../../../../../utilities/hooks/usePageNav';
import { PageNavContext } from '../../../../../utilities/context/PageNavContext';
import './manageAccessView.scss';
import { renderButton } from '../../../../../utilities/uiElements';

function ManageAccessView({ sectionConstants, handleBack }) {
  const { name } = sectionConstants;
  const sectionDataDetail = useSelector((state) => state.entities.projects.core[name].detail);

  const [{ moveToNextPage }] = usePageNav(PageNavContext);
  const accessList = sectionDataDetail.access;
  return (
    <div className="manage-access-view">
      <div className="flex-item-grow">
        <p className="info-label">Current Access list:</p>
        <div className="flex flex-wrap">
          {accessList.map((item) => (
            <span className="badge sub-text badge--primary" key={item.code}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <div className="btn-container-grow">
        {renderButton({
          content: 'edit',
          className: 'btn--md btn--matte-black',
          onClick: () => moveToNextPage('manageAccessEdit')
        })}
        {renderButton({
          content: 'back',
          className: 'btn--md btn--matte-black-outline',
          onClick: handleBack
        })}
      </div>
    </div>
  );
}

export default ManageAccessView;
