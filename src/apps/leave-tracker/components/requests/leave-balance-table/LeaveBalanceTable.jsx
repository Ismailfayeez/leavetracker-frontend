import React from 'react';
import NoResult from '../../../../../ui-kit/no-result/NoResult';
import Table from '../../../../../ui-kit/Table/Table';

function LeaveBalanceTable(props) {
  const leaveBalancetableColumns = [
    { label: 'Name', path: 'name' },
    { label: 'Days', path: 'balance' }
  ];
  const { leaveBalance: data } = props;
  return (
    <div className="full-height">
      {data.length > 0 ? (
        <Table columns={leaveBalancetableColumns} data={data} className="table--transparant" />
      ) : (
        <NoResult statement="no leave balance found" noImage />
      )}
    </div>
  );
}

export default LeaveBalanceTable;
