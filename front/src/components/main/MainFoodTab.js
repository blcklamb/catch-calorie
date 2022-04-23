import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Autocomplete from '@mui/material/Autocomplete';

import MainButton from './style/MainButton'
import MainInput from './style/MainInput'

const foodList = [
  {
    value: 'hamburger',
    label: 'hamburger',
    kcal: 100,
  },
  {
    value: 'cake',
    label: 'cake',
    kcal: 300,
  },
  {
    value: 'ham',
    label: 'ham',
    kcal: 400,
  },
  {
    value: 'strawberry-cake',
    label: 'strawberry-cake',
    kcal: 450,
  },
  {
    value: 'chicken',
    label: 'chicken',
    kcal: 800,
  },
  {
    value: 'fried-chicken',
    label: 'fried-chicken',
    kcal: 520,
  },
];

// const MainButton = styled(Button)({
// 	// background: 'linear-gradient(45deg, #da534e 30%, #FF8E53 90%)',
// 	backgroundColor: '#F03E3E', 
// 	border: 0,
// 	borderRadius: 20,
// 	// boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
// 	color: 'white',
// 	height: 48,
// 	padding: '0 30px',
// 	// background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// 	// border: 0,
// 	// borderRadius: 3,
// 	// boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
// 	// color: 'white',
// 	// height: 48,
// 	// padding: '0 30px',
//   });

function MainFoodTab({ foodSelected, setFoodSelected, totalFood, setTotalFood }) {
  const [value, setValue] = React.useState();

  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState('');

  const handleOnClick = () => {
    setTotalFood(foodSelected.reduce((acc, cur) => acc + cur.kcal, totalFood));
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
            <MainInput
              {...params}
              // variant="standard"
              label="Food(kcal/100g)"
              placeholder="Please select food"
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
              <p>No option</p>
              <Button
                variant="contained"
                color="primary"
                type="button"
                // startIcon={< AddIc fontSize="small" />}
                // onClick={() => alert('기능 추후 보강')}
              >
                Add food
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
          <MainInput id="outlined-basic" label="g" variant="outlined" disabled value={100} />
        </Box>
      </div>
      {/* <Button variant="contained" onClick={setIsFoodSelected(true)}> */}
      <MainButton variant="contained" onClick={handleOnClick}>
        check
      </MainButton>
      {console.log(foodSelected)}
    </div>
  );
}

export default MainFoodTab;
