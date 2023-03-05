import React from "react";
import { useParams } from "react-router-dom";
import {
  projectGlobalModalNav,
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES,
} from "../../project.constants";
import {
  MY_PROJECTS_URL,
  PROJECT_SECTION_URL_PATHNAMES,
} from "../../apiConstants";
import "./role.scss";
import ProjectSection from "../utilities/project-section/ProjectSection";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import useProjectMemberPermission from "../../utilities/hooks/useProjectMemberPermission";

function Role(props) {
  const { projectId } = useParams();
  const { role: name } = PROJECT_SECTION_NAMES;
  const { role: label } = PROJECT_SECTION_LABELS;
  const { role: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const { isProjectOwner, isProjectAdminHasPermission } =
    useProjectMemberPermission(PROJECT_APP_PERMISSIONS.ROLE_NEW);
  const columns = [
    {
      label: "info",
      path: "code",
      content: (role) => (
        <>
          <div
            className="bold"
            onClick={() => {
              openModal();
              moveToNextNav({ id: role.id }, projectGlobalModalNav.ROLE);
            }}
          >
            {role["code"]}
          </div>
          <div className="sub-text">{role.name}</div>
        </>
      ),
      className: "display--mobile-only",
    },
    {
      label: "code",
      path: "code",
      content: (role) => (
        <div
          className="bold"
          onClick={() => {
            openModal();
            moveToNextNav({ id: role.id }, projectGlobalModalNav.ROLE);
          }}
        >
          {role["code"]}
        </div>
      ),
      className: "display--tablet",
    },
    { label: "name", path: "name", className: "display--tablet" },
  ];

  return (
    <>
      <ProjectSection
        columns={columns}
        isPermissionAddNew={isProjectOwner || isProjectAdminHasPermission}
        sectionConstants={{
          name,
          label,
          nestedUrlPathName,
          baseUrl,
          queryParamKey: "search",
        }}
        handleNew={() => {
          openModal();
          moveToNextNav({ id: "new" }, projectGlobalModalNav.ROLE);
        }}
      />
    </>
  );
}

export default Role;
