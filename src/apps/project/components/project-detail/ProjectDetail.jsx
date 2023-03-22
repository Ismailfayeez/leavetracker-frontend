import React, { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  myProjectDetailreceived,
  projectMemberProfilereceived,
  projectSectionCountReceived,
} from "../../store/projects";
import { loadAllData } from "../../../../store/common/dispatchMethods";
import CreateProject from "../createProject/Index";
import { useSelector } from "react-redux";
import ModalContainer from "../utilities/ModalContainer";
import { MY_PROJECTS_URL } from "../../apiConstants";
import { PROJECT_SECTION_URL_PATHNAMES } from "../../apiConstants";
import { PROJECT_SECTION_NAMES } from "../../project.constants";
import { mapResponseToLocalKey } from "../../../../utilities/helper";
import ProjectOwnerCheckRoute from "../../utilities/components/ProjectOwnerCheckRoute";
import ProjectMemberCheckRoute from "../../utilities/components/ProjectMemberCheckRoute";
import ProjectDetailMain from "./ProjectDetailMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import "./projectDetail.scss";
import Employee from "../employee/Employee";
import Domain from "../domain/Domain";
import LeaveType from "../leaveType/LeaveType";
import LeaveDuration from "../leaveDuration/LeaveDuration";
import Admin from "../admin/Admin";
import Role from "../role/Role";
import AdminRole from "../adminRole/AdminRole";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import EditButton from "../../../../ui-kit/button/edit-button/EditButton";
function ProjectDetail(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [globalNav, setGlobalNav] = useState({
    prevNav: [],
    currentNav: "",
    nextNav: "",
  });
  const [globalVal, setGlobalVal] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { domain, leaveDuration, leaveType, role, employee, admin, adminRole } =
    PROJECT_SECTION_NAMES;
  const { myProfile, sectionCounts } = PROJECT_SECTION_URL_PATHNAMES;

  const myProjectDetailUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const projectMemberProfileUrl = `${MY_PROJECTS_URL}${projectId}/` + myProfile;
  const sectionCountUrl = `${MY_PROJECTS_URL}${projectId}/` + sectionCounts;
  const ProjectDetail = useSelector(
    (state) => state.entities.projects.myProjects.detail
  );
  const myProjects = useSelector((state) => state.entities.projects.myProjects);
  const { projectMemberProfile } = myProjects;
  const enableEdit = () => setEdit(!edit);

  const localKeys = {
    [domain]: "domain",
    [leaveDuration]: "leave_duration",
    [leaveType]: "leave_type",
    [role]: "role",
    [employee]: "employee",
    [admin]: "admin",
    [adminRole]: "admin_role",
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (projectId == "new") {
        setIsLoading(false);
        return;
      }
      const response = await dispatch(
        loadAllData([
          { url: myProjectDetailUrl },
          { url: projectMemberProfileUrl },
          { url: sectionCountUrl },
        ])
      );
      dispatch(myProjectDetailreceived({ data: response[0].data }));
      dispatch(projectMemberProfilereceived({ data: response[1].data }));
      dispatch(
        projectSectionCountReceived({
          data: mapResponseToLocalKey(localKeys, response[2].data),
        })
      );
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (projectId == "new") return <CreateProject />;
  return (
    <ModalNavContext.Provider
      value={{
        globalNav,
        setGlobalNav,
        globalVal,
        setGlobalVal,
        showModal,
        setShowModal,
      }}
    >
      <ModalContainer />
      <div className="project-detail page-layout">
        {!isLoading && (
          <header className="page-layout__header">
            <div className="flex flex-justify--space-between flex-align--center">
              <div className="flex flex--center">
                {location.pathname == `/project/${projectId}` && (
                  <div onClick={() => navigate(-1)} className="back-arrow">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>
                )}
                <h3 style={{ marginBottom: "3px" }}>{ProjectDetail.name}</h3>
              </div>
              {location.pathname == `/project/${projectId}` &&
                projectMemberProfile.owner && (
                  <EditButton onClick={enableEdit} content={"Edit"} />
                )}
            </div>
            <div className="flex"></div>
          </header>
        )}
        <Routes>
          <Route
            path="/"
            element={ProjectMemberCheckRoute({
              component: ProjectDetailMain,
              isLoading,
              edit,
              enableEdit,
            })}
          />

          <Route
            path="employee"
            element={ProjectMemberCheckRoute({
              component: Employee,
            })}
          />
          <Route
            path="role"
            element={ProjectMemberCheckRoute({
              component: Role,
            })}
          />
          <Route
            path="domain"
            element={ProjectMemberCheckRoute({
              component: Domain,
            })}
          />
          <Route
            path="leave-duration"
            element={ProjectMemberCheckRoute({
              component: LeaveDuration,
            })}
          />
          <Route
            path="leave-type"
            element={ProjectMemberCheckRoute({
              component: LeaveType,
            })}
          />
          <Route
            path="admin"
            element={ProjectOwnerCheckRoute({
              component: Admin,
            })}
          />
          <Route
            path="admin-role"
            element={ProjectOwnerCheckRoute({
              component: AdminRole,
            })}
          />
        </Routes>
      </div>
    </ModalNavContext.Provider>
  );
}

export default ProjectDetail;
