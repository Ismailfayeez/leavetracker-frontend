import React from 'react';
import AccessDenied from '../../ui-kit/AccessDenied';

export const allowedRolesCheck = (Component, employeeAccessList, allowedAccessList) => {
  if (allowedAccessList) {
    if (allowedAccessList.every((accessId) => employeeAccessList.includes(accessId)))
      return <Component />;
  }
  return <AccessDenied />;
};
