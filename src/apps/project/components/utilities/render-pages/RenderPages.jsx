import React, { useContext } from 'react';

import { PageNavContext } from '../../../../../utilities/context/PageNavContext';

function RenderPages({ pages, ...otherProps }) {
  const { currentPage } = useContext(PageNavContext);
  return (
    <>
      {pages.map(({ name, component }) =>
        name === currentPage ? React.cloneElement(component, { ...otherProps, key: name }) : null
      )}
    </>
  );
}

export default RenderPages;
