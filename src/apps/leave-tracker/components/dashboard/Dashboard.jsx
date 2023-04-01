import React from 'react';
import { useSelector } from 'react-redux';
import { motion as m } from 'framer-motion';
import EmployeeInfo from './employee-Info/EmployeeInfo';
import Absentees from './absentees/Absentees';
import AbsenteesGroupLevelAnalysis from './absentees/absentees-group-level-analysis/AbsenteesGroupLevelAnalysis';
import { getFirstName } from '../../../../utilities/helper';
import { pageVariant } from '../../../../utilities/AnimateVariants';
import Reports from './reports/Reports';
import './dashboard.scss';
import '../leaveTracker.scss';

function Dashboard() {
  const currentUser = useSelector((state) => state.entities.auth.userProfile.currentUser.data);
  const lastName = getFirstName(currentUser.username);
  return (
    <m.div
      className="dashboard page-layout"
      variants={pageVariant}
      initial="hidden"
      animate="visible">
      <header className="page-layout__header">
        <h3>Hello, {lastName}</h3>
      </header>
      <main className="page-layout__main flex flex--column gap--20px">
        <Absentees />
        <EmployeeInfo />
        <AbsenteesGroupLevelAnalysis />
        <Reports />
      </main>
    </m.div>
  );
}

export default Dashboard;
