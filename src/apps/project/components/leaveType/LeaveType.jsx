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
import './leaveType.scss';
import ProjectSection from '../utilities/project-section/ProjectSection';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import useProjectMemberPermission from '../../utilities/hooks/useProjectMemberPermission';

function LeaveType() {
  const { projectId } = useParams();
  const { leaveType: name } = PROJECT_SECTION_NAMES;
  const { leaveType: label } = PROJECT_SECTION_LABELS;
  const { leaveType: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ openModal, moveToNextNav }] = useGlobalNavModal(ModalNavContext);
  const { isProjectOwner, isProjectAdminHasPermission } = useProjectMemberPermission(
    PROJECT_APP_PERMISSIONS.LEAVE_TYPE_NEW
  );
  const columns = [
    {
      label: 'info',
      key: 'info',
      content: useCallback(
        (leaveType) => (
          <>
            <div
              className="bold"
              onClick={() => {
                openModal();
                moveToNextNav({ id: leaveType.id }, projectGlobalModalNav.LEAVETYPE);
              }}
              role="presentation">
              {leaveType.code}
            </div>
            <div className="sub-text">{leaveType.name}</div>
          </>
        ),
        [openModal, moveToNextNav]
      ),
      className: 'display--mobile-tablet-lr'
    },
    {
      label: 'code',
      path: 'code',
      content: useCallback(
        (leaveType) => (
          <div
            className="bold"
            onClick={() => {
              openModal();
              moveToNextNav({ id: leaveType.id }, projectGlobalModalNav.LEAVETYPE);
            }}
            role="presentation">
            {leaveType.code}
          </div>
        ),
        [openModal, moveToNextNav]
      ),
      className: 'display--tablet-hr'
    },
    { label: 'name', path: 'name', className: 'display--tablet-hr' },
    { label: 'hours', path: 'hours', className: 'display--tablet' },
    { label: 'days', path: 'days', className: 'display--tablet' }
  ];

  return (
    <ProjectSection
      columns={columns}
      isPermissionAddNew={isProjectOwner || isProjectAdminHasPermission}
      handleNew={() => {
        openModal();
        moveToNextNav({ id: 'new' }, projectGlobalModalNav.LEAVETYPE);
      }}
      sectionConstants={{
        name,
        label,
        nestedUrlPathName,
        baseUrl,
        queryParamKey: 'search'
      }}
    />
  );
}

export default LeaveType;
