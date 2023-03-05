import React, { useState } from "react";
import {
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES,
} from "../../project.constants";
import employeeSchema from "./employee.schema";
import {
  MY_PROJECTS_URL,
  PROJECT_SECTION_URL_PATHNAMES,
} from "../../apiConstants";
import { useParams } from "react-router-dom";
import ProjectSectionDetail from "../utilities/project-section-detail/ProjectSectionDetail";
import ProjectSectionView from "../utilities/project-section-view/ProjectSectionView";
import ProjectSectionEdit from "../utilities/project-section-edit/ProjectSectionEdit";
import useAutoCompleteSuggestions from "../../../../utilities/hooks/useAutoCompleteSuggestions";
import { renderAutoComplete } from "../../../../utilities/uiElements";
import { ALL_USERS_URL } from "../../../auth/apiConstants";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import useProjectMemberPermission from "../../utilities/hooks/useProjectMemberPermission";

function EmployeeDetail(props) {
  const { projectId } = useParams();
  const { employee: name } = PROJECT_SECTION_NAMES;
  const { employee: label } = PROJECT_SECTION_LABELS;
  const { employee: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const { EMPLOYEE_EDIT, EMPLOYEE_DLT } = PROJECT_APP_PERMISSIONS;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav] || {};
  const { isProjectOwner, isProjectAdmin, isProjectAdminHasPermission } =
    useProjectMemberPermission(EMPLOYEE_EDIT, EMPLOYEE_DLT);

  const primaryField = "email";
  const autoCompleteFields = ["email", "role", "domain"];
  const autoCompleteFieldDetails = {
    role: { url: MY_PROJECTS_URL + projectId + "/role", valueField: "code" },
    domain: {
      url: MY_PROJECTS_URL + projectId + "/domain",
      valueField: "code",
    },
    email: { url: ALL_USERS_URL, valueField: "email", nameField: "username" },
  };
  const {
    clearSuggestions,
    fetchSuggestions,
    suggestions,
    isSuggestionsLoading,
  } = useAutoCompleteSuggestions(autoCompleteFields, autoCompleteFieldDetails);

  const displayAutoComplete = ({ handleChange, handleBlur, ...otherProps }) => {
    return renderAutoComplete({
      clearSuggestions,
      fetchSuggestions,
      suggestions,
      isLoading: isSuggestionsLoading,
      handleChange: (e) => {
        handleChange(e);
        fetchSuggestions(e.currentTarget);
      },
      handleBlur: (e) => {
        handleBlur(e);
        clearSuggestions(e.currentTarget.name);
      },
      handleSelect: (e) => {
        handleChange(e);
        clearSuggestions(e.currentTarget.name);
      },
      ...otherProps,
    });
  };

  const viewFields = [
    { name: "username", label: "name" },
    { name: "email", label: "email" },
    { name: "role", label: "role" },
    { name: "domain", label: "domain" },
  ];
  const editFields = [
    {
      name: "role",
      label: "role",
      displayContent: displayAutoComplete,
    },
    {
      name: "domain",
      label: "domain",
      displayContent: displayAutoComplete,
    },
  ];

  const newFields = [
    {
      name: "email",
      label: "email",
      displayContent: displayAutoComplete,
    },
    {
      name: "role",
      label: "role",
      displayContent: displayAutoComplete,
    },
    {
      name: "domain",
      label: "domain",
      displayContent: displayAutoComplete,
    },
  ];
  const pages = [
    {
      name: "view",
      component: (
        <ProjectSectionView
          fields={viewFields}
          hasPermissionEdit={
            isProjectOwner || isProjectAdminHasPermission[EMPLOYEE_EDIT]
          }
          hasPermissionDelete={
            isProjectOwner || isProjectAdminHasPermission[EMPLOYEE_DLT]
          }
        />
      ),
    },
    {
      name: "edit",
      component: (
        <ProjectSectionEdit fields={editFields} schema={employeeSchema} />
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
        updateMethod: "put",
        queryParamKey: "search",
        primaryField,
      }}
      addNewComponent={
        <ProjectSectionEdit
          fields={newFields}
          sectionId="new"
          schema={employeeSchema}
        />
      }
    />
  );
}

export default EmployeeDetail;
