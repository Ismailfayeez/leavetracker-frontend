import React from "react";
import { useContext } from "react";
import { PageNavContext } from "../../../../../utilities/context/PageNavContext";

function RenderPages({ pages, ...others }) {
  const { currentPage } = useContext(PageNavContext);
  return (
    <>
      {pages.map(({ name, component }) =>
        name == currentPage
          ? React.cloneElement(component, { ...others })
          : null
      )}
    </>
  );
}

export default RenderPages;
