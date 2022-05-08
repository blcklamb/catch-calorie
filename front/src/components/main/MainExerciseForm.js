import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import { AutoCompleteCustom, AddButton } from '../styledCompo/MainMuiCustom';

import {
  TrackingForm,
  TrackingAutoContainer,
  TrackingTextFieldContainer,
  TrackingSwitchContainer,
  TrackingText,
} from '../styledCompo/mainStyle';

import { ValidationTextField } from '../styledCompo/muiCustom';
import { RedSpan } from '../styledCompo/LoginStyle';

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
        ((Number(time[idx]) / 60) * exerciseSelected[idx]?.kcal_per_kg * user.weight).toFixed(2),
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
    <>
      <TrackingForm>
        <TrackingAutoContainer>
          <AutoCompleteCustom
            id="controllable"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              onChangeExercise(event, newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={exerciseList}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <ValidationTextField
                {...params}
                label="Exercise"
                placeholder="Please select food"
                helperText={!exerciseSelected[idx] && <RedSpan>Please select a exercise</RedSpan>}
              />
            )}
            getOptionLabel={(option) => option.name || ''}
            noOptionsText={
              <div>
                <p>No options</p>
                <AddButton
                  variant="contained"
                  type="button"
                  onClick={() => {
                    navigate('/tracking/addExercise', { replace: false });
                  }}
                >
                  Add exercise
                </AddButton>
              </div>
            }
          />
        </TrackingAutoContainer>
        <TrackingTextFieldContainer>
          <ValidationTextField
            id="outlined-basic"
            label="Hour"
            variant="outlined"
            value={hour[idx]}
            onChange={onChangeHour}
            helperText={
              !hour[idx] && !minute[idx] ? (
                <RedSpan>Please enter a time</RedSpan>
              ) : (
                (isNaN(hour[idx]) || isNaN(minute[idx])) && (
                  <RedSpan>Please enter a number only</RedSpan>
                )
              )
            }
          />
        </TrackingTextFieldContainer>
        <TrackingTextFieldContainer>
          <ValidationTextField
            id="outlined-basic"
            label="Minute"
            variant="outlined"
            value={minute[idx]}
            onChange={onChangeMinute}
          />
        </TrackingTextFieldContainer>
        <TrackingSwitchContainer style={{ paddingTop: '15px' }}>
          <TrackingText style={{ float: 'right' }}>{kcalPerHour[idx]} kcal/min</TrackingText>
        </TrackingSwitchContainer>
      </TrackingForm>
    </>
  );
}

export default MainExerciseForm;
