import React, { useState, useMemo, useCallback } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Autocomplete from '@mui/material/Autocomplete';

const exerciseList = [
	{
		value: 'hamburger',
		label: '걷기',
		kcal: 200
	},
	{
		value: 'cake',
		label: '달리기',
		kcal: 300
	},
	{
		value: 'ham',
		label: '달리면서 걷기',
		kcal: 560
	},
	{
		value: 'startham',
		label: '축구',
		kcal: 400
	},
	{
		value: 'chicken',
		label: '야구',
		kcal: 800
	},
];

// const options = ['Option 1', 'Option 2'];
function MainExerciseTab({ exerciseSelected, setExerciseSelected }) {
	// inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
	const [inputValue, setInputValue] = React.useState('');

	const handleOnClick = () => {
		console.log(exerciseSelected);
	};

	return (
		<div>
			{/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
			<div>{`inputValue: '${inputValue}'`}</div>
			<br /> */}
			<Autocomplete
				value={exerciseSelected}
				onChange={(event, newValue) => {
					setExerciseSelected(newValue);
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="controllable-states-demo"
				options={exerciseList}
				sx={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="운동" />}
			/>
			<Button variant="contained" onClick={handleOnClick}>
				확인
			</Button>
		</div>
	);
}

export default MainExerciseTab;
