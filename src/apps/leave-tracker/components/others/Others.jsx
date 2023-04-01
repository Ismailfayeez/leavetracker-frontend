import React from 'react';
import { motion as m } from 'framer-motion';
import Approvers from './approvers/Approvers';
import { pageVariant } from '../../../../utilities/AnimateVariants';

function Others() {
  return (
    <m.div variants={pageVariant} initial="hidden" animate="visible">
      <Approvers />
    </m.div>
  );
}

export default Others;
