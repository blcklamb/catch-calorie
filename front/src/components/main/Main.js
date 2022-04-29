import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';

import MainTabs from './MainTabs';
import MainGraph from './MainGraph';
import TrackingLists from '../trackingList/TrackingLists';

import MainButton from './style/MainButton';
// import { DispatchContext } from '../../App';

import * as Api from '../../api';
import { useRecoilState } from 'recoil';
import { tokenState, userInfoState, userState } from '../../atoms';
import BasicModal from '../user/UserDelForm';

const Main = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [recoilUser, setRecoilUser] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [foodSelected, setFoodSelected] = useState([]);
  const [totalFood, setTotalFood] = useState(0);
  const [exerciseSelected, setExerciseSelected] = useState([]);
  const [totalExercise, setTotalExercise] = useState(0);
  const [kcalPerGram, setKcalPerGram] = useState([]);
  const [kcalPerHour, setKcalPerHour] = useState([]);

  const [user, setUser] = useState('');

  const [test, setTest] = useState('');
  const [testUser, setTestUser] = useState('');

  const navigate = useNavigate();
  // const params = useParams();
  // const dispatch = useContext(DispatchContext);
  // // const dispatch = useContext(DispatchContext);

  // useEffect(() => {
  //   Api.get(`user/login`).then((res) => setTest(res.data));
  //   Api.get(`user/current`).then((res) => setUser(res.data));
  //   Api.get(`userlist`).then((res) => setTestUser(res.data));
  // }, []);

  // useEffect(() => {
  //   // console.log(params)
  //   Api.get(`users/${params.userId}`).then((res) => {
  //     setUser(res.data)
  //   })
  // }, [params])

  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem('userToken');
    // dispatch 함수를 이용해 로그아웃함.
    // dispatch({ type: 'LOGOUT' });
    setRecoilUser(null);
    setUserInfo(null);
    setToken(null);

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
        {/* <MainHello>Hello {user?.name}!</MainHello> */}
        <MainHello>Hello {userInfo.name}!</MainHello>

        {/* <div style={{ margin: '80px 0px' }}> */}
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
            kcalPerGram={kcalPerGram}
            setKcalPerGram={setKcalPerGram}
            kcalPerHour={kcalPerHour}
            setKcalPerHour={setKcalPerHour}
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
            kcalPerGram={kcalPerGram}
            setKcalPerGram={setKcalPerGram}
            kcalPerHour={kcalPerHour}
            setKcalPerHour={setKcalPerHour}
          />
        </div>
        <div>
          <TrackingLists user={user} />
          <MainButton
            variant="contained"
            style={{ marginBottom: '20px', width: '60%' }}
            onClick={() => navigate('/network')}
          >
            network
          </MainButton>
          <br />
          <MainButton
            variant="contained"
            style={{ marginBottom: '20px', width: '60%' }}
            onClick={() => navigate('/users')}
          >
            edit
          </MainButton>
          <br />
          <MainButton
            variant="contained"
            style={{ marginBottom: '20px', width: '60%' }}
            onClick={() => navigate('/mypage')}
          >
            My page
          </MainButton>
          <br />
          <MainButton
            variant="contained"
            style={{ marginBottom: '20px', width: '60%' }}
            onClick={logout}
          >
            Log-out
          </MainButton>
          <BasicModal></BasicModal> 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
