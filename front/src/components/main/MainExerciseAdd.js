import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import MainInput from './style/MainInput';
import MainButton from './style/MainButton';

import Header from '../Header';
import Footer from '../Footer';

import * as Api from '../../api';

function MainExerciseAdd({}) {
  const [value, setValue] = React.useState([]);
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState([]);

  const [name, setName] = useState();
  const [weight, setWeight] = useState();
  const [unit, setUnit] = useState('kilogram');

  const [exerciseList, setExerciseList] = useState('');


  const handleSubmit = async() => {
    try {
      await Api.post(`exercises`, {
        name: name,
        weight: weight,
        unit: unit,
      });
      alert('Exercise has been added')
    } catch (err) {
      alert('Exercise that already exists')
    }
  };

  return (
    <>
      <Header />
      <div style={{ margin: '100px 80px' }}>
        <h1>Add Exercise</h1>
        <div style={{ display: 'flex' }}>
          {/* <div>
            <h2>Search</h2>
            <Autocomplete
              id="controllable-states-demo"
              value={value}
              options={exerciseList}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <MainInput {...params} label="Food" placeholder="Please select food" />
              )}
              getOptionLabel={(option) => option.name || ''}
              inputValue={inputValue}
              noOptionsText={<p>No option</p>}
            />
          </div> */}
          <div>
            <h2>Please enter a name</h2>
            <TextField
              id="outlined-basic"
              label="exercise name"
              variant="outlined"
              inputValue={name}
              onBlur={(e) => setName(e.target.value)}
            />
            <h2>Please enter a weight</h2>
            <TextField
              id="outlined-basic"
              label="weight"
              variant="outlined"
              inputValue={weight}
              onBlur={(e) => setWeight(e.target.value)}
            />
            <h2>Please select a unit</h2>

            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">unit</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <FormControlLabel value="kilogram" control={<Radio />} label="kilogram" />
                <FormControlLabel value="pound" control={<Radio />} label="pound" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {/* {category}
      {name}
      {kcalPer100g} */}
        {/* {unit} */}
        <MainButton variant="contained" onClick={handleSubmit}>
          Add
        </MainButton>
      </div>
    </>
  );
}

export default MainExerciseAdd;
