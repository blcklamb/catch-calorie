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
import Chip from '@mui/material/Chip';
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
		kcal: 100,
	},
	{
		value: 'cake',
		label: '케이크',
		kcal: 300,
	},
	{
		value: 'ham',
		label: '햄',
		kcal: 400,
	},
	{
		value: 'startham',
		label: '햄으로 시작',
		kcal: 450,
	},
	{
		value: 'chicken',
		label: '치킨',
		kcal: 800,
	},
	{
		value: 'fried-chicken',
		label: '후라이드 치킨',
		kcal: 520,
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
function MainFoodTab({
	foodSelected,
	setFoodSelected,
	IsFoodSelected,
	setIsFoodSelected,
	totalFood,
	setTotalFood,
}) {
	const [value, setValue] = React.useState();

	// inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
	const [inputValue, setInputValue] = React.useState('');

	const handleOnClick = () => {
		// console.log(foodSelected);
		setTotalFood(foodSelected.reduce((acc, cur) => acc + cur.kcal, totalFood));
		// setTotalFood(800);
		console.log(totalFood);
		setFoodSelected([]);
	};

	return (
		<div>
			{/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
			<div>{`inputValue: '${inputValue}'`}</div>
			<br /> */}
			<div style={{ display: 'flex' }}>
				<Autocomplete
					// multiple
					// disablePortal
					// disableCloseOnSelect
					id="controllable-states-demo"
					// value={foodSelected[0]?.label}
					value={value}
					options={foodList}
					sx={{ width: 300 }}
					renderInput={(params) => (
						<TextField
							{...params}
							// variant="standard"
							label="음식(kcal/100g)"
							placeholder="음식을 선택하세요"
						/>
					)}
					//
					getOptionLabel={(option) => [option.label, `(${option.kcal})`]}
					onChange={(event, newValue) => {
						// setFoodSelected([...foodSelected, newValue]);
						setFoodSelected([newValue]);
						// setValue(newValue);
					}}
					inputValue={inputValue}
					onInputChange={(event, newInputValue) => {
						setInputValue(newInputValue);
					}}
					noOptionsText={
						<div>
							<p>존재하지 않는 음식입니다</p>
							<Button
								variant="contained"
								color="primary"
								type="button"
								// startIcon={< AddIc fontSize="small" />}
								onClick={() => alert('추가')}
							>
								추가
							</Button>
						</div>
					}
				/>
				{/* 다중선택 */}
				{/* <Autocomplete
					multiple
					id="controllable-states-demo"
					value={foodSelected[0]?.label}
					options={foodList}
					sx={{ width: 300 }}
					onChange={(event, newValue) => {
						setFoodSelected(newValue);
					}}
					inputValue={inputValue}
					onInputChange={(event, newInputValue) => {
						setInputValue(newInputValue);
					}}
					// renderInput={(params) => <TextField {...params} label="음식" />}

					getOptionLabel={(option) => [option.label, `${option.kcal}`]}
					renderInput={(params) => (
						<TextField
							{...params}
							variant="standard"
							label="Multiple values"
							placeholder="Favorites"
						/>
					)}
				/> */}
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="outlined-basic"
						label="그램"
						variant="outlined"
						disabled
						value={100}
					/>
				</Box>
			</div>
			{/* <Button variant="contained" onClick={setIsFoodSelected(true)}> */}
			<Button variant="contained" onClick={handleOnClick}>
				확인
			</Button>
			{console.log(foodSelected)}
		</div>
	);
}

export default MainFoodTab;
