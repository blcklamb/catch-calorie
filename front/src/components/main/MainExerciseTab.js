import React, { useState, useMemo, useCallback } from 'react';

import MainButton from './style/MainButton';

import MainExerciseForm from './MainExerciseForm';

import * as Api from '../../api';

function MainExerciseTab({
  exerciseSelected,
  setExerciseSelected,
  kcalPerHour,
  setKcalPerHour,
  clearForm,
}) {
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

    clearForm();
  };

  return (
    <div>
      {console.log(exerciseSelected)}
      {exerciseForms &&
        exerciseForms.map((item) => (
          <MainExerciseForm
            key={item}
            idx={item}
            exerciseSelected={exerciseSelected}
            setExerciseSelected={setExerciseSelected}
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
