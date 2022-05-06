import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
// import MainButton from '../main/style/MainButton.js';
import Button from '@mui/material/Button';
import Header from '../Header';
import Footer from '../Footer';

import video from '../../image/mainvideo_edit.mp4';

import DefaultLineChart from '../DefaultLineChart.js';
import { DefaultBarChart } from '../DefaultBarChart.js';
import DefaultObesityLineChart from '../DefaultObesityLineChart.js';

import Walking from '../../lottie/walking.json';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import {
  FirstPage,
  VideoContainer,
  Video,
  FirstPageWrapper,
  FirstPageLogo,
  MainButton,
  CircleRed1,
  CircleGreen1,
  SecondPage,
  SecondPageLeft,
  HeadCopy,
  BodyCopy,
  SecondPageRight,
  ThirdPage,
  ThirdPageLeft,
  ThirdPageRight,
  FourthPage,
  CircleRed2,
  CircleGreen2,
  FourthPageLeft,
  FourthPageRight,
  FifthPage,
  FifthPageCopy,
} from '../styledCompo/homeStyle';

const COLORS = ['#5bc691', '#FFBB28', '#C66868', '#FF8042'];

function Home() {
  const navigate = useNavigate();

  const user = useRecoilValue(userInfoState);

  const userId = user._id;
  console.log('id', userId);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Walking,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <Header />

      <FirstPage>
        <VideoContainer>
          <Video muted autoPlay loop>
            <source src={video} type="video/mp4" />
          </Video>
        </VideoContainer>
        <FirstPageWrapper>
          <FirstPageLogo>Catch Calories</FirstPageLogo>
          {user ? (
            <MainButton
              onClick={() => navigate('/tracking/{userId}', { replace: true })}
              variant="contained"
              style={{
                width: '20vw',
                height: '10vh',
                borderRadius: '25px',
                fontSize: '2.5rem',
              }}
            >
              START
            </MainButton>
          ) : (
            <MainButton
              onClick={() => navigate('/login', { replace: true })}
              variant="contained"
              style={{
                width: '20vw',
                height: '10vh',
                borderRadius: '25px',
                fontSize: '2.5rem',
              }}
            >
              START
            </MainButton>
          )}
        </FirstPageWrapper>
      </FirstPage>
      <CircleRed1 />
      <CircleGreen1 />
      <SecondPage>
        <SecondPageLeft>
          <HeadCopy>
            <span style={{ color: ' #e85858' }}>USA Obesity Rate </span>is on the{' '}
            <span style={{ color: '#77b63e' }}>Rise</span>
          </HeadCopy>
          <BodyCopy>
            The rising obesity rate is <br />
            not just a problem for the USA. <br />
            It's becoming a <span style={{ color: '#77b63e' }}>global issue.</span>
          </BodyCopy>
        </SecondPageLeft>
        <SecondPageRight>
          <DefaultObesityLineChart colors={COLORS}></DefaultObesityLineChart>
        </SecondPageRight>
      </SecondPage>
      <ThirdPage>
        <ThirdPageLeft>
          <DefaultBarChart
            data={[
              { name: 'Underweight', SCC: '250' },
              { name: 'Normal', SCC: '280' },
              { name: 'Overweight', SCC: '580' },
              { name: 'Obesity', SCC: '980' },
            ]}
            colors={COLORS}
          ></DefaultBarChart>
        </ThirdPageLeft>
        <ThirdPageRight>
          <HeadCopy>
            Correlation between <br />
            <span style={{ color: '#77b63e' }}>calorie monitoring</span> and{' '}
            <span style={{ color: '#77b63e' }}>obesity levels</span>
          </HeadCopy>{' '}
          <BodyCopy>
            Calorie monitoring can lower your obesity level.
            <br />
            Of the 2,000 people randomly selected, <br />
            1,000 people did not monitor their income calories.
          </BodyCopy>
        </ThirdPageRight>
      </ThirdPage>
      <FourthPage>
        <CircleRed2 />
        <CircleGreen2 />
        <FourthPageLeft>
          The United States has a relatively high obesity rate compared to other countries, and the
          increase is also on the rise.
        </FourthPageLeft>
        <FourthPageRight>
          <DefaultLineChart />
        </FourthPageRight>
      </FourthPage>
      <FifthPage>
        <FifthPageCopy>
          Track your calories with Catch Calories
          <Lottie options={defaultOptions} height={470} width={470} />
          <MainButton
            onClick={() => navigate('/login', { replace: true })}
            variant="contained"
            style={{
              width: '20vw',
              height: '10vh',
              borderRadius: '25px',
              fontSize: '2.5rem',
            }}
          >
            START
          </MainButton>
        </FifthPageCopy>
      </FifthPage>

      <Footer />
    </>
  );
}

export default Home;
