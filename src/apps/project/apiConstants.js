const BASE_URL = 'project/';
export const PROJECT_URL = BASE_URL;
export const MY_PROJECTS_URL = `${BASE_URL}myprojects/`;

export const PROJECT_SECTION_URL_PATHNAMES = {
  domain: 'domain/',
  leaveDuration: 'leaveduration/',
  leaveType: 'leavetype/',
  role: 'role/',
  employee: 'employee/',
  admin: 'admin/',
  adminRole: 'admin-role/',
  fyMonth: 'fy-month/',
  sectionCounts: 'section_counts',
  myProfile: 'myprofile/'
};
export const PT_ACCESS_URL = `${BASE_URL}pt-access/`;
export const LT_ACCESS_URL = `${BASE_URL}lt-access/`;

export const getProjectRoleUrl = (projectId) => (queryVal) =>
  `${MY_PROJECTS_URL}${projectId}/role${queryVal ? `?search=${queryVal}` : ''}`;
export const getProjectDomainUrl = (projectId) => (queryVal) =>
  `${MY_PROJECTS_URL}${projectId}/domain${queryVal ? `?search=${queryVal}` : ''}`;
export const getAdminRoleUrl = (projectId) => (queryVal) =>
  `${MY_PROJECTS_URL}${projectId}/admin-role${queryVal ? `?search=${queryVal}` : ''}`;
