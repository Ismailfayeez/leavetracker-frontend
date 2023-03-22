import React from "react";
import "./leaveBalanceCard.scss";
function LeaveBalanceCard({ data }) {
  if (data.length <= 0)
    return (
      <div className="card  leaveBalance flex flex--center">
        <span>No Leave types added </span>
      </div>
    );
  return (
    <div className="card leaveBalance">
      <header>
        <h4 style={{ margin: 0, fontSize: "2rem" }}>Leave Balance</h4>
      </header>
      <section className="card__body overflow--auto">
        <table style={{ width: "100%", fontSize: "1.8rem" }}>
          {data.map((record) => (
            <tr>
              <td className="leaveBalance__name">{record.name}</td>
              <td className="leaveBalance__days">{record.balance} days</td>
            </tr>
          ))}
        </table>
      </section>
    </div>
  );
}

export default LeaveBalanceCard;
