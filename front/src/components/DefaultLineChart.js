import React from 'react';
import { AreaChart, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';

const data = [
  {
    day: '4~5',
    BMI: [24, 26],
  },
  {
    day: '2~4',
    BMI: [27, 29],
  },
  {
    day: '1~2',
    BMI: [29, 30],
  },
  {
    day: '0',
    BMI: [30, 32],
  },
];

export default function DefaultLineChart() {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis
          dataKey="day"
          padding={{ left: 40, right: 40 }}
          fontSize="20"
          stroke="#000"
          label={{
            value: 'Physical Activities',
            position: 'bottom',
            offset: 3,
            fontSize: '15px',
            fontWeight: 'bold',
          }}
        />
        <YAxis
          domain={[24, 32]}
          padding={{ left: 30, right: 40 }}
          fontSize="20"
          stroke="#000"
          label={{
            value: 'BMI',
            angle: -90,
            position: 'insideLeft',
            offset: 0,
            fontSize: '15px',
            fontWeight: 'bold',
          }}
        />
        <Area dataKey="BMI" stroke="#94D82D" fill="#94D82D" />
        <Tooltip content={<CustomTooltip />} />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p
          className="label"
          style={{ fontWeight: 'normal', color: '000', fontSize: '20px' }}
        >{`BMI  : ${payload[0].value[0]} ~ ${payload[0].value[1]}`}</p>
        <p
          className="label"
          style={{ fontWeight: 'normal', color: '000', fontSize: '20px' }}
        >{`Physical Activities : ${label}`}</p>
      </div>
    );
  }

  return null;
}
