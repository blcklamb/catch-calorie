import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainButton from './style/MainButton';
import MainInput from './style/MainInput';

// import MainFoodForm from './MainFoodForm';

import * as Api from '../../api';

function MainFoodForm({
  idx,
  foodSelected,
  setFoodSelected,
  totalFood,
  setTotalFood,
  foodFormList,
  kcalPerGram,
  setKcalPerGram,
}) {
  const [value, setValue] = React.useState();
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState([]);

  const [foodApiList, setFoodApiList] = useState('');
  const [gram, setGram] = useState([]);

  useEffect(() => {
    Api.get(`foods`).then((res) => setFoodApiList(res.data));
  }, []);

  const onChange = (e) => {
    setGram([...gram.slice(0, idx), e.target.value, ...gram.slice(idx + 1)]);
  };

  useEffect(() => {
    if (gram && gram.length) {
      // 빈 gram이 없다면 kcalPerGram 계산하여 배열 삽입
      setKcalPerGram([
        ...kcalPerGram.slice(0, idx),
        (Number(gram[idx]) / 100) * foodSelected[idx]?.kcal_per100g,
        ...kcalPerGram.slice(idx + 1),
      ]);
    } else {
      // 빈 gram이 있다면 해당 kcalPerGram에 0 삽입
      setKcalPerGram([
        ...kcalPerGram.slice(0, idx),
        0, 
        ...kcalPerGram.slice(idx + 1),
      ]);
    }
  }, [gram]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Autocomplete
          // multiple
          id="controllable-states-demo"
          // value={foodSelected[0]?.label}
          value={value}
          options={foodApiList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <MainInput {...params} label="Food(kcal/100g)" placeholder="Please select food" />
          )}
          //
          getOptionLabel={(option) => option.name || ''} // , option.kcal_per100g
          onChange={(event, newValue) => {
            setFoodSelected([...foodSelected, newValue]);
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
                // onClick={() => alert('기능 추후 보강')}
              >
                Add food
              </Button>
            </div>
          }
        />
        <div
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <MainInput id="outlined-basic" label="g" variant="outlined" onChange={onChange} />
        </div>
        <div>
          밸류 {value} 
          <br />
          인풋밸류 {inputValue}
          <br />
          {foodSelected[idx]?.kcal_per100g} 칼로리
          <br />
          {gram[idx]} 그램
          <br />총 {(Number(gram[idx]) / 100) * foodSelected[idx]?.kcal_per100g}
        </div>
      </div>
    </>
  );
}

export default MainFoodForm;
