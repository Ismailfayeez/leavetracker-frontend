import React from 'react';
import { useProjectSectionView } from './useProjectSectionView';
import { renderButton } from '../../../../../utilities/uiElements';
import { projectGlobalModalNav } from '../../../project.constants';
import InfoDisplayList from '../../../../../ui-kit/info-display-list/InfoDisplayList';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import './projectSectionView.scss';

function ProjectSectionView({
  fields,
  sectionConstants,
  sectionId,
  hasPermissionEdit,
  hasPermissionDelete
}) {
  const [{ moveToNextNav, openModal, closeModal }] = useModalNav(ModalNavContext);
  const [sectionData, handleDelete, handleClose, moveToNextPage] = useProjectSectionView(
    sectionConstants,
    sectionId
  );

  const handleDeleteConfirmation = () => {
    openModal();
    moveToNextNav(
      {
        confirmationText: 'Are you sure want to delete this record?',
        handleConfirm: handleDelete,
        handleCancel: closeModal
      },
      projectGlobalModalNav.CONFIRMATION
    );
  };
  const handleCloseConfirmation = () => {
    openModal();
    moveToNextNav(
      {
        confirmationText: 'Are you sure want to close this record?',
        handleConfirm: handleClose,
        handleCancel: closeModal
      },
      projectGlobalModalNav.CONFIRMATION
    );
  };

  const data = sectionData.detail;

  if (!fields) fields = Object.keys(data).map((key) => ({ name: key, label: key }));

  return (
    <div className="project-section-view">
      <div className="flex-item-grow">
        <InfoDisplayList columns={fields} data={[data]} className="flex flex--column gap--10px" />
      </div>

      <div className="btn-container-grow">
        {hasPermissionEdit &&
          data.manage_access &&
          renderButton({
            content: 'Manage access',
            className: 'btn--md btn--matte-black ',
            onClick: () => moveToNextPage('manageAccess')
          })}
        {hasPermissionEdit &&
          renderButton({
            content: 'Edit',
            className: 'btn--md btn--matte-black',
            onClick: () => moveToNextPage('edit')
          })}
        {hasPermissionDelete &&
          data.is_delete &&
          renderButton({
            content: 'Delete',
            className: 'btn--md btn--brown',
            onClick: handleDeleteConfirmation
          })}
        {hasPermissionDelete &&
          data.is_close &&
          renderButton({
            content: 'Close',
            className: 'btn--md btn--brown',
            onClick: handleCloseConfirmation
          })}
      </div>
    </div>
  );
}

export default ProjectSectionView;
