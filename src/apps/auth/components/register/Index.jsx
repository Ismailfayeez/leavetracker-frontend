import React from "react";
import { useState } from "react";
import { renderInput } from "../../../../utilities/uiElements";

function Index(props) {
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  return (
    <div>
      Login page
      {renderInput({ type: "email", name: "email", data, handleChange })}
      {renderInput({ type: "password", name: "password", data, handleChange })}
    </div>
  );
}

export default Index;
