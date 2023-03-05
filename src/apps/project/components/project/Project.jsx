import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { LT_ACCESS_URL, PT_ACCESS_URL } from "../../apiConstants";
import { loadTotalAccessList } from "../../store/projects";
import MyProjects from "../my-projects/MyProjects";
import ProjectDetail from "../project-detail/ProjectDetail";
import "./project.scss";
function Project(props) {
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      await dispatch(
        loadTotalAccessList({
          requestDetails: [
            { url: LT_ACCESS_URL, name: "leaveTracker" },
            { url: PT_ACCESS_URL, name: "project" },
          ],
        })
      );
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="project app-content">
      <div className="project app-content__display-area">
        <div className="app-content__body">
          <Routes>
            <Route path="my-projects" element={<MyProjects />} />
            <Route path=":projectId/*" element={<ProjectDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Project;
