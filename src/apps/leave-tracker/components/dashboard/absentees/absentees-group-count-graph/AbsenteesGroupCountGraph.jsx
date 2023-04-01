import React from 'react';
import { useSelector } from 'react-redux';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
import './absenteesGroupCountGraph.scss';

function AbsenteesGroupCountGraph({ date }) {
  const absenteesCountByGroup = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.absentees.absenteesCountByGroup
  );
  const graphData = absenteesCountByGroup.data[date] || [];
  const data = graphData.map(({ name, leave_count: leaveCount }) => ({
    name,
    value: leaveCount
  }));

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central">
        {data[index].value}
      </text>
    );
  };
  const COLORS = ['#04a2d5', '#5fbfd8', '#f8e9d4', '#fd878a', '#2e84a7', '#87ccdb'];

  return (
    <div className="absentees-group-count-graph-container">
      <div className="absentees-group-count-graph" style={{ fontSize: '1.6rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="100%"
              fill="#8884d8"
              dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="piechart-label-container">
        {data.map(({ name }, index) => (
          <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }} key={name}>
            <span className="circle" style={{ background: COLORS[index] }} /> {name}
            {index + 1 < data.length && ','}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

export default AbsenteesGroupCountGraph;
