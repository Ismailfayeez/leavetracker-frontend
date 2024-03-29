import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { LT_ACCESS_URL, PT_ACCESS_URL } from '../../apiConstants';
import { loadTotalAccessList } from '../../store/projects';
import MyProjects from '../my-projects/MyProjects';
import ProjectDetail from '../project-detail/ProjectDetail';
import './project.scss';

function Project() {
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    try {
      await dispatch(
        loadTotalAccessList({
          requestDetails: [
            { url: LT_ACCESS_URL, name: 'leaveTracker' },
            { url: PT_ACCESS_URL, name: 'project' }
          ]
        })
      );
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="project app-main-display">
      <div className="full-height overflow--auto">
        <main className="app-main">
          <Routes>
            <Route path="my-projects" element={<MyProjects />} />
            <Route path=":projectId/*" element={<ProjectDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Project;
