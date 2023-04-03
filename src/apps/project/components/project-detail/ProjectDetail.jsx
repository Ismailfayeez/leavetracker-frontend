import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  myProjectDetailreceived,
  projectMemberProfilereceived,
  projectSectionCountReceived
} from '../../store/projects';
import { loadAllData } from '../../../../store/common/dispatchMethods';
import CreateProject from '../createProject/Index';
import { PROJECT_SECTION_NAMES } from '../../project.constants';
import { mapResponseToLocalKey } from '../../../../utilities/helper';
import ProjectOwnerCheckRoute from '../../utilities/components/ProjectOwnerCheckRoute';
import ProjectMemberCheckRoute from '../../utilities/components/ProjectMemberCheckRoute';
import ProjectDetailMain from './ProjectDetailMain';
import Employee from '../employee/Employee';
import Domain from '../domain/Domain';
import LeaveType from '../leaveType/LeaveType';
import LeaveDuration from '../leaveDuration/LeaveDuration';
import Admin from '../admin/Admin';
import Role from '../role/Role';
import AdminRole from '../adminRole/AdminRole';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import EditButton from '../../../../ui-kit/button/edit-button/EditButton';
import { MY_PROJECTS_URL, PROJECT_SECTION_URL_PATHNAMES } from '../../apiConstants';
import ProjectModalContent from '../project-modal-content/ProjectModalContent';
import './projectDetail.scss';

function ProjectDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [globalNav, setGlobalNav] = useState({
    prevNav: [],
    currentNav: '',
    nextNav: ''
  });
  const [globalVal, setGlobalVal] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { domain, leaveDuration, leaveType, role, employee, admin, adminRole } =
    PROJECT_SECTION_NAMES;
  const { myProfile, sectionCounts } = PROJECT_SECTION_URL_PATHNAMES;

  const myProjectDetailUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const projectMemberProfileUrl = `${MY_PROJECTS_URL}${projectId}/${myProfile}`;
  const sectionCountUrl = `${MY_PROJECTS_URL}${projectId}/${sectionCounts}`;
  const projectDetail = useSelector((state) => state.entities.projects.myProjects.detail);
  const myProjects = useSelector((state) => state.entities.projects.myProjects);
  const { projectMemberProfile } = myProjects;
  const enableEdit = () => setEdit(!edit);
  const localKeys = useMemo(
    () => ({
      [domain]: 'domain',
      [leaveDuration]: 'leave_duration',
      [leaveType]: 'leave_type',
      [role]: 'role',
      [employee]: 'employee',
      [admin]: 'admin',
      [adminRole]: 'admin_role'
    }),
    [admin, adminRole, domain, employee, leaveDuration, leaveType, role]
  );

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (projectId === 'new') {
        setIsLoading(false);
        return;
      }
      const response = await dispatch(
        loadAllData([
          { url: myProjectDetailUrl },
          { url: projectMemberProfileUrl },
          { url: sectionCountUrl }
        ])
      );
      dispatch(myProjectDetailreceived({ data: response[0].data }));
      dispatch(projectMemberProfilereceived({ data: response[1].data }));
      dispatch(
        projectSectionCountReceived({
          data: mapResponseToLocalKey(localKeys, response[2].data)
        })
      );
    } catch (err) {}
    setIsLoading(false);
  }, [
    dispatch,
    localKeys,
    myProjectDetailUrl,
    projectId,
    projectMemberProfileUrl,
    sectionCountUrl
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const memoizedState = useMemo(
    () => ({
      globalNav,
      setGlobalNav,
      globalVal,
      setGlobalVal,
      showModal,
      setShowModal
    }),
    [globalNav, globalVal, showModal]
  );
  if (projectId === 'new') return <CreateProject />;
  return (
    <ModalNavContext.Provider value={memoizedState}>
      <ProjectModalContent />
      <div className="project-detail page-layout">
        {!isLoading && (
          <header className="page-layout__header">
            <div className="flex flex-justify--space-between flex-align--center">
              <div className="flex flex--center">
                {location.pathname === `/project/${projectId}` && (
                  <div onClick={() => navigate(-1)} className="back-arrow" role="presentation">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>
                )}
                <h3 style={{ marginBottom: '3px' }}>{projectDetail.name}</h3>
              </div>
              {location.pathname === `/project/${projectId}` && projectMemberProfile.owner && (
                <EditButton onClick={enableEdit} content="Edit" />
              )}
            </div>
            <div className="flex" />
          </header>
        )}
        <Routes>
          <Route
            path="/"
            element={ProjectMemberCheckRoute({
              component: ProjectDetailMain,
              isLoading,
              edit,
              enableEdit
            })}
          />

          <Route
            path="employee"
            element={ProjectMemberCheckRoute({
              component: Employee,
              isLoading
            })}
          />
          <Route
            path="role"
            element={ProjectMemberCheckRoute({
              component: Role,
              isLoading
            })}
          />
          <Route
            path="domain"
            element={ProjectMemberCheckRoute({
              component: Domain,
              isLoading
            })}
          />
          <Route
            path="leave-duration"
            element={ProjectMemberCheckRoute({
              component: LeaveDuration,
              isLoading
            })}
          />
          <Route
            path="leave-type"
            element={ProjectMemberCheckRoute({
              component: LeaveType,
              isLoading
            })}
          />
          <Route
            path="admin"
            element={ProjectOwnerCheckRoute({
              component: Admin,
              isLoading
            })}
          />
          <Route
            path="admin-role"
            element={ProjectOwnerCheckRoute({
              component: AdminRole,
              isLoading
            })}
          />
        </Routes>
      </div>
    </ModalNavContext.Provider>
  );
}

export default ProjectDetail;
