import React from 'react';
import _ from 'lodash';
import { motion as m, AnimatePresence } from 'framer-motion';
import { listVariant } from '../../utilities/AnimateVariants';

function TableBody({ data, columns }) {
  const renderCell = (item, column, index) => {
    if (column.content) return column.content(item, index);
    return _.get(item, column.path) || '-';
  };

  const createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };
  return (
    <tbody>
      <AnimatePresence>
        {data.map((item, index) => (
          <m.tr key={item.id} variants={listVariant} layout initial="hidden" animate="visible">
            {columns.map((column) => (
              <td key={createKey(item, column)} className={column.className}>
                {renderCell(item, column, index)}
              </td>
            ))}
          </m.tr>
        ))}
      </AnimatePresence>
    </tbody>
  );
}

export default TableBody;
