import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { motion as m } from 'framer-motion';
import { projectGlobalModalNav, PROJECT_SECTION_NAMES } from '../../project.constants';
import ProjectSectionCard from '../project-section-card/ProjectSectionCard';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import { ReactComponent as adminIcon } from '../../../../assets/images/administrator-developer-icon.svg';
import { ReactComponent as roleIcon } from '../../../../assets/images/business-card-icon.svg';
import { ReactComponent as durationIcon } from '../../../../assets/images/clock-rotate-right-icon.svg';
import { ReactComponent as adminRoleIcon } from '../../../../assets/images/repair-service-icon.svg';
import { ReactComponent as employeeIcon } from '../../../../assets/images/user-profile-icon.svg';
import { ReactComponent as DomainIcon } from '../../../../assets/images/working-on-laptop-icon.svg';
import { ReactComponent as leaveTypeIcon } from '../../../../assets/images/flight-ticket-icon.svg';
import { ReactComponent as fyMonthIcon } from '../../../../assets/images/clock-date-calendar-icon.svg';
import { pageVariant } from '../../../../utilities/AnimateVariants';
import Modal from '../../../../ui-kit/modal/Modal';
import Index from '../editProjectInfo/Index';
import useModalNav from '../../../../utilities/hooks/useModalNav';

function ProjectDetailMain(props) {
  const { edit, enableEdit } = props;
  const myProjects = useSelector((state) => state.entities.projects.myProjects);
  const { projectMemberProfile } = myProjects;
  const { sectionCount } = myProjects;
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);

  const { domain, leaveDuration, leaveType, role, employee, admin, adminRole } =
    PROJECT_SECTION_NAMES;

  const pages = [
    {
      label: 'Employee',
      path: 'employee',
      name: employee,
      icon: employeeIcon
    },
    {
      label: 'Role',
      path: 'role',
      name: role,
      icon: roleIcon
    },
    {
      label: 'Domain',
      path: 'domain',
      name: domain,
      icon: DomainIcon
    },
    {
      label: 'Leave Type',
      path: 'leave-type',
      name: leaveType,
      icon: leaveTypeIcon
    },
    {
      label: 'Leave Duration',
      path: 'leave-duration',
      name: leaveDuration,
      icon: durationIcon
    },
    {
      label: 'Admin',
      path: 'admin',
      name: admin,
      icon: adminIcon
    },
    {
      label: 'Admin Role',
      path: 'admin-role',
      name: adminRole,
      icon: adminRoleIcon
    },
    {
      label: 'Fy Month',
      path: 'fy-month',
      icon: fyMonthIcon,
      displayContent: useCallback(
        (displayProps) => (
          <ProjectSectionCard
            key={displayProps.path}
            {...displayProps}
            handleClickLabel={() => {
              openModal();
              moveToNextNav({}, projectGlobalModalNav.FYMONTH);
            }}
          />
        ),
        [moveToNextNav, openModal]
      )
    }
  ];
  const ownerPath = ['admin', 'admin-role', 'fy-month'];

  return (
    <m.main
      className="page-layout__main"
      style={{ padding: '0 0.5rem' }}
      variants={pageVariant}
      initial="hidden"
      animate="visible">
      {edit && (
        <Modal
          open={edit}
          handleClose={() => enableEdit(false)}
          height="md"
          width="sm"
          title="Edit Project">
          <Index setDisplayModal={enableEdit} />
        </Modal>
      )}
      <h4>Categories</h4>
      <div className="grid grid--1x2 grid--tablet gap--20px">
        {pages.map(({ displayContent, ...otherProps }) => {
          return !projectMemberProfile.owner &&
            ownerPath.includes(otherProps.path) ? null : displayContent ? (
            displayContent({ ...otherProps })
          ) : (
            <ProjectSectionCard
              key={otherProps.path}
              {...otherProps}
              totalRecordsCount={sectionCount[otherProps.name]}
            />
          );
        })}
      </div>
    </m.main>
  );
}

export default ProjectDetailMain;
