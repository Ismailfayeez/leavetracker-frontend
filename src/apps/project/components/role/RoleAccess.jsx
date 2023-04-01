import React from 'react';
import { useParams } from 'react-router-dom';
import { PageNavContext } from '../../../../utilities/context/PageNavContext';
import usePageNav from '../../../../utilities/hooks/usePageNav';
import { MY_PROJECTS_URL } from '../../apiConstants';
import { APP_NAMES, PROJECT_SECTION_NAMES } from '../../project.constants';
import ManageAccess from '../../utilities/components/manage-access/ManageAccess';
import ManageAccessView from '../../utilities/components/manage-access-view/ManageAccessView';
import ManageAccessEdit from '../../utilities/components/manage-access-edit/ManageAccessEdit';

function RoleAccess({ id }) {
  const { projectId } = useParams();
  const { role: name } = PROJECT_SECTION_NAMES;
  const { leaveTracker: totalAccessName } = APP_NAMES;
  const [{ moveToPrevPage }] = usePageNav(PageNavContext);
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/role/${id}/access/`;
  const pages = [
    { name: 'manageAccessView', component: <ManageAccessView /> },
    { name: 'manageAccessEdit', component: <ManageAccessEdit /> }
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

export default RoleAccess;
