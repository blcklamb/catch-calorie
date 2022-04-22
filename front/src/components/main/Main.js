import React, { useState } from 'react';

import Button from '@mui/material/Button';

import MainTabs from './MainTabs';
import MainGraph from './MainGraph';

const Main = () => {
  const [foodSelected, setFoodSelected] = useState([]);
  const [totalFood, setTotalFood] = useState(0);
  const [exerciseSelected, setExerciseSelected] = useState([]);
  const [totalExercise, setTotalExercise] = useState(0);

  return (
    <div>
      <div>안녕하세요 땡땡땡님!</div>

      <div style={{ display: 'inline-flex' }}>
        <MainTabs
          foodSelected={foodSelected}
          setFoodSelected={setFoodSelected}
          totalFood={totalFood}
          setTotalFood={setTotalFood}
          exerciseSelected={exerciseSelected}
          setExerciseSelected={setExerciseSelected}
          totalExercise={totalExercise}
          setTotalExercise={setTotalExercise}
        />
        <MainGraph
          foodSelected={foodSelected}
          setFoodSelected={setFoodSelected}
          totalFood={totalFood}
          setTotalFood={setTotalFood}
          exerciseSelected={exerciseSelected}
          setExerciseSelected={setExerciseSelected}
          totalExercise={totalExercise}
          setTotalExercise={setTotalExercise}
        />
      </div>
      <div>
        <Button variant="contained">수정 및 삭제</Button>
        <br />
        <Button variant="contained">상세보기</Button>
      </div>
    </div>
  );
};

export default Main;
