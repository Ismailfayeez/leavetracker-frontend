import { createContext } from 'react';

const ModalNavContext = createContext({
  modalList: [],
  currentModal: '',
  modalData: {},
  showModal: false,
  setShowModal: () => {},
  setModalList: () => {},
  setCurrentModal: () => {},
  setModalData: () => {}
});
export default ModalNavContext;
