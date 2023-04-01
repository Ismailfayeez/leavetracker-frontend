import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  projectGlobalModalNav,
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES
} from '../../project.constants';
import { useGlobalNavModal } from '../utilities/useGlobalNavModal';
import { MY_PROJECTS_URL, PROJECT_SECTION_URL_PATHNAMES } from '../../apiConstants';
import './domain.scss';
import ProjectSection from '../utilities/project-section/ProjectSection';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import useProjectMemberPermission from '../../utilities/hooks/useProjectMemberPermission';

function Domain() {
  const { projectId } = useParams();
  const { domain: name } = PROJECT_SECTION_NAMES;
  const { domain: label } = PROJECT_SECTION_LABELS;
  const { domain: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ openModal, moveToNextNav }] = useGlobalNavModal(ModalNavContext);
  const { isProjectOwner, isProjectAdminHasPermission } = useProjectMemberPermission(
    PROJECT_APP_PERMISSIONS.DOMAIN_NEW
  );
  const columns = [
    {
      label: 'info',
      key: 'info',
      content: useCallback(
        (domain) => (
          <>
            <div
              className="bold"
              onClick={() => {
                openModal();
                moveToNextNav({ id: domain.id }, projectGlobalModalNav.DOMAIN);
              }}
              role="presentation">
              {domain.code}
            </div>
            <div className="sub-text">{domain.name}</div>
          </>
        ),
        [moveToNextNav, openModal]
      ),
      className: 'display--mobile-only'
    },
    {
      label: 'code',
      path: 'code',
      content: useCallback(
        (domain) => (
          <div
            className="bold"
            onClick={() => {
              openModal();
              moveToNextNav({ id: domain.id }, projectGlobalModalNav.DOMAIN);
            }}
            role="presentation">
            {domain.code}
          </div>
        ),
        [moveToNextNav, openModal]
      ),
      className: 'display--tablet'
    },
    { label: 'name', path: 'name', className: 'display--tablet' }
  ];

  return (
    <ProjectSection
      columns={columns}
      isPermissionAddNew={isProjectOwner || isProjectAdminHasPermission}
      sectionConstants={{
        name,
        label,
        nestedUrlPathName,
        baseUrl,
        queryParamKey: 'search'
      }}
      handleNew={() => {
        openModal();
        moveToNextNav({ id: 'new' }, projectGlobalModalNav.DOMAIN);
      }}
    />
  );
}

export default Domain;
