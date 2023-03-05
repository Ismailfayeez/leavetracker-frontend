export const addLeaveBalance = (currentLeaveBalance, leaveCode, days) => {
  const newleaveBalance = [...currentLeaveBalance];
  const index = newleaveBalance.findIndex((item) => item.code == leaveCode);
  if (index != -1) {
    newleaveBalance.splice(index, 1, {
      ...newleaveBalance[index],
      balance: newleaveBalance[index].balance - days,
      leave_taken: newleaveBalance[index].leave_taken + days,
    });
  }
  return newleaveBalance;
};
export const removeLeaveBalance = (currentLeaveBalance, leaveCode, days) => {
  const newleaveBalance = [...currentLeaveBalance];

  const index = newleaveBalance.findIndex((item) => item.code == leaveCode);
  if (index != -1) {
    newleaveBalance.splice(index, 1, {
      ...newleaveBalance[index],
      balance: newleaveBalance[index].balance + days,
      leave_taken: newleaveBalance[index].leave_taken - days,
    });
  }
  return newleaveBalance;
};
