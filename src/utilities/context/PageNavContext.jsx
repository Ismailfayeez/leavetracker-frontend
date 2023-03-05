import { createContext } from "react";

export const PageNavContext = createContext({
  pageList: [],
  setPageList: () => {},
  currentPage: "",
  setCurrentPage: () => {},
});
