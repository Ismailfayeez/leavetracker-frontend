import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import employeeSchema from './employee.schema';
import { MY_PROJECTS_URL, PROJECT_SECTION_URL_PATHNAMES } from '../../apiConstants';
import { ALL_USERS_URL } from '../../../auth/apiConstants';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../utilities/hooks/useModalNav';
import useProjectMemberPermission from '../../utilities/hooks/useProjectMemberPermission';
import {
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES
} from '../../project.constants';
import ProjectSectionDetail from '../../utilities/components/project-section-detail/ProjectSectionDetail';
import ProjectSectionView from '../../utilities/components/project-section-view/ProjectSectionView';
import ProjectSectionEdit from '../../utilities/components/project-section-edit/ProjectSectionEdit';

function EmployeeDetail() {
  const { projectId } = useParams();
  const { employee: name } = PROJECT_SECTION_NAMES;
  const { employee: label } = PROJECT_SECTION_LABELS;
  const { employee: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const { EMPLOYEE_EDIT, EMPLOYEE_DELETE } = PROJECT_APP_PERMISSIONS;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav] || {};
  const { isProjectOwner, isProjectAdminHasPermission } = useProjectMemberPermission(
    EMPLOYEE_EDIT,
    EMPLOYEE_DELETE
  );

  const primaryField = 'email';
  const autoCompleteFields = useMemo(() => ['email', 'role', 'domain'], []);
  const autoCompleteFieldDetails = useMemo(
    () => ({
      role: { url: `${MY_PROJECTS_URL + projectId}/role`, valueField: 'code' },
      domain: {
        url: `${MY_PROJECTS_URL + projectId}/domain`,
        valueField: 'code'
      },
      email: { url: ALL_USERS_URL, valueField: 'email', nameField: 'username' }
    }),
    [projectId]
  );

  const viewFields = [
    { name: 'username', label: 'name' },
    { name: 'email', label: 'email' },
    { name: 'role', label: 'role' },
    { name: 'domain', label: 'domain' }
  ];
  const editFields = [
    {
      name: 'role',
      label: 'role',
      displayContent: 'autoComplete'
    },
    {
      name: 'domain',
      label: 'domain',
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
    },
    {
      name: 'domain',
      label: 'domain',
      displayContent: 'autoComplete'
    }
  ];
  const pages = [
    {
      name: 'view',
      component: (
        <ProjectSectionView
          fields={viewFields}
          hasPermissionEdit={isProjectOwner || isProjectAdminHasPermission[EMPLOYEE_EDIT]}
          hasPermissionDelete={isProjectOwner || isProjectAdminHasPermission[EMPLOYEE_DELETE]}
        />
      )
    },
    {
      name: 'edit',
      component: <ProjectSectionEdit fields={editFields} schema={employeeSchema} />
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
        updateMethod: 'put',
        queryParamKey: 'search',
        primaryField
      }}
      autoCompleteFields={autoCompleteFields}
      autoCompleteFieldDetails={autoCompleteFieldDetails}
      addNewComponent={
        <ProjectSectionEdit fields={newFields} sectionId="new" schema={employeeSchema} />
      }
    />
  );
}

export default EmployeeDetail;
