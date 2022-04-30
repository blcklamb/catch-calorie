import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainInput from './style/MainInput';

import * as Api from '../../api';

import TextField from '@mui/material/TextField';

import { useRecoilState } from 'recoil';
import { foodSelectedState, gramState, kcalPerGramState } from '../../atoms';

function MainFoodForm({
  idx,
  // foodSelected,
  // setFoodSelected,
  // gram,
  // setGram,
  // kcalPerGram,
  // setKcalPerGram,
}) {
  const navigate = useNavigate();

  const [value, setValue] = useState();
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = useState([]);
  
  const [foodSelected, setFoodSelected] = useRecoilState(foodSelectedState);
  const [gram, setGram] = useRecoilState(gramState);
  const [kcalPerGram, setKcalPerGram] = useRecoilState(kcalPerGramState);

  const [foodApiList, setFoodApiList] = useState('');


  useEffect(() => {
    Api.get(`foods`).then((res) => setFoodApiList(res.data));

    // 인덱스 수 대로 배열 속 생성
    setGram([...gram.slice(0, idx), 0, ...gram.slice(idx + 1)]);
  }, []);

  const onChangeFood = (e, value) => {
    setFoodSelected([...foodSelected.slice(0, idx), value, ...foodSelected.slice(idx + 1)]);
  };

  const onChangeGram = (e) => {
    setGram([...gram.slice(0, idx), e.target.value, ...gram.slice(idx + 1)]);
  };

  useEffect(() => {
    if (Number(gram[idx]) === 0 || !foodSelected[idx]?.kcal_per_100g) {
      setKcalPerGram([...kcalPerGram.slice(0, idx), 0, ...kcalPerGram.slice(idx + 1)]);
      // console.log('하나', idx);
      // console.log(kcalPerGram);
    } else {
      // console.log('둘');
      // console.log(idx, gram[idx], foodSelected[idx]?.kcal_per100g);
      setKcalPerGram([
        ...kcalPerGram.slice(0, idx),
        (Number(gram[idx]) / 100) * foodSelected[idx]?.kcal_per_100g,
        ...kcalPerGram.slice(idx + 1),
      ]);
    }

    if (foodSelected[idx] === null) {
      setFoodSelected([...foodSelected.slice(0, idx), 0, ...foodSelected.slice(idx + 1)]);
    }
  }, [gram[idx], foodSelected[idx]]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Autocomplete
          id="controllable-states-demo"
          value={value}
          options={foodApiList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <MainInput {...params} label="Food" placeholder="Please select food" />
          )}
          getOptionLabel={(option) => option.name || ''}
          onChange={(event, newValue) => {
            onChangeFood(event, newValue);
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
                onClick={() => {
                  navigate('/tracking/addFood', { replace: false });
                }}
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
          <MainInput id="outlined-basic" label="g" variant="outlined" onChange={onChangeGram} />
        </div>
        <div>
          {console.log(foodSelected)}
          {/* {console.log(foodSelected[idx]?.kcal_per_100g)}
          {idx}
          <br />
          밸류 {value}
          <br />
          인풋밸류 {inputValue}
          <br />
          {foodSelected[idx]?.kcal_per_100g} 칼로리
          <br />
          {gram[idx]} 그램
          <br />총 {(Number(gram[idx]) / 100) * foodSelected[idx]?.kcal_per_100g}
          <br /> */}
          {kcalPerGram[idx]} Kcal/g
        </div>
      </div>
    </>
  );
}

export default MainFoodForm;
