const baseUrl = 'auth/';
export const CURRENT_USER_URL = `${baseUrl}users/me/`;
export const COUNTRY_URL = `${baseUrl}country`;
export const TIMEZONE_URL = `${baseUrl}timezone`;
export const LOGIN_USER_URL = `${baseUrl}jwt/create/`;
export const USERS_URL = `${baseUrl}users/`;
export const ALL_USERS_URL = `${baseUrl}all-users/`;
export const getAllUsersUrl = () => ALL_USERS_URL;
export const getProjectRoleUrl = (queryVal) =>
  ALL_USERS_URL + queryVal ? `?search=${queryVal}` : '';
