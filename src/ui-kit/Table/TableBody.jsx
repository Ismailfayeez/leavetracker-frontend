import React from "react";
import _ from "lodash";

function TableBody({ data, columns }) {
  const renderCell = (item, column, index) => {
    if (column.content) return column.content(item, index);
    return _.get(item, column.path) || "-";
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)} className={column.className}>
              {renderCell(item, column, index)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
