import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MY_PROJECTS_URL } from "../../apiConstants";
import { APP_NAMES, PROJECT_SECTION_NAMES } from "../../project.constants";
import ManageAccess from "../utilities/manage-access/ManageAccess";
import ManageAccessEdit from "../utilities/manage-access-edit/ManageAccessEdit";
import ManageAccessView from "../utilities/manage-access-view/ManageAccessView";
import { usePageNav } from "../../../../utilities/hooks/usePageNav";
import { PageNavContext } from "../../../../utilities/context/PageNavContext";

function AdminRoleAccess({ id }) {
  const { projectId } = useParams();
  const { adminRole: name } = PROJECT_SECTION_NAMES;
  const { project: totalAccessName } = APP_NAMES;
  const [{ moveToPrevPage }] = usePageNav(PageNavContext);
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/admin-role/${id}/access/`;
  const pages = [
    { name: "manageAccessView", component: <ManageAccessView /> },
    { name: "manageAccessEdit", component: <ManageAccessEdit /> },
  ];

  return (
    <ManageAccess
      pages={pages}
      defaultPage="manageAccessView"
      sectionConstants={{ name, id, baseUrl, totalAccessName }}
      handleBack={moveToPrevPage}
    />
  );
}

export default AdminRoleAccess;
