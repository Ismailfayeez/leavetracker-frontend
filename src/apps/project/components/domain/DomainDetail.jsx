import React from "react";
import {
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES,
} from "../../project.constants";
import domainSchema from "./domain.schema";
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

function DomainDetail(props) {
  const { projectId } = useParams();
  const { domain: name } = PROJECT_SECTION_NAMES;
  const { domain: label } = PROJECT_SECTION_LABELS;
  const { domain: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const { DOMAIN_EDIT, DOMAIN_DLT } = PROJECT_APP_PERMISSIONS;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav] || {};
  const { isProjectOwner, isProjectAdmin, isProjectAdminHasPermission } =
    useProjectMemberPermission(DOMAIN_EDIT, DOMAIN_DLT);
  const primaryField = "code";

  const viewFields = [
    { name: "code", label: "code" },
    { name: "name", label: "name" },
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
          hasPermissionEdit={
            isProjectOwner || isProjectAdminHasPermission[DOMAIN_EDIT]
          }
          hasPermissionDelete={
            isProjectOwner || isProjectAdminHasPermission[DOMAIN_DLT]
          }
        />
      ),
    },
    {
      name: "edit",
      component: (
        <ProjectSectionEdit fields={editFields} schema={domainSchema} />
      ),
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
          schema={domainSchema}
        />
      }
    />
  );
}

export default DomainDetail;
