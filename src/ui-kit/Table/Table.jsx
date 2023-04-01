import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import './table.scss';

function Table({ data, columns, className }) {
  return (
    <table className={`table ${className} `}>
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}

export default Table;
