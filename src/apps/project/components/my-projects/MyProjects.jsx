import React from "react";
import {
  projectGlobalModalNav,
  PROJECT_APP_PERMISSIONS,
  PROJECT_SECTION_LABELS,
} from "../../project.constants";
import MyProjectList from "./MyProjectList";
import "./myProject.scss";
import { useSelector } from "react-redux";
import AddButton from "../../../../ui-kit/button/add-button/AddButton";
import Index from "../createProject/Index";
import Modal from "../../../../ui-kit/modal/Modal";
import { useState } from "react";
function MyProjects(props) {
  const myProjects = useSelector((state) => state.entities.projects.myProjects);
  const [displayCreateProjectModal, setDisplayCreateProjectModal] =
    useState(false);
  const currentUser = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data
  );
  const isCreateProjectAccessAvailable =
    currentUser.access &&
    currentUser.access
      .map((item) => item.code)
      .includes(PROJECT_APP_PERMISSIONS.CREATE_PROJECT);
  return (
    <div className="my-projects full-height page-layout gap--1rem">
      {displayCreateProjectModal && (
        <Modal
          open={displayCreateProjectModal}
          handleClose={() => setDisplayCreateProjectModal(false)}
          height="md"
          width="sm"
          title="Create Project"
        >
          <Index setDisplayModal={setDisplayCreateProjectModal} />
        </Modal>
      )}
      <header className="flex flex--space-between-align-center page-layout__header">
        <h3 className="mb-0">{PROJECT_SECTION_LABELS.myProjects}</h3>
        {isCreateProjectAccessAvailable && myProjects.list.length > 0 && (
          <AddButton
            content="Add Project"
            onClick={() => setDisplayCreateProjectModal(true)}
            iconOnMobileScreen
          />
        )}
      </header>
      <main className="page-layout__main">
        <MyProjectList
          isCreateProjectAccessAvailable={isCreateProjectAccessAvailable}
          setDisplayCreateProjectModal={setDisplayCreateProjectModal}
        />
      </main>
    </div>
  );
}

export default MyProjects;
