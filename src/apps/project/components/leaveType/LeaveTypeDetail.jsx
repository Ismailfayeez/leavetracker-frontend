import React from 'react';
import { useParams } from 'react-router-dom';
import {
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES
} from '../../project.constants';
import domainSchema from './leavetype.schema';
import { MY_PROJECTS_URL, PROJECT_SECTION_URL_PATHNAMES } from '../../apiConstants';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../utilities/hooks/useModalNav';
import useProjectMemberPermission from '../../utilities/hooks/useProjectMemberPermission';
import ProjectSectionDetail from '../../utilities/components/project-section-detail/ProjectSectionDetail';
import ProjectSectionView from '../../utilities/components/project-section-view/ProjectSectionView';
import ProjectSectionEdit from '../../utilities/components/project-section-edit/ProjectSectionEdit';

function LeaveTypeDetail() {
  const { projectId } = useParams();
  const { leaveType: name } = PROJECT_SECTION_NAMES;
  const { leaveType: label } = PROJECT_SECTION_LABELS;
  const { leaveType: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const { LEAVE_TYPE_DLT, LEAVE_TYPE_EDIT } = PROJECT_APP_PERMISSIONS;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav] || {};
  const primaryField = 'code';
  const { isProjectOwner, isProjectAdminHasPermission } = useProjectMemberPermission(
    LEAVE_TYPE_DLT,
    LEAVE_TYPE_EDIT
  );

  const viewFields = [
    { label: 'code', name: 'code' },
    { label: 'name', name: 'name' },
    { label: 'hours', name: 'hours' },
    { label: 'days', name: 'days' }
  ];
  const editFields = [
    { label: 'code', name: 'code' },
    { label: 'name', name: 'name' },
    { label: 'hours', name: 'hours' },
    { label: 'days', name: 'days' }
  ];
  const pages = [
    {
      name: 'view',
      component: (
        <ProjectSectionView
          fields={viewFields}
          hasPermissionEdit={isProjectOwner || isProjectAdminHasPermission[LEAVE_TYPE_EDIT]}
          hasPermissionDelete={isProjectOwner || isProjectAdminHasPermission[LEAVE_TYPE_DLT]}
        />
      )
    },
    {
      name: 'edit',
      component: <ProjectSectionEdit fields={editFields} schema={domainSchema} />
    }
  ];
  return (
    <ProjectSectionDetail
      defaultPage="view"
      pages={pages}
      sectionId={id}
      sectionConstants={{
        label,
        name,
        nestedUrlPathName,
        baseUrl,
        queryParamKey: 'search',
        primaryField
      }}
      addNewComponent={
        <ProjectSectionEdit fields={editFields} sectionId="new" schema={domainSchema} />
      }
    />
  );
}

export default LeaveTypeDetail;
