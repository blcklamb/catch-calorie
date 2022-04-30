import React, { useState, useMemo, useCallback } from 'react';

import MainButton from './style/MainButton';

import MainExerciseForm from './MainExerciseForm';

import { useRecoilState } from 'recoil';
import { exerciseSelectedState, timeState, trackingUpdateState } from '../../atoms';

import * as Api from '../../api';

function MainExerciseTab({ clearForm }) {
  const [exerciseForms, setExerciseForms] = useState([0]);

  const [exerciseSelected, setExerciseSelected] = useRecoilState(exerciseSelectedState);
  const [time, setTime] = useRecoilState(timeState);
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const [hour, setHour] = useState([]);
  const [minute, setMinute] = useState([]);

  const handleAddExerciseForm = () => {
    let countArr = [...exerciseForms];
    let counter = countArr.slice(-1)[0];

    counter += 1;
    countArr.push(counter);

    setExerciseForms(countArr);
  };

  const handleTracking = () => {
    exerciseSelected.map((exercise, i) => {
      const t = Number(time[i]);

      try {
        Api.post(`tracking/exer`, {
          name: exercise.name,
          minute: t,
        });
      } catch (err) {
        console.log('전송 실패', err);
      }

      Api.post(`exercises/${exercise._id}`);
    });

    setExerciseSelected(exerciseSelected.map((f, i) => 0));
    setTrackingUpdate(!trackingUpdate);

    clearForm();
  };

  return (
    <div>
      {exerciseForms &&
        exerciseForms.map((item) => (
          <MainExerciseForm
            key={item}
            idx={item}
            hour={hour}
            setHour={setHour}
            minute={minute}
            setMinute={setMinute}
          />
        ))}
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
