import React, { useState, useMemo, useCallback } from 'react';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainInput from './style/MainInput';
import MainButton from './style/MainButton';

import MainExerciseForm from './MainExerciseForm';

function MainExerciseTab({
  exerciseSelected,
  setExerciseSelected,
  totalExercise,
  setTotalExercise,
  kcalPerHour,
  setKcalPerHour,
}) {
  const [value, setValue] = React.useState();
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState('');

  const [exerciseForms, setExerciseForms] = useState([0]);

  const [time, setTime] = useState([]);
  const [hour, setHour] = useState([]);
  const [minute, setMinute] = useState([]);

  const handleAddExerciseForm = () => {
    let countArr = [...exerciseForms];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setExerciseForms(countArr);
  };

  const handleTracking = () => {
    setTotalExercise(kcalPerHour.reduce((acc, cur) => acc + cur, totalExercise));
    // console.log(exerciseSelected);
    setExerciseSelected([]);
  };

  return (
    <div>
      {exerciseForms &&
        exerciseForms.map((item, i) => (
          <MainExerciseForm
            key={i}
            idx={i}
            exerciseSelected={exerciseSelected}
            setExerciseSelected={setExerciseSelected}
            totalExercise={totalExercise}
            setTotalExercise={setTotalExercise}
            time={time}
            setTime={setTime}
            hour={hour}
            setHour={setHour}
            minute={minute}
            setMinute={setMinute}
            kcalPerHour={kcalPerHour}
            setKcalPerHour={setKcalPerHour}
          />
        ))}
      {/* <Autocomplete
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
      /> */}
      <MainButton variant="contained" onClick={handleAddExerciseForm}>
        +
      </MainButton>
      <MainButton variant="contained" onClick={handleTracking}>
        tracking
      </MainButton>
    </div>
  );
}

export default MainExerciseTab;
