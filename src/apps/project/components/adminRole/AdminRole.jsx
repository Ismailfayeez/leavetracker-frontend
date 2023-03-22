import React from "react";
import { useParams } from "react-router-dom";
import {
  projectGlobalModalNav,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES,
} from "../../project.constants";
import { useGlobalNavModal } from "../utilities/useGlobalNavModal";
import {
  MY_PROJECTS_URL,
  PROJECT_SECTION_URL_PATHNAMES,
} from "../../apiConstants";
import "./adminRole.scss";
import ProjectSection from "../utilities/project-section/ProjectSection";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import useProjectMemberPermission from "../../utilities/hooks/useProjectMemberPermission";

function AdminRole(props) {
  const { projectId } = useParams();
  const { adminRole: name } = PROJECT_SECTION_NAMES;
  const { adminRole: label } = PROJECT_SECTION_LABELS;
  const { adminRole: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const { isProjectOwner } = useProjectMemberPermission();
  const columns = [
    {
      label: "info",
      key: "info",
      content: (adminRole) => (
        <>
          <div
            className="bold"
            onClick={() => {
              openModal();
              moveToNextNav(
                { id: adminRole.id },
                projectGlobalModalNav.ADMINROLE
              );
            }}
          >
            {adminRole["code"]}
          </div>
          <div className="sub-text">{adminRole.name}</div>
        </>
      ),
      className: "display--mobile-only",
    },
    {
      label: "code",
      path: "code",
      content: (adminRole) => (
        <div
          className="bold"
          onClick={() => {
            openModal();
            moveToNextNav(
              { id: adminRole.id },
              projectGlobalModalNav.ADMINROLE
            );
          }}
        >
          {adminRole["code"]}
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
          moveToNextNav({ id: "new" }, projectGlobalModalNav.ADMINROLE);
        }}
      />
    </>
  );
}

export default AdminRole;
