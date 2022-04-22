import React, { useState, useMemo, useCallback } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Autocomplete from '@mui/material/Autocomplete';

const exerciseList = [
  {
    value: 'hamburger',
    label: '걷기',
    kcal: 200,
  },
  {
    value: 'cake',
    label: '달리기',
    kcal: 300,
  },
  {
    value: 'ham',
    label: '달리면서 걷기',
    kcal: 560,
  },
  {
    value: 'startham',
    label: '축구',
    kcal: 400,
  },
  {
    value: 'chicken',
    label: '야구',
    kcal: 800,
  },
];

// const options = ['Option 1', 'Option 2'];
function MainExerciseTab({
  exerciseSelected,
  setExerciseSelected,
  totalExercise,
  setTotalExercise,
}) {
  const [value, setValue] = React.useState();

  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState('');

  const handleOnClick = () => {
    setTotalExercise(exerciseSelected.reduce((acc, cur) => acc + cur.kcal, totalExercise));
    console.log(exerciseSelected);
    setExerciseSelected([]);
  };

  return (
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
			<div>{`inputValue: '${inputValue}'`}</div>
			<br /> */}
      <Autocomplete
        id="controllable"
        value={value}
        options={exerciseList}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="운동" placeholder="운동을 선택하세요" />
        )}
        getOptionLabel={(option) => [option.label, `(${option.kcal})`]}
        onChange={(event, newValue) => {
          setExerciseSelected([newValue]);
		  console.log(exerciseSelected?.label)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        noOptionsText={
          <div>
            <p>존재하지 않는 운동입니다</p>
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
      <Button variant="contained" onClick={handleOnClick}>
        확인
      </Button>
    </div>
  );
}

export default MainExerciseTab;
