export const overlayVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const floatingSideBarVariant = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: { ease: "easeIn" },
  },
};

export const modalVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { ease: "easeIn" },
  },
};

export const buttonBasicVariant = {
  whileTap: { scale: 0.9 },
};

export const pageVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    duration: 3,
  },
};

export const listVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
