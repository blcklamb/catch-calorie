import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';

import MainTabs from './MainTabs';
import MainGraph from './MainGraph';
import MainButton from './style/MainButton';

const Main = () => {
  const [foodSelected, setFoodSelected] = useState([]);
  const [totalFood, setTotalFood] = useState(0);
  const [exerciseSelected, setExerciseSelected] = useState([]);
  const [totalExercise, setTotalExercise] = useState(0);

  const Container = styled.div`
    margin: 70px 80px;
  `;

  const MainHello = styled.div`
    font-size: 35px;
    font-weight: bold;
  `;

  //   const MainTabs = styled.div`

  //   `

  const MainContents = styled.div`
    display: inline-flex;
    margin: 80px 0px;
  `;

  //   const styledMainTabs = styled(MainTabs)`
  //     display: inline-flex;
  //     margin: 80px 0px;
  //   `;

  const user = 'Elice';

  return (
    <div style={{ margin: '70px 80px' }}>
      <MainHello>Hello {user}!</MainHello>

      <div style={{ display: 'inline-flex', margin: '80px 0px' }}>
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
        <MainButton variant="contained" style={{ marginBottom: '20px', width: '60%' }}>
          Modifying and deleting
        </MainButton>
        <br />
        <MainButton variant="contained" style={{ width: '60%' }}>
          View Details
        </MainButton>
      </div>
    </div>
  );
};

export default Main;
