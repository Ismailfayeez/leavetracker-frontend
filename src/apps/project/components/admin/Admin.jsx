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
import "./admin.scss";
import ProjectSection from "../utilities/project-section/ProjectSection";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import useProjectMemberPermission from "../../utilities/hooks/useProjectMemberPermission";

function Admin(props) {
  const { projectId } = useParams();
  const { admin: name } = PROJECT_SECTION_NAMES;
  const { admin: label } = PROJECT_SECTION_LABELS;
  const { admin: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const { isProjectOwner } = useProjectMemberPermission();

  const columns = [
    {
      label: "name",
      path: "name",
      content: (admin) => (
        <div
          className="bold"
          onClick={() => {
            openModal();
            moveToNextNav({ id: admin.id }, projectGlobalModalNav.ADMIN);
          }}
        >
          {admin["name"]}
        </div>
      ),
      className: "display--tablet-hr",
    },
    {
      label: "info",
      key: "info",
      content: (admin) => (
        <>
          <div
            className="bold"
            onClick={() => {
              openModal();
              moveToNextNav({ id: admin.id }, projectGlobalModalNav.ADMIN);
            }}
          >
            {admin["name"]}
          </div>
          <div className="sub-text">{admin.email}</div>
        </>
      ),
      className: "display--mobile-tablet-lr",
    },
    { label: "email", path: "email", className: "display--tablet-hr" },
    { label: "role", path: "role", className: "display--tablet" },
  ];

  return (
    <>
      <ProjectSection
        columns={columns}
        isPermissionAddNew={isProjectOwner}
        sectionConstants={{
          name,
          label,
          nestedUrlPathName,
          baseUrl,
          queryParamKey: "search",
        }}
        handleNew={() => {
          openModal();
          moveToNextNav({ id: "new" }, projectGlobalModalNav.ADMIN);
        }}
      />
    </>
  );
}

export default Admin;
