import React from "react";
function RenderTextContent({ columns, data, className }) {
  return (
    <div className="flex flex--column gap--1rem">
      {data.map((item) => (
        <>
          <div className={` ${className || ""}`}>
            {columns.map((column) => column)}
          </div>
        </>
      ))}
    </div>
  );
}

export default RenderTextContent;
