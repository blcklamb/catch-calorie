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
    label: '양념 치킨',
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
          <TextField id="outlined-basic" label="그램" variant="outlined" disabled value={100} />
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
