import { createContext } from "react";

export const ModalNavContext = createContext({
  modalList: [],
  currentModal: "",
  modalData: {},
  showModal: false,
  setShowModal: () => {},
  setModalList: () => {},
  setCurrentModal: () => {},
  setModalData: () => {},
});
