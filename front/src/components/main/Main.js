import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as Api from '../../api';

import Header from '../Header';
import Footer from '../Footer';

import MainTabs from './MainTabs';
import MainGraph from './MainGraph';
import TrackingLists from '../trackingList/TrackingLists';
import UserDelForm from '../user/UserDelForm';

import MainButton from './style/MainButton';

import {
  BodyContainer,
  MainHelloSection,
  MainHelloBadge,
  MainHello,
  MainHelloTitle,
  MainSection1,
} from '../styledCompo/mainStyle';

import { useRecoilState } from 'recoil';
import { tokenState, userInfoState, userState, BadgesState } from '../../atoms';

const Main = () => {
  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(tokenState);
  const [recoilUser, setRecoilUser] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [badges, setBadges] = useRecoilState(BadgesState);

  useEffect(() => {
    Api.get(`badges`).then((res) => setBadges(res.data));
  }, []);

  return (
    <>
      <Header />
      <BodyContainer>
        <MainHelloSection>
          <MainHelloBadge onClick={() => navigate('/mypage', { replace: false })}>
            <img src={userInfo?.icon} alt="badge" style={{ width: 80 }}></img>
          </MainHelloBadge>
          <MainHello>
            <MainHelloTitle>Hello, {userInfo.name}</MainHelloTitle>
          </MainHello>
        </MainHelloSection>
        <MainSection1>
          <MainTabs />
          <MainGraph />
        </MainSection1>
        <div>
          <TrackingLists />
        </div>
      </BodyContainer>
    </>
  );
};

export default Main;
