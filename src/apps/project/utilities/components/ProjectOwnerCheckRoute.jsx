import React from 'react';
import AccessDenied from '../../../../ui-kit/AccessDenied';
import useProjectMemberPermission from '../hooks/useProjectMemberPermission';

function ProjectOwnerCheckRoute({ component: Component, ...others }) {
  const { isProjectMember, isProjectOwner } = useProjectMemberPermission();
  // eslint-disable-next-line react/jsx-props-no-spreading
  if (isProjectMember && isProjectOwner) return <Component {...others} />;
  return <AccessDenied />;
}

export default ProjectOwnerCheckRoute;
