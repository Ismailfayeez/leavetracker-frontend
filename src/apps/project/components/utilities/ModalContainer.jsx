import React from 'react';

import Modal from '../../../../ui-kit/modal/Modal';
import NotFound from '../../../../ui-kit/not-found/NotFound';
import { projectGlobalModalNav } from '../../project.constants';
import FyMonth from '../fyMonthRange/FyMonth';
import EmployeeDetail from '../employee/EmployeeDetail';
import LeaveTypeDetail from '../leaveType/LeaveTypeDetail';
import DomainDetail from '../domain/DomainDetail';
import LeaveDurationDetail from '../leaveDuration/LeaveDurationDetail';
import AdminDetail from '../admin/AdminDetail';
import RoleDetail from '../role/RoleDetail';
import AdminRoleDetail from '../adminRole/AdminRoleDetail';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../utilities/hooks/useModalNav';
import ConfirmationModalContent from '../../../../ui-kit/confirmation-modal-content/ConfirmationModalContent';

function ModalContainer() {
  const [{ closeModal, globalVal, globalNav, showModal }] = useModalNav(ModalNavContext);
  let children = '';
  const className = '';
  let otherProps = {};
  switch (globalNav.currentNav) {
    case projectGlobalModalNav.EMPLOYEE:
      children = <EmployeeDetail />;
      otherProps = { height: 'md', width: 'sm', title: 'Employee' };
      break;
    case projectGlobalModalNav.ROLE:
      children = <RoleDetail />;
      otherProps = { height: 'md', width: 'sm', title: 'Role' };
      break;
    case projectGlobalModalNav.DOMAIN:
      children = <DomainDetail />;
      otherProps = { height: 'md', width: 'sm', title: 'Domain' };
      break;
    case projectGlobalModalNav.LEAVETYPE:
      children = <LeaveTypeDetail />;
      otherProps = { height: 'md', width: 'sm', title: 'Leave Type' };
      break;
    case projectGlobalModalNav.LEAVEDURATION:
      children = <LeaveDurationDetail />;
      otherProps = { height: 'md', width: 'sm', title: 'Leave Duration' };
      break;
    case projectGlobalModalNav.ADMIN:
      children = <AdminDetail />;
      otherProps = { height: 'md', width: 'sm', title: 'Admin' };
      break;
    case projectGlobalModalNav.ADMINROLE:
      children = <AdminRoleDetail />;
      otherProps = { height: 'md', width: 'sm', title: 'Admin Role' };
      break;
    case projectGlobalModalNav.FYMONTH:
      children = <FyMonth />;
      otherProps = { height: 'md', width: 'sm', title: 'Fy Month' };
      break;
    case projectGlobalModalNav.CONFIRMATION:
      children = <ConfirmationModalContent {...globalVal[projectGlobalModalNav.CONFIRMATION]} />;
      otherProps = { height: 'sm', width: 'sm' };
      break;
    default:
      children = <NotFound />;
      break;
  }
  return (
    <Modal className={className} open={showModal} handleClose={() => closeModal()} {...otherProps}>
      {children}
    </Modal>
  );
}

export default ModalContainer;
