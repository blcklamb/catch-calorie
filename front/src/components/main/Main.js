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

import { BodyContainer, MainHelloSection, MainSection1 } from '../styledCompo/mainStyle';

import { useRecoilState } from 'recoil';
import { tokenState, userInfoState, userState } from '../../atoms';

const Main = () => {
  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(tokenState);
  const [recoilUser, setRecoilUser] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const MainHello = styled.div`
  background: green;
  display: flex;
  align-items: center;  
    font-size: 35px;
    font-weight: bold;
    width: 100%;
    height: 100px;
    position: relative;
  `;

  return (
    <>
      <Header />
      <BodyContainer>
        <MainHelloSection>
          <MainHello>Hello, {userInfo.name}</MainHello>
        </MainHelloSection>

        {/* <div style={{ margin: '80px 0px' }}> */}
        <MainSection1>
          <MainTabs />
          <MainGraph />
        </MainSection1>
        <div>
          <TrackingLists />
        </div>
      </BodyContainer>
      <Footer />
    </>
  );
};

export default Main;
