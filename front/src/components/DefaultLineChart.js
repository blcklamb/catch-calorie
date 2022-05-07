import React from 'react';
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';

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
    // <ResponsiveContainer width="90%" height="90%">
    <AreaChart
      width={700}
      height={350}
      data={data}
      margin={{
        top: 30,
        right: 30,
        bottom: 50,
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
          offset: 10,
          fontWeight: 'bold',
          fontSize: '1rem',
          fontFamily: 'Roboto',
        }}
        style={{
          fontSize: '1rem',
          fontFamily: 'Roboto',
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
          dy: 2,
          fontWeight: 'bold',
          fontSize: '1rem',
          fontFamily: 'Roboto',
        }}
        style={{
          fontSize: '1rem',
          fontFamily: 'Roboto',
        }}
      />
      <Area dataKey="BMI" stroke="#FBCCCC" fill=" #FBCCCC" />
      <Tooltip content={<CustomTooltip />} />
      <Tooltip />
    </AreaChart>
    // </ResponsiveContainer>
  );
}

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p
          className="label"
          style={{ fontWeight: 'bold', color: '#77b63e', fontSize: '20px' }}
        >{`BMI  : ${payload[0].value[0]} ~ ${payload[0].value[1]}`}</p>
        <p
          className="label"
          style={{ fontWeight: 'bold', color: '#e85858', fontSize: '20px' }}
        >{`Physical Activities : ${label}`}</p>
      </div>
    );
  }

  return null;
}
