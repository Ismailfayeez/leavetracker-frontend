import { queryParamGenerator } from "../../utilities/queryParamGenerator";
import { MY_PROJECTS_URL } from "./apiConstants";

export const PROJECT_SECTION_NAMES = {
  domain: "domain",
  leaveDuration: "leaveDuration",
  leaveType: "leaveType",
  role: "role",
  employee: "employee",
  admin: "admin",
  adminRole: "adminRole",
  fyMonth: "fyMonth",
  myProjects: "myProjects",
};
export const PROJECT_SECTION_LABELS = {
  domain: "Domain",
  leaveDuration: "Leave Duration",
  leaveType: "Leave Type",
  role: "Role",
  employee: "Employee",
  admin: "Admin",
  adminRole: "Admin Role",
  fyMonth: "Fy Month",
  myProjects: "My Projects",
};

export const APP_NAMES = {
  leaveTracker: "leaveTracker",
  project: "project",
};

export const createEmployeeContext = (projectId) => {
  return {
    name: "employee",
    label: "Employee",
    getUrl: (id) =>
      id
        ? `${MY_PROJECTS_URL}${projectId}/employee/${id}/`
        : `${MY_PROJECTS_URL}${projectId}/employee/`,
    projectId,
  };
};

export const createDomainContext = (projectId) => {
  return {
    name: "domain",
    label: "Domain",
    getUrl: ({ id, urlParams } = {}) =>
      id
        ? `${MY_PROJECTS_URL}${projectId}/domain/${id}/`
        : `${MY_PROJECTS_URL}${projectId}/domain/${queryParamGenerator(
            urlParams
          )}`,
    projectId,
  };
};

export const createLeaveDurationContext = (projectId) => {
  return {
    name: "leaveDuration",
    label: "Leave Duration",
    getUrl: (id) =>
      id
        ? `${MY_PROJECTS_URL}${projectId}/leaveduration/${id}/`
        : `${MY_PROJECTS_URL}${projectId}/leaveduration/`,
    projectId,
  };
};

export const createLeaveTypeContext = (projectId) => {
  return {
    name: "leaveType",
    label: "Leave Type",
    getUrl: (id) =>
      id
        ? `${MY_PROJECTS_URL}${projectId}/leavetype/${id}/`
        : `${MY_PROJECTS_URL}${projectId}/leavetype/`,
    projectId,
  };
};

export const createRoleContext = (projectId) => {
  return {
    name: "role",
    label: "role",
    getUrl: (id) =>
      id
        ? `${MY_PROJECTS_URL}${projectId}/role/${id}/`
        : `${MY_PROJECTS_URL}${projectId}/role/`,
    projectId,
  };
};

export const fyMonth = (projectId) => {
  return {
    name: "fyMonth",
    label: "Financial Year Month",
    getUrl: () => `${MY_PROJECTS_URL}${projectId}/fy-month/`,
    projectId,
  };
};

export const createAdminContext = (projectId) => {
  return {
    name: "admin",
    label: "admin",
    getUrl: (id) =>
      id
        ? `${MY_PROJECTS_URL}${projectId}/admin/${id}/`
        : `${MY_PROJECTS_URL}${projectId}/admin/`,
  };
};

export const createAdminRoleContext = (projectId) => {
  return {
    name: "adminRole",
    label: "admin role",
    getUrl: (id) =>
      id
        ? `${MY_PROJECTS_URL}${projectId}/admin-role/${id}/`
        : `${MY_PROJECTS_URL}${projectId}/admin-role/`,
    projectId,
  };
};

export const createRoleAccessListContext = (projectId, sectionId) => {
  const url = `${MY_PROJECTS_URL}${projectId}/role/${sectionId}/access/`;
  return {
    name: "role",
    totalAccessName: "leaveTracker",
    getUrl: () => url,
    projectId,
    sectionId,
  };
};

export const createAdminRoleAccessListContext = (projectId, sectionId) => {
  const url = `${MY_PROJECTS_URL}${projectId}/admin-role/${sectionId}/access/`;
  return {
    name: "adminRole",
    totalAccessName: "project",
    getUrl: () => url,
    projectId,
    sectionId,
  };
};

export const projectGlobalModalNav = {
  CREATE_PROJECT: "createProject",
  EMPLOYEE: "employee",
  ROLE: "role",
  ROLE_ACCESS: "roleAccess",
  DOMAIN: "domain",
  LEAVETYPE: "leaveType",
  LEAVEDURATION: "leaveDuration",
  ADMIN: "admin",
  ADMINROLE: "adminRole",
  ADMINROLE_ACCESS: "adminRoleAccess",
  FYMONTH: "fyMonth",
  CONFIRMATION: "confirmation",
};

// export const projectAccessList=()=>{
//     const url=`${projectUrl}pt-access`
//     return{
//     name:'project',
//     getUrl:()=>url
// }}

// export const leaveTrackerAccessList=()=>{

//     const url=`${projectUrl}lt-access`
//     return{
//     name:'leaveTracker',
//     getUrl:()=>url
// }}

export const PROJECT_APP_ACCESS = "PRJCTS";

export const PROJECT_APP_PERMISSIONS = {
  PROJECT_MAIN: "PRJCTS",
  CREATE_PROJECT: "CRT_PRJCT",
  PROJECT_DETAIL_EDIT: "PRJCT_DTL_EDT",
  EMPLOYEE_NEW: "EMP_NW",
  EMPLOYEE_EDIT: "EMP_EDT",
  EMPLOYEE_DLT: "EMP_DT",
  ROLE_NEW: "RL_NW",
  ROLE_EDIT: "RL_EDT",
  ROLE_DLT: "RL_DLT",
  DOMAIN_NEW: "DMN_NW",
  DOMAIN_EDIT: "DMN_EDT",
  DOMAIN_DLT: "DMN_DLT",
  LEAVE_TYPE_NEW: "LV_TP_NW",
  LEAVE_TYPE_EDIT: "LV_TP_EDT",
  LEAVE_TYPE_DLT: "LV_TP_DLT",
  LEAVE_DURATION_NEW: "LV_DTN_NW",
  LEAVE_DURATION_EDIT: "LV_DTN_EDT",
  LEAVE_DURATION_DLT: "LV_DTN_DLT",
};
