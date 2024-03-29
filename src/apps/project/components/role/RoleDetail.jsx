import React from 'react';
import { useParams } from 'react-router-dom';
import {
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES
} from '../../project.constants';
import roleSchema from './role.schema';
import { MY_PROJECTS_URL, PROJECT_SECTION_URL_PATHNAMES } from '../../apiConstants';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../utilities/hooks/useModalNav';
import useProjectMemberPermission from '../../utilities/hooks/useProjectMemberPermission';
import ProjectSectionDetail from '../../utilities/components/project-section-detail/ProjectSectionDetail';
import ProjectSectionView from '../../utilities/components/project-section-view/ProjectSectionView';
import ProjectSectionEdit from '../../utilities/components/project-section-edit/ProjectSectionEdit';
import RoleAccess from './RoleAccess';

function RoleDetail() {
  const { projectId } = useParams();
  const { role: name } = PROJECT_SECTION_NAMES;
  const { role: label } = PROJECT_SECTION_LABELS;
  const { role: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const { ROLE_EDIT, ROLE_DELETE } = PROJECT_APP_PERMISSIONS;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav] || {};
  const primaryField = 'code';
  const { isProjectOwner, isProjectAdminHasPermission } = useProjectMemberPermission(
    ROLE_EDIT,
    ROLE_DELETE
  );

  const viewFields = [
    { label: 'code', name: 'code' },
    { label: 'name', name: 'name' }
  ];

  const editFields = [
    { label: 'code', name: 'code' },
    { label: 'name', name: 'name' }
  ];
  const pages = [
    {
      name: 'view',
      component: (
        <ProjectSectionView
          fields={viewFields}
          hasPermissionEdit={isProjectOwner || isProjectAdminHasPermission[ROLE_EDIT]}
          hasPermissionDelete={isProjectOwner || isProjectAdminHasPermission[ROLE_DELETE]}
        />
      )
    },
    {
      name: 'edit',
      component: <ProjectSectionEdit fields={editFields} schema={roleSchema} />
    },
    {
      name: 'manageAccess',
      component: <RoleAccess id={id} />
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
        <ProjectSectionEdit fields={editFields} sectionId="new" schema={roleSchema} />
      }
    />
  );
}

export default RoleDetail;
