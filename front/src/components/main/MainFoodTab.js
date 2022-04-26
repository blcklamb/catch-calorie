import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainButton from './style/MainButton';
import MainInput from './style/MainInput';

import * as Api from '../../api';



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



function MainFoodTab({ foodSelected, setFoodSelected, totalFood, setTotalFood }) {
  const [value, setValue] = React.useState();
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState([]);

  const [foodApiList, setFoodApiList] = useState('');
  const [test, setTest] = useState('')
  const id = "626031a57d50b4f7accfe8aa" // 음식
  const name = "Applesauce"
  // const id = "626031a57d50b4f7accfe8aa" // 사용자
  

  useEffect(() => {
    Api.get(`foods`).then((res) => setFoodApiList(res.data));
    // Api.post(`api/foods/${id}`) //.then((res) => setTest(res.data));
    Api.post(`api/foods/${id}`) //.then((res) => setTest(res.data));
  }, []);

  console.log(foodApiList?.name);
  console.log(test);
  const handleOnClick = () => {
    setTotalFood(foodSelected.reduce((acc, cur) => acc + cur.kcal_per100g, totalFood));
    // console.log(totalFood);
    setFoodSelected([]);
  };

  return (
    <div>
      {console.log(foodApiList)}
      <div style={{ display: 'flex' }}>
        <Autocomplete
          // multiple
          // disablePortal
          // disableCloseOnSelect
          id="controllable-states-demo"
          // value={foodSelected[0]?.label}
          value={value}
          options={foodApiList}
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
          getOptionLabel={(option) => option.name || ""} // , option.kcal_per100g
          
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
      <MainButton variant="contained" onClick={handleOnClick}>
        check
      </MainButton>
      {/* {console.log(foodSelected)} */}
    </div>
  );
}

export default MainFoodTab;
