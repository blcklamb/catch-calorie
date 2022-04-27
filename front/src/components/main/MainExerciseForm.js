import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainInput from './style/MainInput';
import MainButton from './style/MainButton';

import * as Api from '../../api';

function MainExerciseForm({
  idx,
  exerciseSelected,
  setExerciseSelected,
  totalExercise,
  setTotalExercise,
  time,
  setTime,
  hour,
  setHour,
  minute,
  setMinute,
  kcalPerHour,
  setKcalPerHour,
}) {
  const [value, setValue] = React.useState();
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState('');

  const [exerciseList, setExerciseList] = useState('');

  // const [time, setTime] = useState([]);
  // const [hour, setHour] = useState([]);
  // const [minute, setMinute] = useState([]);

  useEffect(() => {
    Api.get(`exercises`).then((res) => setExerciseList(res.data));
  }, []);

  const onChangeHour = (e) => {
    // console.log(idx, e.target.value);
    setHour([...hour.slice(0, idx), e.target.value, ...hour.slice(idx + 1)]);
  };
  const onChangeMinute = (e) => {
    // console.log(idx, e.target.value);
    setMinute([...minute.slice(0, idx), e.target.value, ...minute.slice(idx + 1)]);
  };

  useEffect(() => {
    console.log(exerciseSelected);
    setTime([
      ...time.slice(0, idx),
      Number(hour[idx]) * 60 + Number(minute[idx]),
      ...time.slice(idx + 1),
    ]);
  }, [hour, minute]);

  // useEffect(() => {
  //   setKcalPerHour([
  //     ...kcalPerHour.slice(0, idx),
  //     (Number(time[idx]) / 60) * exerciseSelected[idx]?.kcal_per_kg,
  //     ...kcalPerHour.slice(idx + 1),
  //   ]);
  // }, time);

  // useEffect(() => {
  //   if (gram && gram.length) {
  //     // 빈 gram이 없다면 kcalPerGram 계산하여 배열 삽입
  //     setKcalPerGram([
  //       ...kcalPerGram.slice(0, idx),
  //       (Number(gram[idx]) / 100) * foodSelected[idx]?.kcal_per100g,
  //       ...kcalPerGram.slice(idx + 1),
  //     ]);
  //   } else {
  //     // 빈 gram이 있다면 해당 kcalPerGram에 0 삽입
  //     setKcalPerGram([
  //       ...kcalPerGram.slice(0, idx),
  //       0,
  //       ...kcalPerGram.slice(idx + 1),
  //     ]);
  //   }
  // }, [gram]);

  return (
    <div style={{ display: 'flex' }}>
      <Autocomplete
        id="controllable"
        value={value}
        options={exerciseList}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <MainInput {...params} label="Exercise(kcal)" placeholder="Please select food" />
        )}
        getOptionLabel={(option) => option.name || ''}
        onChange={(event, newValue) => {
          // setExerciseSelected([newValue]);
          setExerciseSelected([...exerciseSelected, newValue]);
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
      <div
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        style={{ display: 'inline-flex' }}
      >
        <MainInput id="outlined-basic" label="hour" variant="outlined" onBlur={onChangeHour} />
        <MainInput id="outlined-basic" label="minute" variant="outlined" onBlur={onChangeMinute} />
      </div>
      {console.log(hour)}
      {console.log(minute)}
      {console.log(time)}
      {console.log(kcalPerHour)}
      <div>
        인풋밸류 {inputValue}
        <br />
        {hour[idx]} 시간
        <br />
        {minute[idx]} 분
        <br />총 {time[idx]} 분
      </div>
    </div>
  );
}

export default MainExerciseForm;
