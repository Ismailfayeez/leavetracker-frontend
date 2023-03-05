import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../store/apiActions";
import _ from "lodash";
import { queryParamGenerator } from "../../../utilities/queryParamGenerator";
import { PROJECT_SECTION_NAMES } from "../project.constants";
const { domain, leaveDuration, leaveType, role, employee, admin, adminRole } =
  PROJECT_SECTION_NAMES;
const initialState = {
  myProjects: {
    list: [],
    detail: { id: "", name: "", description: "" },
    projectMemberProfile: {
      id: "",
      owner: "",
      admin: "",
    },
    sectionCount: {
      [domain]: "",
      [leaveDuration]: "",
      [leaveType]: "",
      [role]: "",
      [employee]: "",
      [admin]: "",
      [adminRole]: "",
    },
  },
  core: {
    fyMonth: {
      month: "",
    },
    admin: {
      list: [],
      detail: {},
    },
    adminRole: {
      list: [],
      detail: {},
      accessList: [],
    },
    employee: {
      list: [],
      detail: {},
    },
    role: {
      list: [],
      detail: {},
      accessList: [],
    },
    domain: {
      list: [],
      detail: {},
    },
    leaveType: {
      list: [],
      detail: {},
    },
    leaveDuration: {
      list: [],
      detail: {},
    },
  },
  accessList: {
    leaveTracker: [],
    project: [],
  },
};

const slice = createSlice({
  name: "projects",
  initialState: { ...initialState },
  reducers: {
    totalAccessListReceived: (projects, action) => {
      const { data: totalAccessList, sectionNames } = action.payload;
      sectionNames.forEach((name, index) => {
        projects["accessList"][name] = totalAccessList[index];
      });
    },
    coreAccessListUpdated: (projects, action) => {
      const { data: accessList, id, name } = action.payload;
      projects["core"][name]["list"].forEach((item, i, arr) => {
        if (item.id == id) {
          arr[i] = { ...arr[i], access: [...accessList] };
        }
      });
    },
    myProjectCreated: (projects, action) => {
      const { data } = action.payload;
      projects["myProjects"]["list"] = [
        ...projects["myProjects"]["list"],
        data,
      ];
    },
    myProjectListReceived: (projects, action) => {
      const { data } = action.payload;
      projects["myProjects"]["list"] = data;
      projects["myProjects"]["detail"] = {
        ...initialState["myProjects"]["detail"],
      };
      projects["myProjects"]["projectMemberProfile"] = {
        ...initialState["myProjects"]["projectMemberProfile"],
      };
    },
    myProjectDetailreceived: (projects, action) => {
      const { data } = action.payload;
      projects["myProjects"]["detail"] = data;
      projects["core"] = { ...initialState["core"] };
    },
    projectMemberProfilereceived: (projects, action) => {
      const { data } = action.payload;
      projects["myProjects"]["projectMemberProfile"] = data;
      projects["core"] = { ...initialState["core"] };
    },
    projectSectionCountReceived: (projects, action) => {
      const { data } = action.payload;
      projects["myProjects"]["sectionCount"] = data;
      projects["core"] = { ...initialState["core"] };
    },

    coreListReceived: (projects, action) => {
      const { data, name } = action.payload;
      const section = projects["core"][name];
      section["list"] = data;
      section["detail"] = { ...initialState["core"][name]["detail"] };
    },
    resetCoreList: (projects, action) => {
      const { name } = action.payload;
      const section = projects["core"][name];
      section["list"] = [...initialState["core"][name]["list"]];
    },
    coreDetailReceived: (projects, action) => {
      const { data, name } = action.payload;
      const section = projects["core"][name];
      section["detail"] = { ...section["detail"], ...data };
    },
    resetCoreDetail: (projects, action) => {
      const { name } = action.payload;
      const section = projects["core"][name];
      section["detail"] = { ...initialState["core"][name]["detail"] };
    },
    sectionDetailCreated: (projects, action) => {
      const { name } = action.payload;
      projects["myProjects"]["sectionCount"][name] += 1;
    },
    sectionDetailUpdated: (projects, action) => {
      const { data, name, id } = action.payload;
      const section = projects["core"][name];
      section["list"].forEach((item, i, arr) => {
        if (item.id == id) {
          arr[i] = { ...arr[i], ...data };
        }
      });
    },
    sectionDetailDeleted: (projects, action) => {
      const { name, id } = action.payload;
      const section = projects["core"][name];
      section["list"] = section["list"].filter((item) => item.id !== id);
      projects["myProjects"]["sectionCount"][name] -= 1;
    },

    fyMonthReceived: (projects, action) => {
      const { data } = action.payload;
      projects["core"]["fyMonth"]["month"] = data;
    },
  },
});
export const {
  totalAccessListReceived,
  coreAccessListUpdated,
  myProjectCreated,
  myProjectListReceived,
  myProjectDetailreceived,
  projectMemberProfilereceived,
  coreListReceived,
  coreDetailReceived,
  projectSectionCountReceived,
  sectionDetailCreated,
  sectionDetailUpdated,
  sectionDetailDeleted,
  resetCoreList,
  resetCoreDetail,
  fyMonthReceived,
} = slice.actions;

