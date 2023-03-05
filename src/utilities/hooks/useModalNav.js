import { useContext } from "react";

export function useModalNav(ModalNavContext) {
  const {
    globalNav,
    setGlobalNav,
    globalVal,
    setGlobalVal,
    showModal,
    setShowModal,
  } = useContext(ModalNavContext);

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setGlobalNav({ prevNav: [], currentNav: "" });
    setGlobalVal({});
  };

  const moveToNextNav = (data = {}, pathName) => {
    setGlobalVal({ ...globalVal, [pathName]: data });
    const globalNavData = { ...globalNav };
    if (globalNavData.currentNav)
      globalNavData.prevNav.push(globalNavData.currentNav);
    globalNavData.currentNav = pathName;
    setGlobalNav(globalNavData);
  };

  const moveToPrevNav = () => {
    const { prevNav } = globalNav;
    if (prevNav.length) {
      const val = { ...globalVal };
      delete val[globalNav.currentNav];
      setGlobalVal(val);
      const currentNav = prevNav[prevNav.length - 1];
      prevNav.splice(prevNav.length - 1, 1);
      setGlobalNav({ ...globalNav, prevNav, currentNav });
    }
  };

  return [
    {
      showModal,
      globalNav,
      globalVal,
      openModal,
      closeModal,
      moveToPrevNav,
      moveToNextNav,
    },
  ];
}
