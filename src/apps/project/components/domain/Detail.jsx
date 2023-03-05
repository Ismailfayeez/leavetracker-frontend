import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import domainSchema from "./domain.schema";
import SectionDetail from "../utilities/section/detail/Detail";
import {
  PROJECT_SECTION_LABELS,
  PROJECT_SECTION_NAMES,
} from "../../project.constants";
import Edit from "../utilities/section/detail/edit/Edit";
import View from "../utilities/section/detail/view/View";
import {
  MY_PROJECTS_URL,
  PROJECT_SECTION_URL_PATHNAMES,
} from "../../apiConstants";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";

function DomainDetail(props) {
  const { projectId } = useParams();
  const { domain: name } = PROJECT_SECTION_NAMES;
  const { domain: label } = PROJECT_SECTION_LABELS;
  const { domain: nestedUrlPathName } = PROJECT_SECTION_URL_PATHNAMES;
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/`;
  const [{ globalVal, globalNav }] = useModalNav(ModalNavContext);
  const { id } = globalVal[globalNav.currentNav];
  const primaryField = "code";
  const viewFields = [
    { name: "name", label: "name" },
    { name: "code", label: "code" },
  ];

  const editFields = viewFields;
  return (
    <SectionDetail
      sectionConstants={{
        name,
        label,
        nestedUrlPathName,
        baseUrl,
        queryParamKey: "search",
        primaryField,
      }}
      sectionId={id}
      viewFields={viewFields}
      editFields={editFields}
      view={View}
      edit={Edit}
      schema={domainSchema}
    />
  );
}

export default DomainDetail;
