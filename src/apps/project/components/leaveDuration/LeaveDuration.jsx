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
import "./leaveDuration.scss";
import ProjectSection from "../utilities/project-section/ProjectSection";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import useProjectMemberPermission from "../../utilities/hooks/useProjectMemberPermission";

function LeaveDuration(props) {
  const { projectId } = useParams();
  const { leaveDuration: name } = PROJECT_SECTION_NAMES;
  const { leaveDuration: label } = PROJECT_SECTION_LABELS;
  const { leaveDuration: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const { isProjectOwner, isProjectAdminHasPermission } =
    useProjectMemberPermission(PROJECT_APP_PERMISSIONS.LEAVE_DURATION_NEW);

  const columns = [
    {
      label: "info",
      key: "info",
      content: (leaveDuration) => (
        <>
          <div
            className="bold"
            onClick={() => {
              openModal();
              moveToNextNav(
                { id: leaveDuration.id },
                projectGlobalModalNav.LEAVEDURATION
              );
            }}
          >
            {leaveDuration["code"]}
          </div>
          <div className="sub-text">{leaveDuration.name}</div>
        </>
      ),
      className: "display--mobile-tablet-lr",
    },
    {
      label: "code",
      path: "code",
      content: (leaveDuration) => (
        <div
          className="bold"
          onClick={() => {
            openModal();
            moveToNextNav(
              { id: leaveDuration.id },
              projectGlobalModalNav.LEAVEDURATION
            );
          }}
        >
          {leaveDuration["code"]}
        </div>
      ),
      className: "display--tablet-hr",
    },
    { label: "name", path: "name", className: "display--tablet-hr" },
    { label: "hours", path: "hours", className: "display--tablet" },
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
          moveToNextNav({ id: "new" }, projectGlobalModalNav.LEAVEDURATION);
        }}
      />
    </>
  );
}

export default LeaveDuration;
