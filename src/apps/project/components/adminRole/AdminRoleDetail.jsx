import React from "react";
import {
  projectGlobalModalNav,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES,
} from "../../project.constants";
import adminRoleSchema from "./adminRole.schema";
import { useContext } from "react";
import {
  MY_PROJECTS_URL,
  PROJECT_SECTION_URL_PATHNAMES,
} from "../../apiConstants";
import { useParams } from "react-router-dom";
import ProjectSectionDetail from "../utilities/project-section-detail/ProjectSectionDetail";
import ProjectSectionView from "../utilities/project-section-view/ProjectSectionView";
import ProjectSectionEdit from "../utilities/project-section-edit/ProjectSectionEdit";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import useProjectMemberPermission from "../../utilities/hooks/useProjectMemberPermission";
import AdminRoleAccess from "./AdminRoleAccess";
function AdminRoleDetail(props) {
  const { projectId } = useParams();
  const { adminRole: name } = PROJECT_SECTION_NAMES;
  const { adminRole: label } = PROJECT_SECTION_LABELS;
  const { adminRole: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const { isProjectOwner } = useProjectMemberPermission();
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav] || {};
  const primaryField = "code";

  const viewFields = [
    { label: "code", name: "code" },
    { label: "name", name: "name" },
  ];

  const editFields = [
    { label: "code", name: "code" },
    { label: "name", name: "name" },
  ];
  const pages = [
    {
      name: "view",
      component: (
        <ProjectSectionView
          fields={viewFields}
          hasPermissionEdit={isProjectOwner}
          hasPermissionDelete={isProjectOwner}
          manageAccessModalName={projectGlobalModalNav.ADMINROLE_ACCESS}
          manageAccessModalProps={{ id, name }}
        />
      ),
    },
    {
      name: "edit",
      component: (
        <ProjectSectionEdit fields={editFields} schema={adminRoleSchema} />
      ),
    },
    {
      name: "manageAccess",
      component: <AdminRoleAccess id={id} />,
    },
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
        queryParamKey: "search",
        primaryField,
      }}
      addNewComponent={
        <ProjectSectionEdit
          fields={editFields}
          sectionId="new"
          schema={adminRoleSchema}
        />
      }
    />
  );
}

export default AdminRoleDetail;
