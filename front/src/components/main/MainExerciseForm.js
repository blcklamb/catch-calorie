import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainInput from './style/MainInput';

import { useRecoilState } from 'recoil';
import {
  exerciseSelectedState,
  timeState,
  hourState,
  minState,
  kcalPerHourState,
} from '../../atoms';

import * as Api from '../../api';

function MainExerciseForm({ idx }) {
  const navigate = useNavigate();

  const user = useRecoilValue(userInfoState);
  const [exerciseSelected, setExerciseSelected] = useRecoilState(exerciseSelectedState);
  const [time, setTime] = useRecoilState(timeState);
  const [hour, setHour] = useRecoilState(hourState);
  const [minute, setMinute] = useRecoilState(minState);
  const [kcalPerHour, setKcalPerHour] = useRecoilState(kcalPerHourState);

  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState(''); // 텍스트 상자에 표시되는 값

  const [exerciseList, setExerciseList] = useState('');

  useEffect(() => {
    Api.get(`exercises`).then((res) => setExerciseList(res.data));

    // + 클릭 시 추가된 폼의 인풋을 0으로 초기화
    // setExerciseSelected([...exerciseSelected.slice(0, idx), 0, ...exerciseSelected.slice(idx + 1)]);
    // setHour([...hour.slice(0, idx), 0, ...hour.slice(idx + 1)]);
    // setMinute([...minute.slice(0, idx), 0, ...minute.slice(idx + 1)]);
  }, []);

  const onChangeExercise = (e, value) => {
    setExerciseSelected([
      ...exerciseSelected.slice(0, idx),
      value,
      ...exerciseSelected.slice(idx + 1),
    ]);
  };

  const onChangeHour = (e) => {
    setHour([...hour.slice(0, idx), e.target.value, ...hour.slice(idx + 1)]);
  };

  const onChangeMinute = (e) => {
    setMinute([...minute.slice(0, idx), e.target.value, ...minute.slice(idx + 1)]);
  };

  useEffect(() => {
    if (hour[idx] === 0) {
      // hour의 인풋이 빈 경우
      setTime([
        ...time.slice(0, idx),
        Number(hour[idx]) * 60 + Number(minute[idx]),
        ...time.slice(idx + 1),
      ]);
    } else if (minute[idx] === 0) {
      // minute의 인풋이 빈 경우
      setTime([
        ...time.slice(0, idx),
        Number(hour[idx]) * 60 + Number(minute[idx]),
        ...time.slice(idx + 1),
      ]);
    } else {
      setTime([
        ...time.slice(0, idx),
        Number(hour[idx]) * 60 + Number(minute[idx]),
        ...time.slice(idx + 1),
      ]);
    }
  }, [hour[idx], minute[idx]]);

  useEffect(() => {
    if (Number(time[idx]) === 0 || !exerciseSelected[idx]?.kcal_per_kg) {
      setKcalPerHour([...kcalPerHour.slice(0, idx), 0, ...kcalPerHour.slice(idx + 1)]);
    } else {
      setKcalPerHour([
        ...kcalPerHour.slice(0, idx),
        (Number(time[idx]) / 60) * exerciseSelected[idx]?.kcal_per_kg * user.weight,
        ...kcalPerHour.slice(idx + 1),
      ]);
    }

    if (exerciseSelected[idx] === null) {
      setExerciseSelected([
        ...exerciseSelected.slice(0, idx),
        0,
        ...exerciseSelected.slice(idx + 1),
      ]);
    }
  }, [time[idx], exerciseSelected[idx]]);

  return (
    <div style={{ display: 'flex' }}>
      <Autocomplete
        id="controllable"
        value={exerciseSelected[idx]}
        onChange={(event, newValue) => {
          onChangeExercise(event, newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={exerciseList}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <MainInput {...params} label="Exercise(kcal)" placeholder="Please select food" />
        )}
        getOptionLabel={(option) => option.name || ''}
        noOptionsText={
          <div>
            <p>No options</p>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => {
                navigate('/tracking/addExercise', { replace: false });
              }}
            >
              Add exercise
            </Button>
          </div>
        }
      />
      {!exerciseSelected[idx] && <span>Please select a food</span>}
      <div
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        style={{ display: 'inline-flex' }}
      >
        <MainInput
          id="outlined-basic"
          label="hour"
          variant="outlined"
          value={hour[idx]}
          onChange={onChangeHour}
          helperText={
            !hour[idx] && !minute[idx] ? (
              <span>Please enter a time</span>
            ) : (
              (isNaN(hour[idx]) || isNaN(minute[idx])) && <span>Please enter a number only</span>
            )
          }
        />
        <MainInput
          id="outlined-basic"
          label="minute"
          variant="outlined"
          value={minute[idx]}
          onChange={onChangeMinute}
        />
      </div>
      <div>
        {/* 인풋밸류 {inputValue}
        <br />
        시간 당 {exerciseSelected[idx]?.kcal_per_kg}
        <br />
        {hour[idx]} 시간
        <br /> */}
        {/* {minute[idx]} 분
        <br />총 {time[idx]} 분
        <br /> */}
        {kcalPerHour[idx]} kcal/hour
      </div>
    </div>
  );
}

export default MainExerciseForm;
