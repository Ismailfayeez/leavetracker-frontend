import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storeDataToLocal } from "../../../../utilities/helper";
import { renderInput } from "../../../../utilities/uiElements";

function Index({ enableEdit }) {
  const fields = [{ name: "name" }, { name: "description" }];
  const projectDetail = useSelector(
    (state) => state.entities.projects.myProjects.detail
  );
  const [data, setData] = useState(storeDataToLocal(projectDetail, fields));
  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = () => {
    enableEdit();
  };
  useEffect(() => {
    setData({ ...data, ...storeDataToLocal(projectDetail, fields) });
  }, [projectDetail]);
  return (
    <div>
      <div onClick={enableEdit}>X</div>
      {renderInput({
        name: "name",
        data,
        label: "name",
        handleChange,
        autoComplete: "off",
      })}
      {renderInput({
        name: "description",
        data,
        label: "description",
        handleChange,
        autoComplete: "off",
      })}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Index;
