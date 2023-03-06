import React from "react";
import { useParams } from "react-router-dom";
import {
  projectGlobalModalNav,
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES,
} from "../../project.constants";
import {
  MY_PROJECTS_URL,
  PROJECT_SECTION_URL_PATHNAMES,
} from "../../apiConstants";
import "./employee.scss";
import ProjectSection from "../utilities/project-section/ProjectSection";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import useProjectMemberPermission from "../../utilities/hooks/useProjectMemberPermission";
import { PROJECT_APP_PERMISSIONS } from "../../project.constants";
function Employee(props) {
  const { projectId } = useParams();
  const { employee: name } = PROJECT_SECTION_NAMES;
  const { employee: label } = PROJECT_SECTION_LABELS;
  const { employee: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const { isProjectOwner, isProjectAdminHasPermission } =
    useProjectMemberPermission(PROJECT_APP_PERMISSIONS.EMPLOYEE_NEW);
  const columns = [
    {
      label: "name",
      path: "username",
      content: (employee) => (
        <div
          className="bold"
          onClick={() => {
            openModal();
            moveToNextNav({ id: employee.id }, projectGlobalModalNav.EMPLOYEE);
          }}
        >
          {employee["username"]}
        </div>
      ),
      className: "display--tablet-hr",
    },
    {
      label: "info",
      key: "info-username",
      content: (employee) => (
        <>
          <div
            className="bold"
            onClick={() => {
              openModal();
              moveToNextNav(
                { id: employee.id },
                projectGlobalModalNav.EMPLOYEE
              );
            }}
          >
            {employee["username"]}
          </div>
          <div className="sub-text">{employee.email}</div>
        </>
      ),
      className: "display--mobile-tablet-lr",
    },
    { label: "email", path: "email", className: "display--tablet-hr" },
    { label: "role", path: "role", className: "display--tablet" },
    { label: "domain", path: "domain", className: "display--tablet" },
  ];

  return (
    <>
      <ProjectSection
        columns={columns}
        isPermissionAddNew={isProjectOwner || isProjectAdminHasPermission}
        handleNew={() => {
          openModal();
          moveToNextNav({ id: "new" }, projectGlobalModalNav.EMPLOYEE);
        }}
        sectionConstants={{
          name,
          label,
          nestedUrlPathName,
          baseUrl,
          queryParamKey: "search",
        }}
      />
    </>
  );
}

export default Employee;
