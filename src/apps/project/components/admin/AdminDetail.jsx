import React from 'react';
import { useParams } from 'react-router-dom';
import { PROJECT_SECTION_LABELS, PROJECT_SECTION_NAMES } from '../../project.constants';
import adminSchema from './admin.schema';
import { MY_PROJECTS_URL, PROJECT_SECTION_URL_PATHNAMES } from '../../apiConstants';
import { ALL_USERS_URL } from '../../../auth/apiConstants';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import ProjectSectionDetail from '../../utilities/components/project-section-detail/ProjectSectionDetail';
import useModalNav from '../../../../utilities/hooks/useModalNav';
import useProjectMemberPermission from '../../utilities/hooks/useProjectMemberPermission';
import ProjectSectionView from '../../utilities/components/project-section-view/ProjectSectionView';
import ProjectSectionEdit from '../../utilities/components/project-section-edit/ProjectSectionEdit';

function AdminDetail() {
  const { projectId } = useParams();
  const { admin: name } = PROJECT_SECTION_NAMES;
  const { admin: label } = PROJECT_SECTION_LABELS;
  const { admin: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const { isProjectOwner } = useProjectMemberPermission();
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav] || {};
  const primaryField = 'email';
  const autoCompleteFields = ['email', 'role'];
  const autoCompleteFieldDetails = {
    role: {
      url: `${MY_PROJECTS_URL + projectId}/admin-role/`,
      valueField: 'code'
    },
    email: { url: ALL_USERS_URL, valueField: 'email', nameField: 'username' }
  };

  const viewFields = [
    { label: 'email', name: 'email' },
    { label: 'name', name: 'name' },
    { label: 'role', path: 'role', name: 'role' }
  ];
  const editFields = [
    {
      name: 'role',
      label: 'role',
      displayContent: 'autoComplete'
    }
  ];
  const newFields = [
    {
      name: 'email',
      label: 'email',
      displayContent: 'autoComplete'
    },
    {
      name: 'role',
      label: 'role',
      displayContent: 'autoComplete'
    }
  ];

  const pages = [
    {
      name: 'view',
      component: (
        <ProjectSectionView
          fields={viewFields}
          hasPermissionEdit={isProjectOwner}
          hasPermissionDelete={isProjectOwner}
        />
      )
    },
    {
      name: 'edit',
      component: <ProjectSectionEdit fields={editFields} schema={adminSchema} />
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
      autoCompleteFields={autoCompleteFields}
      autoCompleteFieldDetails={autoCompleteFieldDetails}
      addNewComponent={
        <ProjectSectionEdit fields={newFields} sectionId="new" schema={adminSchema} />
      }
    />
  );
}

export default AdminDetail;
