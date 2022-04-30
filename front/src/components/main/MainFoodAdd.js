import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import MainInput from './style/MainInput';
import MainButton from './style/MainButton';

import Header from '../Header';
import Footer from '../Footer';

import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import * as Api from '../../api';

function MainFoodAdd({}) {
  const [value, setValue] = React.useState([]);
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState([]);

  const navigate = useNavigate();

  const [exerciseList, setExerciseList] = useState('');
  const user = useRecoilValue(userInfoState);

  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [kcalPer100g, setKcalPer100g] = useState();

  const [foodApiList, setFoodApiList] = useState('');

  useEffect(() => {
    Api.get(`foods`).then((res) => setFoodApiList(res.data));
  }, []);

  const handleSubmit = async () => {
    try {
      await Api.post(`foods`, {
        category: category,
        name: name,
        kcal_per_100g: kcalPer100g,
      });
      alert('Food has been added');
      navigate(`/tracking/${user._id}`, { replace: false });
    } catch (err) {
      alert('Food that already exists');
    }
  };

  return (
    <>
      <Header />
      <div style={{ margin: '100px 80px' }}>
        <h1>Add Food</h1>
        <div style={{ display: 'flex' }}>
          {/* <div>
            <h2>Search</h2>
            <Autocomplete
              id="controllable-states-demo"
              // value={foodSelected[0]?.label}
              value={value}
              options={foodApiList}
              sx={{ width: 600 }}
              renderInput={(params) => (
                <MainInput {...params} label="Food" placeholder="Please select food" />
              )}
              getOptionLabel={(option) => option.name || ''}
              inputValue={inputValue}
              noOptionsText={<p>No option</p>}
            />
          </div> */}
          <div>
            <h2>Please enter a category</h2>
            <TextField
              id="outlined-basic"
              label="category"
              variant="outlined"
              inputValue={category}
              onBlur={(e) => setCategory(e.target.value)}
            />
            <h2>Please enter a name</h2>
            <TextField
              id="outlined-basic"
              label="food name"
              variant="outlined"
              inputValue={name}
              onBlur={(e) => setName(e.target.value)}
            />
            <h2>Please enter a kcal per 100g</h2>
            <TextField
              id="outlined-basic"
              label="kcal/100g"
              variant="outlined"
              inputValue={kcalPer100g}
              onBlur={(e) => setKcalPer100g(e.target.value)}
            />
          </div>
        </div>

        {/* {category}
      {name}
      {kcalPer100g} */}
        <MainButton variant="contained" onClick={handleSubmit}>
          Add
        </MainButton>
      </div>
    </>
  );
}

export default MainFoodAdd;
