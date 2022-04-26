import React from 'react';

import { XAxis, YAxis, ResponsiveContainer, Cell, Bar, Tooltip, BarChart } from 'recharts';

export function DefaultBarChart({ data, colors }) {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        data={[
          { name: 'Underweight', SCC: '250' },
          { name: 'Normal', SCC: '280' },
          { name: 'Overweight', SCC: '580' },
          { name: 'Obesity', SCC: '980' },
        ]}
        margin={{
          top: 20,
          // right: 30,
          // left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" stroke="#000" tick={{ fontSize: '1vw' }} />
        <YAxis stroke="#000" tick={{ fontSize: '1.2vw' }} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        {/* <Legend
          width={100}
          wrapperStyle={{
            top: 320,
            right: 12,
            backgroundColor: '#FFFBFB',
            border: '2px solid #d5d5d5',
            borderRadius: 4,
            lineHeight: '50px',
          }}
        /> */}
        <Bar dataKey="SCC" fill="#82ca9c">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="tooltip">
        <p
          className="label"
          style={{ fontWeight: 'normal', color: '000', fontSize: '30px' }}
        >{`${payload[0].value}People`}</p>
      </div>
    );
  }

  return null;
};
