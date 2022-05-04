import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainInput from './style/MainInput';

import { useRecoilState } from 'recoil';
import { foodListState, foodSelectedState, gramState, kcalPerGramState } from '../../atoms';

import * as Api from '../../api';

function MainFoodForm({ idx }) {
  const navigate = useNavigate();

  const [foodSelected, setFoodSelected] = useRecoilState(foodSelectedState);
  const [gram, setGram] = useRecoilState(gramState);
  const [kcalPerGram, setKcalPerGram] = useRecoilState(kcalPerGramState);
  const [foodList, setFoodList] = useRecoilState(foodListState);

  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState([]); // 텍스트 상자에 표시되는 값

  useEffect(() => {
    Api.get(`foods`).then((res) => setFoodList(res.data));

    // + 클릭 시 추가된 폼의 인풋을 0으로 초기화
    // setFoodSelected([...foodSelected.slice(0, idx), 0, ...foodSelected.slice(idx + 1)]);
    // setGram([...gram.slice(0, idx), 0, ...gram.slice(idx + 1)]);
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
    } else {
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
          value={foodSelected[idx]}
          onChange={(event, newValue) => {
            onChangeFood(event, newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={foodList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <MainInput {...params} label="Food" placeholder="Please select food" />
          )}
          getOptionLabel={(option) => option.name || ''}
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
          <MainInput
            id="outlined-basic"
            label="g"
            variant="outlined"
            value={gram[idx]}
            onChange={onChangeGram}
            // defaultValue={'안'}
          />
        </div>
        <div>
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
          {foodSelected[idx]?.name} <br />
          {gram[idx]} <br />
          {kcalPerGram[idx]} Kcal/g
        </div>
      </div>
    </>
  );
}

export default MainFoodForm;
