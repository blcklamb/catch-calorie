// const MainFoodTab = () => {
// 	return (
// 		<div>
//             <div>안녕하세요 음식!</div>
//         </div>
// 	);
// }

// export default MainFoodTab;

import React, { useState, useMemo, useCallback } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { getRegExp } from 'korean-regexp';
import { debounce } from 'lodash';

import Autocomplete from '@mui/material/Autocomplete';

const foodList = [
	{
		value: 'hamburger',
		label: '햄버거',
	},
	{
		value: 'cake',
		label: '케이크',
	},
	{
		value: 'ham',
		label: '햄',
	},
	{
		value: 'startham',
		label: '햄으로 시작',
	},
	{
		value: 'chicken',
		label: '치킨',
	},
	{
		value: 'fried-chicken',
		label: '후라이드 치킨',
	},
];

// export default function SelectTextFields() {
// 	const [currency, setCurrency] = useState('EUR');

// 	const [food, setFood] = useState('');
// 	const [isFoodFilled, setIsFoodFilled] = useState(false);
// 	const [searchFood, setSearchFood] = useState([]);

// 	const search = (e) => {
// 		// console.log(e.target.value)
// 		// debounce((e) => {
// 		// 	const regexp = getRegExp(e.target.value, {
// 		// 		initialSearch: true,
// 		// 		fuzzy: true,
// 		// 	});

// 		// 	console.log(regexp);

// 		const searchList = foodList.filter((food) => {
// 			return food?.label?.match(e.target.value);
// 		});
// 		setSearchFood([...searchList]);
// 		// });
// 	};

// 	const handleOnChange = (e) => {
// 		if (!e.target.value.length) {
// 			setIsFoodFilled(false);
// 		} else {
// 			setIsFoodFilled(true);
// 			search(e);
// 		}
// 	};

// 	return (
// 		<Box
// 			component="form"
// 			sx={{
// 				'& .MuiTextField-root': { m: 1, width: '25ch' },
// 			}}
// 			noValidate
// 			autoComplete="off"
// 		>
// 			<div>
// 				<TextField
// 					id="outlined-select-currency"
// 					// select
// 					label="음식"
// 					variant="outlined"
// 					value={food}
// 					onChange={handleOnChange}
// 				></TextField>
// 				{console.log(food)}
// 				{isFoodFilled &&
// 					searchFood.map((option) => (
// 						<MenuItem
// 							key={option.value}
// 							value={option.value}
// 							style={{ cursor: 'pointer' }}
// 							onClick={() => {
// 								console.log(option.value);
// 								setFood(option.label)
// 							}}
// 						>
// 							{option.label}
// 						</MenuItem>
// 					))}
// 			</div>
// 		</Box>
// 	);
// }

// function ComboBox() {
// 	const [value, setValue] = React.useState(null);

// 	return (
// 		<div>
// 			<Autocomplete
// 				// disablePortal
// 				id="combo-box-demo"
// 				options={foodList}
// 				value={value}
// 				// onChange={(event, newValue) => {
// 				// 	setValue(newValue);
// 				// }}
// 				onChange={console.log('안')}
// 				// onClick={() => {
// 				// 	console.log('d');
// 				// }}
// 				sx={{ width: 300 }}
// 				renderInput={(params) => <TextField {...params} label="음식" />}
// 			/>
// 			<div></div>
// 		</div>
// 	);
// }

// export default ComboBox;

// const options = ['Option 1', 'Option 2'];
function MainFoodTab({ foodSelected, setFoodSelected }) {
	// inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
	const [inputValue, setInputValue] = React.useState('');

	const handleOnClick = () => {
		console.log(foodSelected);
	};

	return (
		<div>
			{/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
			<div>{`inputValue: '${inputValue}'`}</div>
			<br /> */}
			<Autocomplete
				value={foodSelected}
				onChange={(event, newValue) => {
					setFoodSelected(newValue.label);
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="controllable-states-demo"
				options={foodList}
				sx={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="음식" />}
			/>
			<Button variant="contained" onClick={handleOnClick}>
				확인
			</Button>
		</div>
	);
}

export default MainFoodTab;
