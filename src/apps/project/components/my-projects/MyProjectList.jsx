import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingScreen from "../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import { MY_PROJECTS_URL } from "../../apiConstants";
import { loadMyProjects } from "../../store/projects";
import ProjectCard from "../project-card/ProjectCard";
import { ReactComponent as AddTasksImg } from "../../../../assets/images/add-tasks.svg";
import AddButton from "../../../../ui-kit/button/add-button/AddButton";
import NoResult from "../../../../ui-kit/no-result/NoResult";
import "./myProject.scss";

function MyProjectList({
  isCreateProjectAccessAvailable,
  setDisplayCreateProjectModal,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const myProjects = useSelector((state) => state.entities.projects.myProjects);
  const fetchData = async () => {
    try {
      if (!isLoading) setIsLoading(true);
      await dispatch(
        loadMyProjects({
          url: MY_PROJECTS_URL,
        })
      );
    } catch (err) {
      console.log(err);
    }

    if (isLoading) setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const getGroupLogoContent = (text) => {
    const result = text
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return <div className="">{result}</div>;
  };
  const themes = [
    "card--theme-pink",
    "card--theme-green",
    "card--theme-coral",
    "card--theme-gray",
  ];

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading &&
        (myProjects.list.length > 0 ? (
          <ul className="grid grid-items-center grid-gap--10px my-projects__list-container">
            {myProjects.list.map((project, index) => {
              const theme = themes[index % themes.length];
              return (
                <ProjectCard
                  className={theme}
                  logo={getGroupLogoContent(project.name)}
                  title={
                    <Link
                      className="reactRouterLink"
                      to={`/project/${project.id}`}
                    >
                      {project.name}
                    </Link>
                  }
                  description={project.description}
                />
              );
            })}
          </ul>
        ) : isCreateProjectAccessAvailable ? (
          <div className="no-projects-found flex flex--center">
            <div className="flex flex--column flex--center gap--1rem">
              <AddTasksImg className="illustration base-size" />
              <AddButton
                content="Add Projects"
                onClick={() => setDisplayCreateProjectModal(true)}
                iconOnMobileScreen
              />
            </div>
          </div>
        ) : (
          <NoResult statement={"No projects found"} />
        ))}
    </>
  );
}

export default MyProjectList;
