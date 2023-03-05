import moment from "moment";

export const LEAVETRACKER_SECTION_NAMES = {
  groups: "groups",
  myGroups: "myGroups",
  allGroups: "allGroups",
  leaveBalance: "leaveBalance",
  fyList: "fyList",
  newApproval: "newApproval",
  actionedApproval: "actionedApproval",
  previousApproval: "previousApproval",
};

export const LEAVETRACKER_SECTION_LABELS = {
  newApproval: "New",
  actionedApproval: "Actioned",
  previousApproval: "Previous",
};
export const LEAVETRACKER_PATH_NAMES = {
  leaveTracker: "lt",
  groups: "groups",
  myGroups: "my-groups",
  allGroups: "all-groups",
};

// status constants
export const upcomingLeaves = {
  name: "upcoming",
  label: "Upcoming",
  queryParam: `?from_date__gte=${moment().format("YYYY-MM-DD")}`,
};
export const previousLeaves = {
  name: "previous",
  label: "History",
  queryParam: `?from_date__lt=${moment().format("YYYY-MM-DD")}`,
};

// modal nav names
export const leaveTrackerModalNames = {
  absenteeDetail: "absenteeDetail",
  applyLeaveForm: "applyLeaveForm",
  requestSuccess: "requestSuccess",
  confirmation: "confirmation",
  addNewGroup: "addNewGroup",
  editGroupInfo: "editGroupInfo",
  addUsers: "addUsers",
  addGroupMembers: "addGroupMembers",
  addApprovers: "addApprovers",
  leaveInfo: "leaveInfo",
  leaveBalance: "leaveBalance",
  leaveApproverStatus: "leaveApproverStatus",
  approvalLeaveInfo: "approvalLeaveInfo",
  approvalLeaveApproverStatus: "approvalLeaveApproverStatus",
};

// caching time
export const CACHING_TIME_IN_MINUTES = 0.5;

// status constants
export const Pending = {
  code: "P",
  name: "Pending",
};

export const Accepted = {
  code: "A",
  name: "Accepted",
};

export const Rejected = {
  code: "R",
  name: "Rejected",
};

export const closed = {
  code: "C",
  name: "closed",
};
export const LEAVE_DELETE_ALLOWED_STATUS = ["P"];
export const APPROVAL_ALLOWED_STATUS = ["P"];
export const APPROVAL_ALLOWED_TAB = ["newApproval"];

export const LEAVETRACKER_APP_PERMISSIONS = {
  LEAVETRACKER_MAIN: "LV_TRCKR",
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

export const LEAVETRACKER_APP_PERMISSION_GRANT_ALL = "LTAL";
