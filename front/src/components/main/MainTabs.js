import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MainFoodTab from './MainFoodTab';
import MainExerciseTab from './MainExerciseTab';

const MainTabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

MainTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};

const MainTabs = ({ foodSelected, setFoodSelected, exerciseSelected, setExerciseSelected }) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="음식" {...a11yProps(0)} />
					<Tab label="운동" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<MainTabPanel value={value} index={0}>
				<MainFoodTab foodSelected={foodSelected} setFoodSelected={setFoodSelected} />
			</MainTabPanel>
			<MainTabPanel value={value} index={1}>
				<MainExerciseTab
					exerciseSelected={exerciseSelected}
					setExerciseSelected={setExerciseSelected}
				/>
			</MainTabPanel>
		</Box>
	);
};

export default MainTabs;
