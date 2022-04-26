import React, { useState, useMemo, useCallback } from 'react';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainInput from './style/MainInput';
import MainButton from './style/MainButton';

const exerciseList = [
  {
    value: 'walking',
    label: 'walking',
    kcal: 200,
  },
  {
    value: 'running',
    label: 'running',
    kcal: 300,
  },
  {
    value: 'walking-and-running',
    label: 'walking and running',
    kcal: 560,
  },
  {
    value: 'soccer',
    label: 'soccer',
    kcal: 400,
  },
  {
    value: 'baseball',
    label: 'baseball',
    kcal: 800,
  },
];

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
    // console.log(exerciseSelected);
    setExerciseSelected([]);
  };

  return (
    <div>
      <Autocomplete
        id="controllable"
        value={value}
        options={exerciseList}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <MainInput {...params} label="Exercise(kcal)" placeholder="Please select food" />
        )}
        getOptionLabel={(option) => [option.label, `(${option.kcal})`]}
        onChange={(event, newValue) => {
          setExerciseSelected([newValue]);
          // console.log(exerciseSelected?.label);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        noOptionsText={
          <div>
            <p>No options</p>
            <Button
              variant="contained"
              color="primary"
              type="button"
              // startIcon={< AddIc fontSize="small" />}
              // onClick={() => alert('기능 추후 보강')}
            >
              Add exercise
            </Button>
          </div>
        }
      />
      <MainButton variant="contained" onClick={handleOnClick}>
        check
      </MainButton>
    </div>
  );
}

export default MainExerciseTab;
