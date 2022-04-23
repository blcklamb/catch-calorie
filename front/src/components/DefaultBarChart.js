import { ResponsiveBar } from '@nivo/bar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
	{
		day: 'Insufficient',
		CalorieMonitoring: 30,
	},
	{
		day: 'Normal',
		CalorieMonitoring: 33,
	},
	{
		day: 'Overweight',
		CalorieMonitoring: 62,
	},
	{
		day: 'obesity',
		CalorieMonitoring: 110,
	},
];

const BarChart = () => {
	return (
		<ResponsiveBar
			data={data}
			keys={['CalorieMonitoring']}
			indexBy="day"
			margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
			padding={0.4}
			valueScale={{ type: 'linear' }}
			colors="#94D82D"
			animate={true}
			enableLabel={false}
			axisTop={null}
			axisRight={null}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'CalorieMonitoring',
				legendPosition: 'middle',
				legendOffset: -40,
			}}
		/>
	);
};

export default BarChart;
