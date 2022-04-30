import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';

import MainTabs from './MainTabs';
import MainGraph from './MainGraph';
import TrackingLists from '../trackingList/TrackingLists';
import UserDelForm from '../user/UserDelForm';

import MainButton from './style/MainButton';

import { useRecoilState } from 'recoil';
import { tokenState, userInfoState, userState } from '../../atoms';

const Main = () => {
  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(tokenState);
  const [recoilUser, setRecoilUser] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

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
        <MainHello>Hello {userInfo.name}!</MainHello>

        {/* <div style={{ margin: '80px 0px' }}> */}
        <div style={{ display: 'inline-flex', margin: '80px 0px' }}>
          <MainTabs />
          <MainGraph />
        </div>
        <div>
          <TrackingLists />
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
          <UserDelForm></UserDelForm>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
