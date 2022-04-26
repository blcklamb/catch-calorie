import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';

import MainTabs from './MainTabs';
import MainGraph from './MainGraph';
import MainButton from './style/MainButton';
import { DispatchContext } from '../../App';

import * as Api from '../../api';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../../atoms';

const Main = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [recoilUser, setRecoilUser] = useRecoilState(userState);

  const [foodSelected, setFoodSelected] = useState([]);
  const [totalFood, setTotalFood] = useState(0);
  const [exerciseSelected, setExerciseSelected] = useState([]);
  const [totalExercise, setTotalExercise] = useState(0);

  const [user, setUser] = useState('');

  const [test, setTest] = useState('');
  const [testUser, setTestUser] = useState('');

  const navigate = useNavigate();
  // const dispatch = useContext(DispatchContext);

  useEffect(() => {
    Api.get(`user/login`).then((res) => setTest(res.data));
    Api.get(`user/current`).then((res) => setUser(res.data));
    Api.get(`userlist`).then((res) => setTestUser(res.data));
  }, []);

  console.log(test);

  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem('userToken');
    // dispatch 함수를 이용해 로그아웃함.
    // dispatch({ type: 'LOGOUT' });
    setRecoilUser(null);

    // 기본 페이지로 돌아감.
    navigate('/login');
  };

  const MainHello = styled.div`
    font-size: 35px;
    font-weight: bold;
  `;

  return (
    <>
      <Header />
      <div style={{ margin: '100px 80px' }}>
        {/* <MainHello>Hello {user.name}!</MainHello> */}

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
      <Footer />
    </>
  );
};

export default Main;
