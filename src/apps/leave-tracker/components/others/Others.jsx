import React from "react";
import Approvers from "./approvers/Approvers";
import { motion as m } from "framer-motion";
import { pageVariant } from "../../../../utilities/AnimateVariants";

function Others(props) {
  return (
    <m.div variants={pageVariant} initial="hidden" animate="visible">
      <Approvers />
    </m.div>
  );
}

export default Others;
