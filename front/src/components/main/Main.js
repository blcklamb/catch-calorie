import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Api from '../../api';

import Header from '../Header';

import MainTabs from './MainTabs';
import MainGraph from './MainGraph';
import TrackingLists from '../trackingList/TrackingLists';

import { Grid } from '@mui/material';

import {
  BodyContainer,
  MainHelloSection,
  MainHelloBadge,
  MainHello,
  MainHelloTitle,
  MainSection1,
  Section,
} from '../styledCompo/mainStyle';

import { RegisterCircleRed1 } from '../styledCompo/RegisterStyle';

import { useRecoilState } from 'recoil';
import { userInfoState, BadgesState } from '../../atoms';

const Main = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [badges, setBadges] = useRecoilState(BadgesState);

  useEffect(() => {
    Api.get(`badges`).then((res) => setBadges(res.data));
  }, []);

  return (
    <>
      <Header />
      <RegisterCircleRed1></RegisterCircleRed1>
      <BodyContainer>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <MainHelloSection>
              <MainHelloBadge onClick={() => navigate('/mypage', { replace: false })}>
                <img src={userInfo?.icon} alt="badge" style={{ width: 80 }}></img>
              </MainHelloBadge>
              <MainHello>
                <MainHelloTitle>Hello, {userInfo.name}</MainHelloTitle>
              </MainHello>
            </MainHelloSection>
          </Grid>
          <MainSection1>
            <Grid container spacing={2}>
              <Grid item sm={12} md={12} lg={8}>
                <MainTabs />
              </Grid>
              <Grid item sm={12} md={12} lg={4}>
                <Section>
                  <MainGraph />
                </Section>
              </Grid>
            </Grid>
          </MainSection1>
          <Grid item sm={12}>
            <Section>
              <TrackingLists />
            </Section>
          </Grid>
        </Grid>
        <div></div>
      </BodyContainer>
    </>
  );
};

export default Main;