export default slice.reducer;

export const loadTotalAccessList =
  ({ requestDetails }) =>
  (dispatch) => {
    const requestParams = requestDetails.map(({ name, ...others }) => ({
      ...others,
    }));
    const sectionNames = requestDetails.map(({ name }) => name);

    return dispatch(
      apiCallBegan({
        requestParams,
        onSuccess: totalAccessListReceived({ sectionNames }),
      })
    );
  };

export const updateCoreAccessList =
  ({ baseUrl, name, id, data }) =>
  (dispatch) => {
    const url = baseUrl;
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: "post", data },
        onSuccess: coreAccessListUpdated({ name, id }),
      })
    );
  };

export const createMyProject = (url, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url, data, method: "post" },
      onSuccess: myProjectCreated(),
    })
  );
};
export const loadMyProjects =
  ({ url }) =>
  (dispatch) => {
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onSuccess: myProjectListReceived(),
      })
    );
  };

export const loadCoreDataList =
  ({ baseUrl, nestedUrlPathName, queryParams, name }) =>
  (dispatch) => {
    const url = baseUrl + nestedUrlPathName + queryParamGenerator(queryParams);
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onSuccess: coreListReceived({ name }),
      })
    );
  };
export const loadCoreDataDetail =
  ({ baseUrl, id, nestedUrlPathName, name }) =>
  (dispatch) => {
    const url = baseUrl + nestedUrlPathName + id + "/";
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onSuccess: coreDetailReceived({ name }),
      })
    );
  };
export const createSectionDetail =
  ({ baseUrl, nestedUrlPathName, name, data }) =>
  (dispatch) => {
    const url = baseUrl + nestedUrlPathName;
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: "post", data },
        onSuccess: sectionDetailCreated({ name }),
      })
    );
  };
export const updateSectionDetail =
  ({ baseUrl, id, nestedUrlPathName, method, name, data }) =>
  (dispatch) => {
    const url = baseUrl + nestedUrlPathName + id + "/";
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: method || "patch", data },
        onSuccess: sectionDetailUpdated({ name, id }),
      })
    );
  };

export const deleteSectionDetail =
  ({ baseUrl, id, nestedUrlPathName, name }) =>
  (dispatch) => {
    const url = baseUrl + nestedUrlPathName + id + "/";
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: "delete" },
        onSuccess: sectionDetailDeleted({ name, id }),
      })
    );
  };
export const closeSectionDetail =
  ({ baseUrl, data, id, nestedUrlPathName, name }) =>
  (dispatch) => {
    const url = baseUrl + nestedUrlPathName + id + "/";
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: "patch", data },
        onSuccess: sectionDetailDeleted({ name, id }),
      })
    );
  };
export const loadCoreDetail =
  ({ url, name }) =>
  (dispatch) => {
    return dispatch(
      apiCallBegan({
        requestParams: {},
        onSuccess: coreDetailReceived({ name }),
      })
    );
  };

export const loadFyMonth =
  ({ baseUrl }) =>
  (dispatch) => {
    const url = baseUrl;
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onSuccess: fyMonthReceived(),
      })
    );
  };

export const updateFyMonth =
  ({ baseUrl, data }) =>
  (dispatch) => {
    const url = baseUrl;
    return dispatch(
      apiCallBegan({
        requestParams: { url, data, method: "patch" },
        onSuccess: fyMonthReceived(),
      })
    );
  };
