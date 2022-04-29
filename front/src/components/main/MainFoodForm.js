import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainInput from './style/MainInput';

import MainAdd from './MainFoodAdd';

import * as Api from '../../api';

import TextField from '@mui/material/TextField';

function MainFoodForm({
  idx,
  // value,
  // setValue,
  // inputValue,
  // setInputValue,
  foodSelected,
  setFoodSelected,
  gram,
  setGram,
  kcalPerGram,
  setKcalPerGram,
}) {
  const navigate = useNavigate();

  const [value, setValue] = React.useState();
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState([]);

  const [foodApiList, setFoodApiList] = useState('');
  // const [gram, setGram] = useState([]);

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // 인덱스 수 대로 배열 속 생성
    // setGram(gram.map(() => ))

    Api.get(`foods`).then((res) => setFoodApiList(res.data));

    setGram([...gram.slice(0, idx), 0, ...gram.slice(idx + 1)]);
  }, []);

  const onChange = (e) => {
    setGram([...gram.slice(0, idx), e.target.value, ...gram.slice(idx + 1)]);
  };

  useEffect(() => {
    if (Number(gram[idx]) === 0) {
      console.log(gram);
      console.log(idx, gram[idx]);
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

    // setKcalPerGram([
    //   ...kcalPerGram.slice(0, idx),
    //   (Number(gram[idx]) / 100) * foodSelected[idx]?.kcal_per100g,
    //   ...kcalPerGram.slice(idx + 1),
    // ]);
    // if (gram && gram.length) {
    //   // 빈 gram이 없다면 kcalPerGram 계산하여 배열 삽입
    //   setKcalPerGram([
    //     ...kcalPerGram.slice(0, idx),
    //     (Number(gram[idx]) / 100) * foodSelected[idx]?.kcal_per100g,
    //     ...kcalPerGram.slice(idx + 1),
    //   ]);
    // } else {
    //   // 빈 gram이 있다면 해당 kcalPerGram에 0 삽입
    //   setKcalPerGram([...kcalPerGram.slice(0, idx), 0, ...kcalPerGram.slice(idx + 1)]);
    // }
  }, [idx, gram]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}

        <Autocomplete
          id="controllable-states-demo"
          // value={foodSelected[0]?.label}
          value={value}
          options={foodApiList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <MainInput {...params} label="Food" placeholder="Please select food" />
          )}
          getOptionLabel={(option) => option.name || ''}
          onChange={(event, newValue) => {
            // setFoodSelected([...foodSelected, newValue]);
            setFoodSelected([
              ...foodSelected.slice(0, idx),
              newValue,
              ...foodSelected.slice(idx + 1),
            ]);
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
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                // onFocus={() => alert('dsf')}
                // onBlur={alert('dsf')}
              />
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
          {/* {console.log(gram)} */}
          {/* {console.log(foodSelected[idx])} */}
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
          <br />총 {kcalPerGram[idx]}
        </div>
      </div>
    </>
  );
}

export default MainFoodForm;
