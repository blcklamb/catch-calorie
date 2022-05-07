import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: '1970',
    USA: 12,
    NonUSA: 3,
  },
  {
    name: '1975',
    USA: 14,
    NonUSA: 5,
  },
  {
    name: '1980',
    USA: 16,
    NonUSA: 8,
  },
  {
    name: '1985',
    USA: 19,
    NonUSA: 10,
  },
  {
    name: '1990',
    USA: 25,
    NonUSA: 12,
  },
  {
    name: '1995',
    USA: 29,
    NonUSA: 13,
  },
  {
    name: '2000',
    USA: 32,
    NonUSA: 15,
  },
  {
    name: '2005',
    USA: 35,
    NonUSA: 16,
  },
  {
    name: '2010',
    USA: 37,
    NonUSA: 17,
  },
];

export default function DefaultObesityLineChart() {
  return (
    <LineChart
      width={700}
      height={350}
      data={data}
      margin={{
        top: 20,
        right: 10,
        left: -5,
        bottom: 20,
      }}
    >
      <XAxis
        dataKey="name"
        padding={{ left: 40, right: 40 }}
        fontSize="20"
        stroke="#000"
        label={{
          position: 'bottom',
          offset: 3,
          fontSize: '15px',
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
        domain={[0, 40]}
        padding={{ left: 40, right: 40 }}
        fontSize="10"
        stroke="#000"
        label={{
          angle: -90,
          value: 'Mean Obesity',
          position: 'insideLeft',
          dy: 30,
          offset: 15,
          fontSize: '15px',
          fontWeight: 'bold',
          fontSize: '1rem',
          fontFamily: 'Roboto',
        }}
        style={{
          fontSize: '1rem',
          fontFamily: 'Roboto',
        }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="bottom" align="right" height={1} fontFamily="Roboto" />
      <Line type="monotone" dataKey="USA" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="NonUSA" stroke="#82ca9d" />
    </LineChart>
  );
}

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          fontWeight: 'normal',
          color: ' #77b63e',

          fontFamily: 'Roboto',
        }}
      >
        <h2>{`${label}'s  Mean Obesity `}</h2>
        <p
          className="label"
          style={{
            fontWeight: 'bold',
            color: '#e85858',
            fontSize: '1.2rem',
            fontFamily: 'Roboto',
          }}
        >
          {`USA  : ${payload[0].value}`} <br />
          {`NonUSA : ${payload[1].value}`}
        </p>
      </div>
    );
  }

  return null;
}
