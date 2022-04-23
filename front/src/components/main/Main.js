import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@mui/material/Button';

import MainTabs from './MainTabs';
import MainGraph from './MainGraph';
import MainButton from './style/MainButton';
import { DispatchContext } from '../../App';

const Main = () => {
  const [foodSelected, setFoodSelected] = useState([]);
  const [totalFood, setTotalFood] = useState(0);
  const [exerciseSelected, setExerciseSelected] = useState([]);
  const [totalExercise, setTotalExercise] = useState(0);

  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem('userToken');
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: 'LOGOUT' });
    // 기본 페이지로 돌아감.
    navigate('/login');
  };

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
        <MainButton variant="contained" style={{ marginBottom: '20px', width: '60%' }}>
          View Details
        </MainButton>
        <br />
        <MainButton variant="contained" style={{ width: '60%' }} onClick={logout}>
          Log-out
        </MainButton>
      </div>
    </div>
  );
};

export default Main;
