import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainButton from './style/MainButton';
import MainInput from './style/MainInput';

// import MainFoodForm from './MainFoodForm';

import * as Api from '../../api';

function MainFoodForm({ foodSelected, setFoodSelected, totalFood, setTotalFood, foodFormList }) {
  const [value, setValue] = React.useState();
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState([]);

  const [foodApiList, setFoodApiList] = useState('');

  useEffect(() => {
    Api.get(`foods`).then((res) => setFoodApiList(res.data));
  }, []);

  const handleOnClickAdd = () => {
    alert('dsdfsdf');
  };

  const handleOnClickCheck = () => {
    setTotalFood(foodSelected.reduce((acc, cur) => acc + cur.kcal_per100g, totalFood));
    setFoodSelected([]);

    console.log(foodSelected[0]?._id);
    // Api.post(`tracking/food/${foodSelected[0]?._id}`) // .then((res) => setFoodApiList(res.data));
    Api.post(`tracking/food`, foodSelected[0]?._id); // .then((res) => setFoodApiList(res.data));
  };

  return (
    <div>
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
          getOptionLabel={(option) => option.name || ''} // , option.kcal_per100g
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
    </div>
  );
}

export default MainFoodForm;
