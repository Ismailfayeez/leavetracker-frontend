import { useContext } from 'react';

export default function usePageNav(PageNavContext) {
  const { pageList, setPageList, currentPage, setCurrentPage } = useContext(PageNavContext);

  const moveToNextPage = (pathName) => {
    if (currentPage) setPageList([...pageList, currentPage]);
    setCurrentPage(pathName);
  };

  const moveToPrevPage = () => {
    if (pageList.length) {
      setCurrentPage(pageList[pageList.length - 1]);
      setPageList(pageList.slice(0, pageList.length - 1));
    }
  };

  return [
    {
      moveToNextPage,
      moveToPrevPage
    }
  ];
}
