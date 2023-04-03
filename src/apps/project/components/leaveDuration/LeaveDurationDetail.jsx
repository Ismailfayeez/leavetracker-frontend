import React from 'react';
import { useParams } from 'react-router-dom';
import {
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES
} from '../../project.constants';
import leaveDurationSchema from './leaveDuration.schema';
import { MY_PROJECTS_URL, PROJECT_SECTION_URL_PATHNAMES } from '../../apiConstants';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../utilities/hooks/useModalNav';
import useProjectMemberPermission from '../../utilities/hooks/useProjectMemberPermission';
import ProjectSectionDetail from '../../utilities/components/project-section-detail/ProjectSectionDetail';
import ProjectSectionView from '../../utilities/components/project-section-view/ProjectSectionView';
import ProjectSectionEdit from '../../utilities/components/project-section-edit/ProjectSectionEdit';

function LeaveDurationDetail() {
  const { projectId } = useParams();
  const { leaveDuration: name } = PROJECT_SECTION_NAMES;
  const { leaveDuration: label } = PROJECT_SECTION_LABELS;
  const { leaveDuration: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const { LEAVE_DURATION_DELETE, LEAVE_DURATION_EDIT } = PROJECT_APP_PERMISSIONS;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav] || {};
  const { isProjectOwner, isProjectAdminHasPermission } = useProjectMemberPermission(
    LEAVE_DURATION_DELETE,
    LEAVE_DURATION_EDIT
  );
  const primaryField = 'code';

  const viewFields = [
    { label: 'code', name: 'code' },
    { label: 'name', name: 'name' },
    { label: 'hours', name: 'hours' }
  ];
  const editFields = [
    { label: 'code', name: 'code' },
    { label: 'name', name: 'name' },
    { label: 'hours', name: 'hours' }
  ];
  const pages = [
    {
      name: 'view',
      component: (
        <ProjectSectionView
          fields={viewFields}
          hasPermissionEdit={isProjectOwner || isProjectAdminHasPermission[LEAVE_DURATION_EDIT]}
          hasPermissionDelete={isProjectOwner || isProjectAdminHasPermission[LEAVE_DURATION_DELETE]}
        />
      )
    },
    {
      name: 'edit',
      component: <ProjectSectionEdit fields={editFields} schema={leaveDurationSchema} />
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
        <ProjectSectionEdit fields={editFields} sectionId="new" schema={leaveDurationSchema} />
      }
    />
  );
}

export default LeaveDurationDetail;
