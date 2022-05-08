import React from 'react';

import MainExerciseForm from './MainExerciseForm';

import {
  TrackingForms,
  TrackingButtonContainer,
  TrackingLeftButtonContainer,
  TrackingRightButtonContainer,
} from '../styledCompo/mainStyle';

import {
  TrackingPlusButton,
  TrackingResetButton,
  TrackingTrackingButton,
} from '../styledCompo/MainMuiCustom';

import { useRecoilState } from 'recoil';
import {
  exerciseSelectedState,
  timeState,
  hourState,
  minState,
  trackingUpdateState,
  exerciseFormsState,
} from '../../atoms';

import * as Api from '../../api';

function MainExerciseTab({ clearForm }) {
  const [exerciseForms, setExerciseForms] = useRecoilState(exerciseFormsState);

  const [exerciseSelected, setExerciseSelected] = useRecoilState(exerciseSelectedState);
  const [time, setTime] = useRecoilState(timeState);
  const [hour, setHour] = useRecoilState(hourState);
  const [minute, setMinute] = useRecoilState(minState);
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const handleAddExerciseForm = () => {
    let countArr = [...exerciseForms];
    let counter = countArr.slice(-1)[0];

    counter += 1;
    countArr.push(counter);

    setExerciseForms(countArr);

    // + 클릭 시 추가된 폼의 각 인풋 default를 빈칸으로
    setExerciseSelected([...exerciseSelected, 0]);
    setHour([...hour, '']);
    setMinute([...minute, '']);
    setTime([...time, '']);

    setTimeout(() => {
      const boxid = document.querySelector('#tracking-exercise-forms');
      boxid.scrollTop = boxid.scrollHeight;
    }, 1);
  };

  const handleTracking = () => {
    exerciseSelected.map(async (exercise, i) => {
      const numHour = hour.map((hour) => {
        return Number(hour);
      });

      const numMin = minute.map((minute) => {
        return Number(minute);
      });

      try {
        if (
          !exerciseSelected.includes(0) &&
          (!hour.includes('') || !minute.includes('')) &&
          !numHour.includes(NaN) &&
          !numMin.includes(NaN)
        ) {
          await Api.post(`tracking/exer`, {
            name: exercise.name,
            minute: Number(time[i]),
          });

          await Api.post(`exercises/${exercise._id}`);

          // 폼 및 그래프 레이블 초기화 위함
          setExerciseForms([0]);
          setExerciseSelected([0]);
          setHour(['']);
          setMinute(['']);

          setTrackingUpdate(!trackingUpdate);
          clearForm();
        }
      } catch (err) {
        console.log('전송 실패', err);
      }
    });
  };

  const handleResetForm = () => {
    setExerciseForms([0]);
    setExerciseSelected([0]);
    setHour(['']);
    setMinute(['']);

    setTrackingUpdate(!trackingUpdate);
  };

  return (
    <div>
      <TrackingForms id="tracking-exercise-forms">
        {exerciseForms && exerciseForms.map((item) => <MainExerciseForm key={item} idx={item} />)}
      </TrackingForms>
      <TrackingButtonContainer>
        <TrackingLeftButtonContainer>
          <TrackingResetButton variant="contained" onClick={handleResetForm}>
            Reset
          </TrackingResetButton>
        </TrackingLeftButtonContainer>
        <TrackingRightButtonContainer>
          <TrackingPlusButton variant="contained" onClick={handleAddExerciseForm}>
            +
          </TrackingPlusButton>
          <TrackingTrackingButton variant="contained" onClick={handleTracking}>
            Submit
          </TrackingTrackingButton>
        </TrackingRightButtonContainer>
      </TrackingButtonContainer>
    </div>
  );
}

export default MainExerciseTab;
