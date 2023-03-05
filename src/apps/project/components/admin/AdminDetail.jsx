import React, { useState } from "react";
import {
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES,
} from "../../project.constants";
import adminSchema from "./admin.schema";
import {
  MY_PROJECTS_URL,
  PROJECT_SECTION_URL_PATHNAMES,
} from "../../apiConstants";
import { useParams } from "react-router-dom";
import ProjectSectionDetail from "../utilities/project-section-detail/ProjectSectionDetail";
import ProjectSectionView from "../utilities/project-section-view/ProjectSectionView";
import ProjectSectionEdit from "../utilities/project-section-edit/ProjectSectionEdit";
import { renderAutoComplete } from "../../../../utilities/uiElements";
import useAutoCompleteSuggestions from "../../../../utilities/hooks/useAutoCompleteSuggestions";
import { ALL_USERS_URL } from "../../../auth/apiConstants";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import useProjectMemberPermission from "../../utilities/hooks/useProjectMemberPermission";
function AdminDetail(props) {
  const { projectId } = useParams();
  const { admin: name } = PROJECT_SECTION_NAMES;
  const { admin: label } = PROJECT_SECTION_LABELS;
  const { admin: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const { isProjectOwner } = useProjectMemberPermission();
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav] || {};
  const primaryField = "email";
  const autoCompleteFields = ["email", "role"];
  const autoCompleteFieldDetails = {
    role: {
      url: MY_PROJECTS_URL + projectId + "/admin-role",
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
    { label: "email", name: "email" },
    { label: "name", name: "name" },
    { label: "role", path: "role.code", name: "role" },
  ];
  const editFields = [
    {
      path: "role.code",
      name: "role",
      label: "role",
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
      path: "role.code",
      name: "role",
      label: "role",
      displayContent: displayAutoComplete,
    },
  ];

  const pages = [
    {
      name: "view",
      component: (
        <ProjectSectionView
          fields={viewFields}
          hasPermissionEdit={isProjectOwner}
          hasPermissionDelete={isProjectOwner}
        />
      ),
    },
    {
      name: "edit",
      component: (
        <ProjectSectionEdit fields={editFields} schema={adminSchema} />
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
          fields={newFields}
          sectionId="new"
          schema={adminSchema}
        />
      }
    />
  );
}

export default AdminDetail;
